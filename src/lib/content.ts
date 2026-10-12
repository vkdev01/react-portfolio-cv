import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import type { Article, PostMeta } from "@/content/types";
import { externalArticles } from "@/content/articles";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

interface PostModule {
  default: ComponentType;
  metadata: PostMeta;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function loadPost(slug: string): Promise<PostModule> {
  return (await import(`@/content/posts/${slug}.mdx`)) as PostModule;
}

export async function getPosts(): Promise<(PostMeta & { slug: string })[]> {
  const posts = await Promise.all(
    getPostSlugs().map(async (slug) => ({ slug, ...(await loadPost(slug)).metadata })),
  );
  return posts.filter((post) => !post.draft);
}

export async function getAllArticles(): Promise<Article[]> {
  const local: Article[] = (await getPosts()).map((post) => ({
    title: post.title,
    summary: post.summary,
    date: post.date,
    href: `/articles/${post.slug}/`,
    source: "local",
    external: false,
    tags: post.tags ?? [],
  }));

  const external: Article[] = externalArticles.map((article) => ({
    title: article.title,
    summary: article.summary,
    date: article.date,
    href: article.url,
    source: article.source,
    external: true,
    tags: article.tags ?? [],
  }));

  return [...local, ...external].sort((a, b) => b.date.localeCompare(a.date));
}
