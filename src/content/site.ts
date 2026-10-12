import type { SocialLink } from "./types";

export const site = {
  name: "Vaibhav Kumar",
  initials: "VK",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "vkumar01.dev@gmail.com",
  role: "Full Stack & ML Engineer",
  headline: "I build reliable web apps and ML-powered tools.",
  intro:
    "I'm a versatilist who adapts to whatever hat a project needs, from backend APIs and full stack apps to deep learning experiments. I enjoy exploring new tech, solving problems, and writing quality code that follows best practices.",
  about: [
    "I've worked on a variety of projects over the years and I'm proud of the progress I've made. Many of them are open source, so feel free to explore the code and suggest improvements.",
    "Collaborating with others is a great way to learn and grow, and I'm always open to new ideas and feedback.",
  ],
  funFact: "There are two ways to write error-free programs; only the third one works.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about/", label: "About" },
    { href: "/career/", label: "Career" },
    { href: "/projects/", label: "Projects" },
    { href: "/articles/", label: "Articles" },
    { href: "/showcase/", label: "Showcase" },
  ],
} as const;

export const socials: SocialLink[] = [
  { key: "github", label: "GitHub", href: "https://github.com/vkdev01" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/vaibhav-kumar-vk/" },
  { key: "hashnode", label: "Hashnode", href: "https://vaibhavkumar.hashnode.dev" },
  { key: "leetcode", label: "LeetCode", href: "https://leetcode.com/vaibhavk01" },
  { key: "hackerrank", label: "HackerRank", href: "https://www.hackerrank.com/vkdev01" },
  { key: "email", label: "Email", href: `mailto:${site.email}` },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "JavaScript", "C/C++"],
  Backend: ["FastAPI", "Django", "Flask", "Node", "Express", "Fastify"],
  "ML / DL": ["PyTorch", "Scikit-Learn", "OpenCV"],
  DevOps: ["AWS", "Docker", "Nginx"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  Misc: ["Firebase", "Socket.IO", "Selenium", "Android"],
};

export const profileSnippet = `const vaibhav = {
  pronouns: ["he", "him"],
  code: ["Python", "TypeScript", "JavaScript", "C/C++"],
  askMeAbout: ["web dev", "full stack", "deep learning"],
  architecture: ["serverless", "microservices", "SPAs"],
  currentFocus: "Actively working",
  funFact: "${site.funFact}",
} as const;`;
