import { codeToHtml } from "shiki";

export async function CodeBlock({ code, lang = "ts", title }: { code: string; lang?: string; title?: string }) {
  // Input is trusted, build-time content from src/content, so injecting shiki's HTML is safe.
  const html = await codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark-dimmed" },
    defaultColor: false,
  });

  return (
    <div className="overflow-hidden rounded-xl border bg-card/70 shadow-2xl shadow-brand/5 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        {title && <span className="ml-2 font-mono text-xs text-muted-foreground">{title}</span>}
      </div>
      <div
        className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6 [&_pre]:bg-transparent!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
