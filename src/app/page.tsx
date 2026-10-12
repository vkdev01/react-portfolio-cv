import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { site, profileSnippet } from "@/content/site";
import { projects } from "@/content/projects";
import { showcases } from "@/content/showcases";
import { experience, education } from "@/content/experience";
import { getAllArticles } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/site/social-links";
import { CodeBlock } from "@/components/site/code-block";
import { SectionHeading } from "@/components/site/headings";
import { ProjectCard } from "@/components/site/project-card";
import { ArticleRow } from "@/components/site/article-row";
import { ShowcaseCard } from "@/components/site/showcase-card";
import { Timeline } from "@/components/site/timeline";
import { Reveal } from "@/components/site/reveal";

export default async function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const latest = (await getAllArticles()).slice(0, 4);

  return (
    <div className="space-y-28">
      <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="animate-in duration-700 fill-mode-both fade-in slide-in-from-bottom-4">
          <p className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-brand" />
            {site.role}
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Hi, I&apos;m {site.name.split(" ")[0]}.
            <br />
            <span className="text-gradient">{site.headline}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{site.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-10 px-4">
              <Link href="/projects/">
                View projects <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-10 px-4">
              <Link href="/articles/">
                <BookOpen data-icon="inline-start" /> Read articles
              </Link>
            </Button>
          </div>
          <SocialLinks className="mt-8 -ml-2" />
        </div>
        <div className="animate-in delay-150 duration-700 fill-mode-both fade-in slide-in-from-bottom-4">
          <CodeBlock code={profileSnippet} title="about.ts" />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Projects" title="Featured work" href="/projects/" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHeading eyebrow="Writing" title="Latest articles" href="/articles/" />
          <div className="-mx-4 space-y-1">
            {latest.map((article) => (
              <ArticleRow key={article.href} article={article} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Showcase" title="Try it live" href="/showcase/" />
          <div className="space-y-4">
            {showcases.slice(0, 2).map((item) => (
              <ShowcaseCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Career" title="Experience" href="/career/" linkLabel="Full timeline" />
          <Timeline entries={experience} />
        </div>
        <div>
          <SectionHeading eyebrow="Learning" title="Education" />
          <Timeline entries={education} />
        </div>
      </section>
    </div>
  );
}
