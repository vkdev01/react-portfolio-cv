import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "indus-code",
    title: "Indus Code",
    description:
      "An agentic coding assistant in the spirit of Copilot and Claude Code. Each chat runs in its own disposable sandbox in Ask, Plan or Agent mode, over persistent sessions, with pluggable LLM providers (Sarvam, Ollama, OpenRouter). Ships as a CLI, a FastAPI server and a React web UI.",
    tags: ["Python", "FastAPI", "React", "LLM", "Agents"],
    icon: "terminal",
    repo: "https://github.com/vkdev01/indus-code",
    repoPrivate: true,
    // Served from this site: the repo is private, so no CDN can read its assets.
    media: {
      video: "/media/indus-code-ui.mp4",
      poster: "/media/indus-code-ui-poster.jpg",
      alt: "indus-code's web UI: picking a mode, an Agent task approved step by step that writes code and tests, fixes a failing test and finishes green, then the workspace files and Git panel",
    },
    featured: true,
    year: 2026,
  },
  {
    slug: "agentic-search",
    title: "Agentic Search",
    description:
      "A ChatGPT-style research agent: plans web searches over a self-hosted SearXNG, then streams answers from Sarvam-105B with citations, charts, diagrams and a research graph. Every LLM call is logged with tokens and latency.",
    tags: ["Next.js", "FastAPI", "LLM", "Agents"],
    icon: "agent",
    repo: "https://github.com/vkdev01/agentic-search",
    media: {
      video:
        "https://cdn.jsdelivr.net/gh/vkdev01/agentic-search@9ccbba2d0fe996e36d85776c05af71364b421099/assets/agentic-search-ui.mp4",
      poster:
        "https://cdn.jsdelivr.net/gh/vkdev01/agentic-search@9ccbba2d0fe996e36d85776c05af71364b421099/assets/agentic-search-ui-poster.jpg",
      alt: "Agentic Search answering a question: planned web searches, ten sources, a comparison with inline citations, and the research graph of queries and sources",
    },
    featured: true,
    year: 2026,
  },
  {
    slug: "shilp",
    title: "shilp",
    description:
      "A model-serving stack built from scratch: pull a model from Hugging Face, reshape it (convert, quantize, prune layers, merge LoRA), and serve it over Ollama- and OpenAI-compatible APIs on llama.cpp or plain PyTorch. A Next.js dashboard shows live TTFT, latency percentiles, tok/s and errors from per-request telemetry.",
    tags: ["Python", "FastAPI", "llama.cpp", "Transformers", "Next.js", "LLM Inference"],
    icon: "pytorch",
    repo: "https://github.com/vkdev01/shilp",
    // jsDelivr, pinned to a commit: raw.githubusercontent serves MP4 as octet-stream, which Safari will not play.
    media: {
      video: "https://cdn.jsdelivr.net/gh/vkdev01/shilp@90928e5/assets/shilp-ui.mp4",
      poster: "https://cdn.jsdelivr.net/gh/vkdev01/shilp@90928e5/assets/shilp-ui-poster.jpg",
      alt: "shilp's serving dashboard: live latency and throughput charts, an API playground streaming a reply with per-token metrics, and a request log",
    },
    featured: true,
    year: 2026,
  },
  {
    slug: "ocr-ms-fastapi",
    title: "FastAPI OCR Microservice",
    description: "A REST API / microservice that extracts text from images using FastAPI and PyTesseract.",
    tags: ["Python", "FastAPI", "OCR"],
    icon: "fastapi",
    repo: "https://github.com/vkdev01/ocr-ms-fastapi",
    featured: true,
  },
  {
    slug: "crawler-ocr",
    title: "Crawler OCR",
    description: "Automatically crawls a list of links and runs OCR to extract text. Built with Python and PyTesseract.",
    tags: ["Python", "OCR", "Scraping"],
    icon: "python",
    repo: "https://github.com/vkdev01/Extractor-Assignment/tree/master/pdf-extractor",
    featured: true,
  },
  {
    slug: "realtime-chat-app",
    title: "Realtime Chat Application",
    description: "Realtime chat built on Node.js with Express and Socket.IO.",
    tags: ["Node", "Socket.IO", "Express"],
    icon: "nodejs",
    repo: "https://github.com/vkdev01/realtime-chat-app",
    featured: true,
  },
  {
    slug: "flask-code-blog",
    title: "Flask Blog Application",
    description: "A blog web application built with Python and Flask.",
    tags: ["Python", "Flask"],
    icon: "flask",
    repo: "https://github.com/vkdev01/FlaskCodeBlog",
  },
  {
    slug: "github-profile-finder",
    title: "GitHub Profile Finder",
    description: "A React SPA to search GitHub profiles using the GitHub API.",
    tags: ["React", "API"],
    icon: "react",
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    description: "Static Next.js site with MDX articles, themes, and a showcase registry for on-site demos.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    icon: "react",
    repo: "https://github.com/vkdev01/react-portfolio-cv",
    showcase: "tokenizer-playground",
  },
];
