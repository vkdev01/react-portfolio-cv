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
];
