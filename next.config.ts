import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Fully static site (Netlify free tier): no server runtime, so no cacheComponents / image optimizer.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Turbopack requires plugins as strings with serializable options.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        { theme: { light: "github-light", dark: "github-dark-dimmed" }, keepBackground: false },
      ],
    ],
  },
});

export default withMDX(nextConfig);
