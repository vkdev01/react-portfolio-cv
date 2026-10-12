import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { showcases } from "@/content/showcases";
import { showcaseLoaders } from "@/showcases/registry";
import { Badge } from "@/components/ui/badge";

export const dynamicParams = false;

export function generateStaticParams() {
  return showcases.filter((s) => s.kind === "embedded").map(({ slug }) => ({ slug }));
}

const find = (slug: string) => showcases.find((s) => s.slug === slug && s.kind === "embedded");

export async function generateMetadata({ params }: PageProps<"/showcase/[slug]">): Promise<Metadata> {
  const item = find((await params).slug);
  return item ? { title: item.title, description: item.description } : {};
}

export default async function ShowcaseItemPage({ params }: PageProps<"/showcase/[slug]">) {
  const { slug } = await params;
  const item = find(slug);
  const load = showcaseLoaders[slug];
  if (!item || !load) notFound();

  const { default: Demo } = await load();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/showcase/"
        className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> Showcase
      </Link>
      <header className="mt-8 mb-8">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-gradient mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{item.description}</p>
        {item.repo && (
          <a
            href={item.repo}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <FaGithub /> Source
          </a>
        )}
      </header>
      <section className="rounded-xl border bg-card/60 p-6 backdrop-blur-sm">
        <Demo />
      </section>
    </div>
  );
}
