import type { Metadata } from "next";
import { learningRepos } from "@/content/learning";
import { PageHeader } from "@/components/site/headings";
import { LearningCard } from "@/components/site/learning-card";

export const metadata: Metadata = {
  title: "Learning",
  description: "Curated learning repos: open guides and tutorials on AI agents, reasoning models and system design.",
};

export default function LearningPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learning"
        title="Curated learning repos"
        description="Guides and tutorials I've written while learning in public. Each one is open source and published as a site you can read."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {learningRepos.map((item) => (
          <LearningCard key={item.slug} item={item} />
        ))}
      </div>
    </>
  );
}
