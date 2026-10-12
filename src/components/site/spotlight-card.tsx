"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Card with a cursor-following accent glow. */
export function SpotlightCard({ className, children, ...props }: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-xl border bg-card/60 backdrop-blur-sm transition-colors hover:border-brand/40",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        "before:bg-[radial-gradient(400px_circle_at_var(--x)_var(--y),color-mix(in_oklch,var(--brand)_14%,transparent),transparent_70%)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
