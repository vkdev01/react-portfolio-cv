export type SocialKey =
  | "github"
  | "linkedin"
  | "hashnode"
  | "leetcode"
  | "hackerrank"
  | "email";

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
}

/** Keys into the tech icon map in `components/site/tech-icon.tsx`. */
export type TechIconKey =
  | "fastapi"
  | "python"
  | "nodejs"
  | "flask"
  | "react"
  | "nextjs"
  | "pytorch"
  | "agent"
  | "terminal"
  | "generic";

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  icon: TechIconKey;
  repo?: string;
  /** Source is not public yet: the repo button is shown disabled with a "Private" label. */
  repoPrivate?: boolean;
  live?: string;
  /** Slug of an entry in `showcases.ts` when the project has an on-site demo. */
  showcase?: string;
  featured?: boolean;
  year?: number;
}

export type ArticleSource = "local" | "hashnode" | "medium" | "devto" | "linkedin" | "other";

/** An article hosted elsewhere; local MDX posts are discovered from `content/posts`. */
export interface ExternalArticle {
  title: string;
  summary: string;
  /** ISO date, e.g. "2021-07-11" */
  date: string;
  url: string;
  source: Exclude<ArticleSource, "local">;
  tags?: string[];
}

export interface Article {
  title: string;
  summary: string;
  date: string;
  href: string;
  source: ArticleSource;
  external: boolean;
  tags: string[];
}

export interface PostMeta {
  title: string;
  summary: string;
  date: string;
  tags?: string[];
  draft?: boolean;
}

export type ShowcaseKind = "embedded" | "external";

export interface Showcase {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  /** `embedded` renders a component from `src/showcases/registry.ts` at /showcase/[slug]. */
  kind: ShowcaseKind;
  href?: string;
  repo?: string;
  status?: "live" | "wip" | "archived";
}

export interface TimelineEntry {
  org: string;
  role: string;
  start: string;
  end?: string;
  /** Image path under /public; takes precedence over `brand`. */
  logo?: string;
  /** Brand icon key from `components/site/timeline.tsx`, for orgs without a logo image. */
  brand?: "cisco";
  description?: string;
  skills?: string[];
}
