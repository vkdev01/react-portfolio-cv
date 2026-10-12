# Vaibhav Kumar · Portfolio

Static portfolio built with Next.js (App Router), Tailwind v4, shadcn/ui, Motion and MDX. Deployed to Netlify as a static export (`out/`).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. in Netlify env vars) so Open Graph URLs are absolute.

## Editing content

All content lives in `src/content`:

| What | Where |
| --- | --- |
| Name, intro, nav, socials, skills | `site.ts` |
| Projects (repo / live / demo links) | `projects.ts` |
| External articles (Hashnode, Medium…) | `articles.ts` |
| On-site posts | `posts/*.mdx` with `export const metadata = {...}` |
| Work & education | `experience.ts` |
| Showcases | `showcases.ts` |

## Adding an on-site demo (showcase)

1. Create a client component at `src/showcases/<slug>/index.tsx`.
2. Register it in `src/showcases/registry.ts`.
3. Add a `kind: "embedded"` entry to `src/content/showcases.ts`. It is served at `/showcase/<slug>/`.

Link a project to its demo with `showcase: "<slug>"` in `projects.ts`.

## Theming

Light/dark via `next-themes`; accent palettes are defined in `src/app/globals.css` (`[data-accent=...]`) and listed in `src/components/theme/accents.ts`.
