"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const tags = useMemo(() => ["All", ...new Set(projects.flatMap((p) => p.tags))], [projects]);
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActive(tag)}
            aria-pressed={active === tag}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
              active === tag
                ? "border-brand/50 bg-brand/10 text-brand"
                : "text-muted-foreground hover:border-foreground/20 hover:text-foreground",
            )}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
