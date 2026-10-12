import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { PageHeader } from "@/components/site/headings";
import { ProjectGrid } from "@/components/site/project-grid";

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
    </>
  );
}
