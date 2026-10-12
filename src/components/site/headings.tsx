import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  href,
  linkLabel = "View all",
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs tracking-widest text-brand uppercase">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <header className="mb-12 max-w-2xl">
      <p className="font-mono text-xs tracking-widest text-brand uppercase">{eyebrow}</p>
      <h1 className="text-gradient mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </header>
  );
}
