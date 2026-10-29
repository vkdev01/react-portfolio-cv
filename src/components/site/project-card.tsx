import Link from "next/link";
import { ArrowUpRight, Lock, Play } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "./spotlight-card";
import { TechIcon } from "./tech-icon";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-lg border bg-background/60 text-brand">
          <TechIcon name={project.icon} className="size-5" />
        </span>
        <div className="flex items-center gap-1">
          {project.showcase && (
            <Link
              href={`/showcase/${project.showcase}/`}
              aria-label={`${project.title} demo`}
              className="relative z-10 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Play className="size-4" />
            </Link>
          )}
          {project.repoPrivate ? (
            <span
              role="img"
              aria-label={`${project.title} source code is private for now`}
              title="Source code is private for now"
              className="relative z-10 inline-flex h-8 cursor-not-allowed items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground/70"
            >
              <FaGithub className="size-4" />
              <Lock className="size-3" />
              Private
            </span>
          ) : project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} source code`}
              className="relative z-10 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <FaGithub className="size-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} live site`}
              className="relative z-10 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>
      <h3 className="mt-4 font-medium">{project.title}</h3>
      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-mono text-[11px]">
            {tag}
          </Badge>
        ))}
      </div>
    </SpotlightCard>
  );
}
