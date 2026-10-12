import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/content/types";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

const SOURCE_LABEL: Record<Article["source"], string> = {
  local: "On this site",
  hashnode: "Hashnode",
  medium: "Medium",
  devto: "DEV",
  linkedin: "LinkedIn",
  other: "External",
};

export function ArticleRow({ article }: { article: Article }) {
  const content = (
    <>
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span aria-hidden>·</span>
        <Badge variant={article.external ? "outline" : "default"} className="text-[10px]">
          {SOURCE_LABEL[article.source]}
        </Badge>
      </div>
      <h3 className="mt-2 flex items-start gap-1 font-medium transition-colors group-hover:text-brand">
        {article.title}
        {article.external && <ArrowUpRight className="mt-0.5 size-4 shrink-0 opacity-60" aria-label="(external)" />}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{article.summary}</p>
    </>
  );

  const className = "group block rounded-xl border border-transparent p-4 transition-colors hover:border-border hover:bg-card/60";

  return article.external ? (
    <a href={article.href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={article.href} className={className}>
      {content}
    </Link>
  );
}
