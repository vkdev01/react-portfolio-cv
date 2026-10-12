import { site } from "@/content/site";
import { SocialLinks } from "@/components/site/social-links";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name} · Built with Next.js
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
