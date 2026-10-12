import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostSlugs, loadPost } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { metadata } = await loadPost((await params).slug);
  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: { type: "article", title: metadata.title, description: metadata.summary, publishedTime: metadata.date },
  };
}

export default async function PostPage({ params }: PageProps<"/articles/[slug]">) {
  const { default: Post, metadata } = await loadPost((await params).slug);

  return (
    <article className="mx-auto max-w-2xl">
      <Link
        href="/articles/"
        className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> All articles
      </Link>
      <header className="mt-8 mb-10 border-b pb-8">
        <time dateTime={metadata.date} className="font-mono text-xs text-muted-foreground">
          {formatDate(metadata.date, "long")}
        </time>
        <h1 className="text-gradient mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{metadata.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{metadata.summary}</p>
        {metadata.tags && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {metadata.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-mono text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>
      <Post />
    </article>
  );
}
