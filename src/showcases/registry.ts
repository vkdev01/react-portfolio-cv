import type { ComponentType } from "react";

/**
 * On-site demos rendered at /showcase/[slug]. To add one: create a client component under
 * `src/showcases/<slug>/`, register its loader here, and add a `kind: "embedded"` entry to `content/showcases.ts`.
 */
export const showcaseLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  "tokenizer-playground": () => import("./tokenizer-playground"),
};
