"use client";

/**
 * Self-contained gradient descent visualizer. Only depends on React; copy this folder
 * (GradientDescentVisualizer.tsx + math.ts) into any React project to reuse it.
 * Inherits text color from its parent; pass `accentColor` (any CSS color, incl. `var(--x)`).
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  OPTIMIZERS,
  SURFACES,
  advanceRuns,
  createRuns,
  type OptimizerId,
  type Run,
  type Surface,
  type SurfaceId,
  type Vec,
} from "./math";

export interface GradientDescentVisualizerProps {
  /** Tints the loss heatmap and primary controls. */
  accentColor?: string;
  /** Path colors per optimizer (any CSS color). */
  colors?: Partial<Record<OptimizerId, string>>;
  initialSurface?: SurfaceId;
  maxSteps?: number;
  stepsPerFrame?: number;
  className?: string;
  style?: CSSProperties;
}

type RGB = [number, number, number];

const DEFAULT_COLORS: Record<OptimizerId, string> = { gd: "#3b82f6", momentum: "#f59e0b", adam: "#ec4899" };

const S = {
  root: { display: "grid", gap: 16, fontSize: 14 },
  row: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 },
  label: { display: "inline-flex", alignItems: "center", gap: 8 },
  control: {
    font: "inherit",
    color: "inherit",
    background: "transparent",
    border: "1px solid color-mix(in srgb, currentColor 22%, transparent)",
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
  },
  muted: { opacity: 0.65 },
  canvas: {
    display: "block",
    width: "100%",
    borderRadius: 12,
    border: "1px solid color-mix(in srgb, currentColor 14%, transparent)",
    cursor: "crosshair",
    touchAction: "none",
  },
  table: { width: "100%", borderCollapse: "collapse", fontVariantNumeric: "tabular-nums" },
  cell: { padding: "6px 8px", textAlign: "left", borderTop: "1px solid color-mix(in srgb, currentColor 10%, transparent)" },
  swatch: { display: "inline-block", width: 10, height: 10, borderRadius: 999, marginRight: 8 },
} satisfies Record<string, CSSProperties>;

