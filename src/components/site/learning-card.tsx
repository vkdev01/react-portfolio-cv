import { BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { LearningRepo } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "./spotlight-card";
import { TechIcon } from "./tech-icon";

export function LearningCard({ item }: { item: LearningRepo }) {
  return (
    <SpotlightCard className="flex h-full flex-col p-6">
      <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-brand/10 blur-3xl" />
      <span className="inline-flex size-10 items-center justify-center rounded-lg border bg-background/60 text-brand">
        <TechIcon name={item.icon} className="size-5" />
      </span>
      <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {item.highlights.map((h) => (
          <li key={h} className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-brand" aria-hidden />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
        {item.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-mono text-[11px]">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="relative z-10 mt-6 flex flex-wrap gap-2">
        {item.live && (
          <Button asChild size="sm">
            <a href={item.live} target="_blank" rel="noreferrer" aria-label={`Read ${item.title}`}>
              <BookOpen data-icon="inline-start" /> Read the guide
            </a>
          </Button>
        )}
        <Button asChild size="sm" variant="outline">
          <a href={item.repo} target="_blank" rel="noreferrer" aria-label={`${item.title} source on GitHub`}>
            <FaGithub data-icon="inline-start" /> Source
          </a>
        </Button>
      </div>
    </SpotlightCard>
  );
}
