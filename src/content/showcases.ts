import type { Showcase } from "./types";

export const showcases: Showcase[] = [
  {
    slug: "gradient-descent",
    title: "Gradient Descent Visualizer",
    description:
      "Race Gradient Descent, Momentum and Adam across classic loss surfaces like Rosenbrock and Himmelblau. Tune the learning rate, pick a start point, and watch them converge or diverge.",
    tags: ["Optimization", "Deep Learning", "Interactive"],
    kind: "embedded",
    status: "live",
  },
  {
    slug: "tokenizer-playground",
    title: "Tokenizer Playground",
    description: "Type some text and watch it split into word/punctuation tokens. A tiny example of an on-site interactive demo.",
    tags: ["NLP", "Interactive"],
    kind: "embedded",
    status: "live",
  },
  {
    slug: "indus-code-demo",
    title: "Indus Code in action",
    description:
      "An Agent-mode task end to end: the agent sets up a venv, writes code and tests, hits a failing test, fixes it and finishes green, with every command approved by hand.",
    tags: ["Agents", "Sandbox", "Video"],
    kind: "video",
    project: "indus-code",
  },
  {
    slug: "agentic-search-demo",
    title: "Agentic Search in action",
    description:
      "A real question answered: planned searches over SearXNG, ten sources read, a cited comparison from Sarvam-105B, and the research graph behind it.",
    tags: ["Agents", "Search", "Video"],
    kind: "video",
    project: "agentic-search",
  },
  {
    slug: "shilp-demo",
    title: "shilp serving dashboard",
    description:
      "A local model server under load: live TTFT and latency percentiles, decode tok/s, an API playground with per-reply metrics, and the request log.",
    tags: ["LLM Inference", "Observability", "Video"],
    kind: "video",
    project: "shilp",
  },
];
