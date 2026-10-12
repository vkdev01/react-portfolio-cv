/* eslint-disable @next/next/no-img-element -- static export serves images as-is */
import type { TimelineEntry } from "@/content/types";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative space-y-6 border-l pl-6">
      {entries.map((entry) => (
        <li key={`${entry.org}-${entry.start}`} className="relative">
          <span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-brand ring-4 ring-background" />
          <div className="flex items-center gap-3">
            {entry.logo && (
              <img src={entry.logo} alt="" className="size-9 rounded-md border bg-white object-contain p-1" />
            )}
            <div>
              <p className="font-medium">{entry.org}</p>
              <p className="text-sm text-muted-foreground">{entry.role}</p>
            </div>
          </div>
          <p className="mt-1.5 font-mono text-xs text-muted-foreground">
            {entry.start} – {entry.end ?? "Present"}
          </p>
          {entry.description && <p className="mt-2 text-sm text-muted-foreground">{entry.description}</p>}
        </li>
      ))}
    </ol>
  );
}
