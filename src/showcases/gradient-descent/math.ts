export type Vec = readonly [number, number];
export type OptimizerId = "gd" | "momentum" | "adam";
export type SurfaceId = "bowl" | "rosenbrock" | "himmelblau" | "double-well";

export const OPTIMIZERS: { id: OptimizerId; label: string }[] = [
  { id: "gd", label: "Gradient descent" },
  { id: "momentum", label: "Momentum" },
  { id: "adam", label: "Adam" },
];

export interface Surface {
  id: SurfaceId;
  label: string;
  formula: string;
  f: (x: number, y: number) => number;
  grad: (x: number, y: number) => Vec;
  x: Vec;
  y: Vec;
  start: Vec;
  minima: Vec[];
  /** Base learning rate per optimizer, tuned so each surface is stable but interesting. */
  lr: Record<OptimizerId, number>;
}

export const SURFACES: Record<SurfaceId, Surface> = {
  bowl: {
    id: "bowl",
    label: "Elongated bowl",
    formula: "½(x² + 10y²)",
    f: (x, y) => 0.5 * (x * x + 10 * y * y),
    grad: (x, y) => [x, 10 * y],
    x: [-3, 3],
    y: [-2, 2],
    start: [-2.6, 1.6],
    minima: [[0, 0]],
    lr: { gd: 0.15, momentum: 0.03, adam: 0.1 },
  },
  rosenbrock: {
    id: "rosenbrock",
    label: "Rosenbrock valley",
    formula: "(1 − x)² + 100(y − x²)²",
    f: (x, y) => (1 - x) ** 2 + 100 * (y - x * x) ** 2,
    grad: (x, y) => [-2 * (1 - x) - 400 * x * (y - x * x), 200 * (y - x * x)],
    x: [-2, 2],
    y: [-1, 3],
    start: [-1.2, 1],
    minima: [[1, 1]],
    lr: { gd: 0.001, momentum: 0.0004, adam: 0.05 },
  },
  himmelblau: {
    id: "himmelblau",
    label: "Himmelblau (4 minima)",
    formula: "(x² + y − 11)² + (x + y² − 7)²",
    f: (x, y) => (x * x + y - 11) ** 2 + (x + y * y - 7) ** 2,
    grad: (x, y) => [
      4 * x * (x * x + y - 11) + 2 * (x + y * y - 7),
      2 * (x * x + y - 11) + 4 * y * (x + y * y - 7),
    ],
    x: [-5, 5],
    y: [-5, 5],
    start: [-0.6, 0.2],
    minima: [
      [3, 2],
      [-2.805118, 3.131312],
      [-3.77931, -3.283186],
      [3.584428, -1.848126],
    ],
    lr: { gd: 0.01, momentum: 0.003, adam: 0.1 },
  },
  "double-well": {
    id: "double-well",
    label: "Saddle point",
    formula: "½x² + ¼y⁴ − ½y²",
    f: (x, y) => 0.5 * x * x + 0.25 * y ** 4 - 0.5 * y * y,
    grad: (x, y) => [x, y ** 3 - y],
    x: [-2.5, 2.5],
    y: [-1.8, 1.8],
    start: [2.2, 0.02],
    minima: [
      [0, 1],
      [0, -1],
    ],
    lr: { gd: 0.1, momentum: 0.03, adam: 0.05 },
  },
};

export interface Run {
  id: OptimizerId;
  p: Vec;
  v: Vec;
  m: Vec;
  s: Vec;
  t: number;
  path: Vec[];
  diverged: boolean;
  settled: boolean;
}

export function createRuns(start: Vec): Run[] {
  return OPTIMIZERS.map(({ id }) => ({
    id,
    p: start,
    v: [0, 0],
    m: [0, 0],
    s: [0, 0],
    t: 0,
    path: [start],
    diverged: false,
    settled: false,
  }));
}

const BETA = 0.9;
const BETA1 = 0.9;
const BETA2 = 0.999;
const EPS = 1e-8;

export function stepRun(run: Run, surface: Surface, lr: number): Run {
  const [gx, gy] = surface.grad(run.p[0], run.p[1]);
  const t = run.t + 1;
  let { v, m, s } = run;
  let dx: number;
  let dy: number;

  if (run.id === "gd") {
    dx = -lr * gx;
    dy = -lr * gy;
  } else if (run.id === "momentum") {
    v = [BETA * v[0] + gx, BETA * v[1] + gy];
    dx = -lr * v[0];
    dy = -lr * v[1];
  } else {
    m = [BETA1 * m[0] + (1 - BETA1) * gx, BETA1 * m[1] + (1 - BETA1) * gy];
    s = [BETA2 * s[0] + (1 - BETA2) * gx * gx, BETA2 * s[1] + (1 - BETA2) * gy * gy];
    const c1 = 1 - BETA1 ** t;
    const c2 = 1 - BETA2 ** t;
    dx = (-lr * (m[0] / c1)) / (Math.sqrt(s[0] / c2) + EPS);
    dy = (-lr * (m[1] / c1)) / (Math.sqrt(s[1] / c2) + EPS);
  }

  const p: Vec = [run.p[0] + dx, run.p[1] + dy];
  const diverged = !Number.isFinite(p[0]) || !Number.isFinite(p[1]) || Math.abs(p[0]) > 1e4 || Math.abs(p[1]) > 1e4;
  if (diverged) return { ...run, t, diverged };

  return { ...run, p, v, m, s, t, path: [...run.path, p], settled: Math.hypot(dx, dy) < 1e-7 };
}

export function advanceRuns(
  runs: Run[],
  surface: Surface,
  lrScale: number,
  enabled: Record<OptimizerId, boolean>,
  steps: number,
): Run[] {
  let next = runs;
  for (let i = 0; i < steps; i++) {
    next = next.map((run) =>
      enabled[run.id] && !run.diverged && !run.settled ? stepRun(run, surface, surface.lr[run.id] * lrScale) : run,
    );
  }
  return next;
}
