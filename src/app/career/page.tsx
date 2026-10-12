import type { Metadata } from "next";
import { Briefcase, GraduationCap } from "lucide-react";
import { experience, education } from "@/content/experience";
import { socials } from "@/content/site";
import { PageHeader, SectionHeading } from "@/components/site/headings";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { Timeline } from "@/components/site/timeline";

export const metadata: Metadata = {
  title: "Career",
  description: "Work experience and education.",
};

export default function CareerPage() {
  const current = experience.find((entry) => !entry.end);
  const latestDegree = education[0];
  const linkedin = socials.find((s) => s.key === "linkedin");

  return (
    <>
      <PageHeader
        eyebrow="Career"
        title="Where I've worked & studied"
        description="A timeline of my roles and education, from data analysis and technical writing to building software at Cisco."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {current && (
          <SpotlightCard className="p-6">
            <Briefcase className="size-5 text-brand" />
            <p className="mt-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">Currently</p>
            <p className="mt-1 text-xl font-semibold">{current.role}</p>
            <p className="text-muted-foreground">
              {current.org} · since {current.start}
            </p>
          </SpotlightCard>
        )}
        {latestDegree && (
          <SpotlightCard className="p-6">
            <GraduationCap className="size-5 text-brand" />
            <p className="mt-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">Education</p>
            <p className="mt-1 text-xl font-semibold">{latestDegree.role}</p>
            <p className="text-muted-foreground">
              {latestDegree.org}
              {latestDegree.description && ` · ${latestDegree.description}`}
            </p>
          </SpotlightCard>
        )}
      </div>

      <section className="mt-20 grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Work" title="Experience" />
          <Timeline entries={experience} />
        </div>
        <div>
          <SectionHeading eyebrow="Learning" title="Education" />
          <Timeline entries={education} />
        </div>
      </section>

      {linkedin && (
        <p className="mt-20 text-center text-sm text-muted-foreground">
          More details on{" "}
          <a href={linkedin.href} target="_blank" rel="noreferrer" className="text-brand hover:underline">
            LinkedIn
          </a>
          .
        </p>
      )}
    </>
  );
}
