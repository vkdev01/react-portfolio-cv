/* eslint-disable @next/next/no-img-element -- static export serves images as-is */
import type { TimelineEntry } from "@/content/types";
import { Badge } from "@/components/ui/badge";

export function Timeline({ entries, showSkills = false }: { entries: TimelineEntry[]; showSkills?: boolean }) {
  return (
    <ol className="relative space-y-6 border-l pl-6">
      {entries.map((entry) => (
        <li key={`${entry.org}-${entry.start}`} className="relative">
          <span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-brand ring-4 ring-background">
            {!entry.end && <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" />}
          </span>
          <div className="flex items-center gap-3">
            {entry.logo ? (
              <img src={entry.logo} alt="" className="size-9 rounded-md border bg-white object-contain p-1" />
            ) : (
              <span className="inline-flex size-9 items-center justify-center rounded-md border bg-card font-mono text-sm font-semibold text-brand">
                {entry.org.charAt(0)}
              </span>
            )}
            <div>
              <p className="font-medium">{entry.org}</p>
              <p className="text-sm text-muted-foreground">{entry.role}</p>
            </div>
          </div>
          <p className="mt-1.5 font-mono text-xs text-muted-foreground">
            {entry.start} – {entry.end ?? <span className="text-brand">Present</span>}
          </p>
          {entry.description && <p className="mt-2 text-sm text-muted-foreground">{entry.description}</p>}
          {showSkills && entry.skills && (
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`Skills used at ${entry.org}`}>
              {entry.skills.map((skill) => (
                <li key={skill}>
                  <Badge variant="secondary" className="font-mono text-[11px]">
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