function toRgb(color: string): RGB {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return [128, 128, 128];
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

/** Log-scaled loss heatmap: low loss tinted with the accent, plus faint contour bands. */
function renderBackground(surface: Surface, w: number, h: number, accent: RGB, fg: RGB): HTMLCanvasElement {
  const gw = Math.max(2, Math.ceil(w / 2));
  const gh = Math.max(2, Math.ceil(h / 2));
  const [x0, x1] = surface.x;
  const [y0, y1] = surface.y;
  const values = new Float64Array(gw * gh);
  let min = Infinity;
  let max = -Infinity;
  for (let j = 0; j < gh; j++) {
    const y = y1 - ((j + 0.5) / gh) * (y1 - y0);
    for (let i = 0; i < gw; i++) {
      const v = surface.f(x0 + ((i + 0.5) / gw) * (x1 - x0), y);
      values[j * gw + i] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }

  const range = Math.log1p(max - min) || 1;
  const img = new ImageData(gw, gh);
  for (let k = 0; k < values.length; k++) {
    const t = Math.log1p(values[k] - min) / range;
    const band = (t * 12) % 1;
    const contour = Math.max(0, 1 - Math.min(band, 1 - band) / 0.05);
    const alpha = 0.05 + 0.5 * (1 - t) + 0.14 * contour;
    img.data[k * 4] = accent[0] + (fg[0] - accent[0]) * t;
    img.data[k * 4 + 1] = accent[1] + (fg[1] - accent[1]) * t;
    img.data[k * 4 + 2] = accent[2] + (fg[2] - accent[2]) * t;
    img.data[k * 4 + 3] = Math.min(1, alpha) * 255;
  }

  const canvas = document.createElement("canvas");
  canvas.width = gw;
  canvas.height = gh;
  canvas.getContext("2d")?.putImageData(img, 0, 0);
  return canvas;
}

function formatLoss(value: number) {
  if (!Number.isFinite(value)) return "∞";
  return value !== 0 && Math.abs(value) < 1e-3 ? value.toExponential(2) : value.toFixed(3);
}

export function GradientDescentVisualizer({
  accentColor = "#8b5cf6",
  colors,
  initialSurface = "bowl",
  maxSteps = 400,
  stepsPerFrame = 2,
  className,
  style,
}: GradientDescentVisualizerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const probeRefs = useRef<Partial<Record<OptimizerId, HTMLSpanElement | null>>>({});
  const accentProbeRef = useRef<HTMLSpanElement>(null);
  const bgCache = useRef<{ key: string; canvas: HTMLCanvasElement } | null>(null);

  const [surfaceId, setSurfaceId] = useState<SurfaceId>(initialSurface);
  const surface = SURFACES[surfaceId];
  const [start, setStart] = useState<Vec>(surface.start);
  const [runs, setRuns] = useState<Run[]>(() => createRuns(surface.start));
  const [running, setRunning] = useState(false);
  const [lrExp, setLrExp] = useState(0);
  const [enabled, setEnabled] = useState<Record<OptimizerId, boolean>>({ gd: true, momentum: true, adam: true });
  const [size, setSize] = useState({ w: 640, h: 400 });
  const [themeTick, setThemeTick] = useState(0);

  const lrScale = 10 ** lrExp;
  const pathColors: Record<OptimizerId, string> = { ...DEFAULT_COLORS, ...colors };

  const active = runs.filter((r) => enabled[r.id]);
  const step = active.reduce((acc, r) => Math.max(acc, r.t), 0);
  const done = active.length === 0 || step >= maxSteps || active.every((r) => r.diverged || r.settled);
  const playing = running && !done;

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      setSize({ w, h: Math.round(Math.min(520, Math.max(260, w * 0.62))) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Repaint when the host app switches theme (class/attribute on <html>) or OS scheme changes.
  useEffect(() => {
    const bump = () => setThemeTick((n) => n + 1);
    const mo = new MutationObserver(bump);
    mo.observe(document.documentElement, { attributes: true });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", bump);
    return () => {
      mo.disconnect();
      mq.removeEventListener("change", bump);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const loop = () => {
      setRuns((prev) => advanceRuns(prev, surface, lrScale, enabled, stepsPerFrame));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, surface, lrScale, enabled, stepsPerFrame]);

  const colorKey = `${accentColor}|${pathColors.gd}|${pathColors.momentum}|${pathColors.adam}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !root || !ctx) return;

    const { w, h } = size;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    const fgCss = getComputedStyle(root).color;
    const accentCss = accentProbeRef.current ? getComputedStyle(accentProbeRef.current).color : fgCss;
    const resolved = Object.fromEntries(
      OPTIMIZERS.map(({ id }) => {
        const probe = probeRefs.current[id];
        return [id, probe ? getComputedStyle(probe).color : "#888"];
      }),
    ) as Record<OptimizerId, string>;

    const key = `${surface.id}|${w}x${h}|${fgCss}|${accentCss}|${colorKey}|${themeTick}`;
    if (bgCache.current?.key !== key) {
      bgCache.current = { key, canvas: renderBackground(surface, w, h, toRgb(accentCss), toRgb(fgCss)) };
    }

    const [x0, x1] = surface.x;
    const [y0, y1] = surface.y;
    const toScreen = ([x, y]: Vec): Vec => [((x - x0) / (x1 - x0)) * w, ((y1 - y) / (y1 - y0)) * h];

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(bgCache.current.canvas, 0, 0, w, h);

    ctx.strokeStyle = fgCss;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.7;
    for (const m of surface.minima) {
      const [sx, sy] = toScreen(m);
      ctx.beginPath();
      ctx.moveTo(sx - 5, sy - 5);
      ctx.lineTo(sx + 5, sy + 5);
      ctx.moveTo(sx + 5, sy - 5);
      ctx.lineTo(sx - 5, sy + 5);
      ctx.stroke();
    }
    const [ssx, ssy] = toScreen(start);
    ctx.beginPath();
    ctx.arc(ssx, ssy, 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    for (const run of runs) {
      if (!enabled[run.id]) continue;
      ctx.lineJoin = "round";
      ctx.beginPath();
      run.path.forEach((p, i) => {
        const [sx, sy] = toScreen(p);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      // Faint halo keeps paths readable over both light and dark heatmaps.
      ctx.strokeStyle = fgCss;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = resolved[run.id];
      ctx.fillStyle = resolved[run.id];
      ctx.lineWidth = 2;
      ctx.stroke();
      const [hx, hy] = toScreen(run.p);
      ctx.beginPath();
      ctx.arc(hx, hy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = fgCss;
      ctx.stroke();
    }
  }, [runs, surface, size, enabled, start, themeTick, colorKey]);

  const restart = (p: Vec, play: boolean) => {
    setStart(p);
    setRuns(createRuns(p));
    setRunning(play);
  };

  const onSurfaceChange = (id: SurfaceId) => {
    setSurfaceId(id);
    restart(SURFACES[id].start, false);
  };

  const onTogglePlay = () => {
    if (playing) return setRunning(false);
    if (done) setRuns(createRuns(start));
    setRunning(true);
  };

  const onCanvasPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    restart([surface.x[0] + px * (surface.x[1] - surface.x[0]), surface.y[1] - py * (surface.y[1] - surface.y[0])], true);
  };

  const onRandomStart = () => {
    const rand = ([a, b]: Vec) => a + (0.1 + Math.random() * 0.8) * (b - a);
    restart([rand(surface.x), rand(surface.y)], true);
  };

  const primary: CSSProperties = {
    ...S.control,
    borderColor: accentColor,
    background: `color-mix(in srgb, ${accentColor} 20%, transparent)`,
    minWidth: 76,
  };

  return (
    <div ref={rootRef} className={className} style={{ ...S.root, ...style }}>
      <span ref={accentProbeRef} hidden style={{ color: accentColor }} />
      {OPTIMIZERS.map(({ id }) => (
        <span
          key={id}
          hidden
          ref={(el) => {
            probeRefs.current[id] = el;
          }}
          style={{ color: pathColors[id] }}
        />
      ))}

      <div style={S.row}>
        <label style={S.label}>
          <span style={S.muted}>Surface</span>
          <select
            value={surfaceId}
            onChange={(e) => onSurfaceChange(e.target.value as SurfaceId)}
            style={{ ...S.control, cursor: "pointer" }}
          >
            {Object.values(SURFACES).map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <code style={{ ...S.muted, fontSize: 13 }}>f(x, y) = {surface.formula}</code>
      </div>

      <div style={S.row}>
        <label style={S.label}>
          <span style={S.muted}>Learning rate</span>
          <input
            type="range"
            min={-1}
            max={1}
            step={0.05}
            value={lrExp}
            onChange={(e) => setLrExp(Number(e.target.value))}
            style={{ accentColor }}
            aria-valuetext={`${lrScale.toFixed(2)} times the base rate`}
          />
          <span style={{ fontVariantNumeric: "tabular-nums", minWidth: 48 }}>×{lrScale.toFixed(2)}</span>
        </label>
        {OPTIMIZERS.map(({ id, label }) => (
          <label key={id} style={S.label}>
            <input
              type="checkbox"
              checked={enabled[id]}
              onChange={(e) => setEnabled((prev) => ({ ...prev, [id]: e.target.checked }))}
              style={{ accentColor: pathColors[id] }}
            />
            {label}
          </label>
        ))}
      </div>

      <div style={S.row}>
        <button type="button" onClick={onTogglePlay} style={primary}>
          {playing ? "Pause" : done && step > 0 ? "Replay" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setRuns((prev) => advanceRuns(prev, surface, lrScale, enabled, 1));
          }}
          disabled={done}
          style={{ ...S.control, opacity: done ? 0.5 : 1 }}
        >
          Step
        </button>
        <button type="button" onClick={() => restart(start, false)} style={S.control}>
          Reset
        </button>
        <button type="button" onClick={onRandomStart} style={S.control}>
          Random start
        </button>
        <span style={{ ...S.muted, marginLeft: "auto", fontVariantNumeric: "tabular-nums" }}>
          step {step} / {maxSteps}
        </span>
      </div>

      <div ref={frameRef}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`${surface.label} loss surface with optimizer paths. Click to choose a starting point.`}
          onPointerDown={onCanvasPointer}
          style={{ ...S.canvas, height: size.h }}
        />
      </div>

      <table style={S.table}>
        <thead>
          <tr style={S.muted}>
            <th style={S.cell}>Optimizer</th>
            <th style={S.cell}>Learning rate</th>
            <th style={S.cell}>Loss</th>
            <th style={S.cell}>Status</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => {
            const label = OPTIMIZERS.find((o) => o.id === run.id)?.label;
            const status = !enabled[run.id]
              ? "off"
              : run.diverged
                ? "diverged"
                : run.settled
                  ? "converged"
                  : playing
                    ? "running"
                    : "idle";
            return (
              <tr key={run.id} style={{ opacity: enabled[run.id] ? 1 : 0.45 }}>
                <td style={S.cell}>
                  <span style={{ ...S.swatch, background: pathColors[run.id] }} />
                  {label}
                </td>
                <td style={S.cell}>{(surface.lr[run.id] * lrScale).toPrecision(2)}</td>
                <td style={S.cell}>{formatLoss(surface.f(run.p[0], run.p[1]))}</td>
                <td style={S.cell}>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p style={{ ...S.muted, margin: 0, fontSize: 13 }}>
        Click anywhere on the plot to start from that point. × marks the minima; the ring is the start.
      </p>
    </div>
  );
}

export default GradientDescentVisualizer;
