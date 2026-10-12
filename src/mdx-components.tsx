import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-12 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="my-5 leading-7 text-foreground/85" {...props} />,
  ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6 marker:text-brand" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6 marker:text-brand" {...props} />,
  blockquote: (props) => <blockquote className="my-6 border-l-2 border-brand pl-4 text-muted-foreground italic" {...props} />,
  a: ({ href = "", ...props }) => {
    const className = "font-medium text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand";
    return href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noreferrer" className={className} {...props} />
    );
  },
  hr: () => <hr className="my-10 border-border" />,
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm [&_td]:border-t [&_td]:px-3 [&_td]:py-2 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left" {...props} />
    </div>
  ),
  figure: (props) => <figure className="my-6" {...props} />,
  figcaption: (props) => (
    <figcaption
      className="rounded-t-lg border border-b-0 bg-muted/60 px-4 py-2 font-mono text-xs text-muted-foreground"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="overflow-x-auto rounded-lg border bg-card/80 p-4 font-mono text-[13px] leading-6 [figcaption+&]:rounded-t-none"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] [pre_&]:bg-transparent [pre_&]:p-0"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
