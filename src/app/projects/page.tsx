import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { learningRepos } from "@/content/learning";
import type { Project } from "@/content/types";
import { PageHeader, SectionHeading } from "@/components/site/headings";
import { ProjectCard } from "@/components/site/project-card";
import { ProjectGrid } from "@/components/site/project-grid";

const learningApps: Project[] = learningRepos.map(({ slug, title, description, tags, icon, repo, live }) => ({
  slug,
  title,
  description,
  tags: ["Web App", ...tags],
  icon,
  repo,
  live,
}));

export const metadata: Metadata = {
  title: "Projects",
  description: "Open-source projects and experiments, from APIs and microservices to ML tools.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I've built"
        description="Many of these are open source. Feel free to explore the code and suggest improvements."
      />
      <ProjectGrid projects={projects} />

      <section className="mt-24">
        <SectionHeading eyebrow="Web apps" title="Curated learning repos" href="/learning/" linkLabel="All guides" />
        <p className="-mt-2 mb-6 max-w-2xl text-muted-foreground">
          Guides and tutorials I&apos;ve built and published as web apps. Open the live site or browse the source.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {learningApps.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
