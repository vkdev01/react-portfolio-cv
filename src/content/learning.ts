import type { LearningRepo } from "./types";

export const learningRepos: LearningRepo[] = [
  {
    slug: "harness-engineering-tutorial",
    title: "Harness Engineering Tutorial",
    description:
      "An interactive tutorial on harness engineering: how to make AI coding agents reliable through context, tools, guardrails and feedback loops.",
    highlights: ["11 chapters", "9 simulator labs", "Harness kit generator"],
    tags: ["AI Agents", "LLM", "Interactive"],
    icon: "agent",
    repo: "https://github.com/vkdev01/harness-engineering-tutorial",
    live: "https://vkdev01.github.io/harness-engineering-tutorial/",
  },
  {
    slug: "build-reasoning-model-guide",
    title: "Build a Reasoning Model",
    description:
      "A hands-on tutorial site for implementing reasoning models in PyTorch: evaluation, inference-time scaling, GRPO and distillation, with annotated code and worked examples. Built around Sebastian Raschka's free course.",
    highlights: ["8 runnable notebooks", "Annotated code", "Data tables"],
    tags: ["PyTorch", "LLM", "Deep Learning"],
    icon: "pytorch",
    repo: "https://github.com/vkdev01/build-reasoning-model-guide",
    live: "https://vkdev01.github.io/build-reasoning-model-guide/",
  },
  {
    slug: "system-design-guide",
    title: "System Design Guide",
    description:
      "A worked-through guide to system design: fundamentals, building blocks, common patterns and case studies, backed by tested Python samples. Published with MkDocs Material.",
    highlights: ["12 patterns", "15 case studies", "Tested Python samples"],
    tags: ["System Design", "Python", "Architecture"],
    icon: "python",
    repo: "https://github.com/vkdev01/system-design-guide",
    live: "https://vkdev01.github.io/system-design-guide/",
  },
  {
    slug: "engineering-notes",
    title: "Engineering Notes",
    description:
      "A content-driven library of technical references covering harness engineering for coding agents, agent operations and system design, with a Sarvam-powered docs assistant.",
    highlights: ["Markdown courses", "Interactive exercises", "Docs assistant"],
    tags: ["Next.js", "AI Agents", "System Design"],
    icon: "nextjs",
    repo: "https://github.com/vkdev01/engineering-notes",
    live: "https://vkdev01.github.io/engineering-notes/",
  },
];
