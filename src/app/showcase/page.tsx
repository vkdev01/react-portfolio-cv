import type { Metadata } from "next";
import { showcases } from "@/content/showcases";
import { PageHeader } from "@/components/site/headings";
import { ShowcaseCard } from "@/components/site/showcase-card";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Interactive demos and highlights of personal projects.",
};

export default function ShowcasePage() {
  return (
    <>
      <PageHeader
        eyebrow="Showcase"
        title="Demos & highlights"
        description="Interactive demos that run right here on the site, plus highlights of things I've shipped."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {showcases.map((item) => (
          <ShowcaseCard key={item.slug} item={item} />
        ))}
      </div>
    </>
  );
}
