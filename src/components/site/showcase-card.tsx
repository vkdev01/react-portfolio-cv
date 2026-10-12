import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Showcase } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "./spotlight-card";

export function ShowcaseCard({ item }: { item: Showcase }) {
  const href = item.kind === "embedded" ? `/showcase/${item.slug}/` : item.href;
  const external = item.kind === "external";

  const body = (
    <SpotlightCard className="h-full p-6">
      <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-brand/15 blur-3xl" />
      <div className="flex items-center justify-between">
        <Sparkles className="size-5 text-brand" />
        {item.status && (
          <Badge variant="outline" className="font-mono text-[10px] uppercase">
            {item.status}
          </Badge>
        )}
      </div>
      <h3 className="mt-6 flex items-center gap-1 text-lg font-medium transition-colors group-hover:text-brand">
        {item.title}
        {external && <ArrowUpRight className="size-4 opacity-60" />}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-mono text-[11px]">
            {tag}
          </Badge>
        ))}
      </div>
    </SpotlightCard>
  );

  if (!href) return body;
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className="group block h-full">
      {body}
    </a>
  ) : (
    <Link href={href} className="group block h-full">
      {body}
    </Link>
  );
}
