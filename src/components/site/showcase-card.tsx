import Link from "next/link";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import type { Showcase } from "@/content/types";
import { projects } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "./spotlight-card";
import { VideoDialog } from "./video-dialog";

export function ShowcaseCard({ item }: { item: Showcase }) {
  const href = item.kind === "embedded" ? `/showcase/${item.slug}/` : item.href;
  const external = item.kind === "external";
  const media = item.kind === "video" ? projects.find((p) => p.slug === item.project)?.media : undefined;

  const body = (
    <SpotlightCard className="h-full p-6">
      <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-brand/15 blur-3xl" />
      {media && (
        <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden border-b bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, and the poster may be on a CDN */}
          <img src={media.poster} alt="" loading="lazy" className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-black/70 text-white shadow-lg ring-1 ring-white/20 transition-transform group-hover:scale-110">
              <Play className="size-6 translate-x-0.5 fill-current" />
            </span>
          </span>
        </div>
      )}
      <div className="flex items-center justify-between">
        {media ? <Play className="size-5 text-brand" /> : <Sparkles className="size-5 text-brand" />}
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

  if (media) {
    return (
      <VideoDialog media={media} title={item.title}>
        <button type="button" aria-label={`Play video: ${item.title}`} className="group block h-full w-full text-left">
          {body}
        </button>
      </VideoDialog>
    );
  }
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
