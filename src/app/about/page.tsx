import type { Metadata } from "next";
import { site, skills } from "@/content/site";
import { experience, education } from "@/content/experience";
import { PageHeader, SectionHeading } from "@/components/site/headings";
import { SocialLinks } from "@/components/site/social-links";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { Timeline } from "@/components/site/timeline";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
  description: site.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title={`I'm ${site.name}`} />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-8 text-foreground/85">
          <p>{site.intro}</p>
          {site.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="border-l-2 border-brand pl-4 font-mono text-sm text-muted-foreground">
            {"// fun fact: "}
            {site.funFact}
          </p>
        </div>
        <SpotlightCard className="h-fit p-6">
          <p className="font-mono text-xs tracking-widest text-brand uppercase">Get in touch</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Open to collaborations and new ideas. The fastest way to reach me is email or LinkedIn.
          </p>
          <a href={`mailto:${site.email}`} className="mt-4 block font-mono text-sm text-brand hover:underline">
            {site.email}
          </a>
          <SocialLinks className="mt-4 -ml-2" />
        </SpotlightCard>
      </div>

      <section className="mt-24">
        <SectionHeading eyebrow="Toolbox" title="Skills & technologies" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([group, items]) => (
            <SpotlightCard key={group} className="p-5">
              <h3 className="font-mono text-sm text-muted-foreground">{group}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Career" title="Experience" />
          <Timeline entries={experience} />
        </div>
        <div>
          <SectionHeading eyebrow="Learning" title="Education" />
          <Timeline entries={education} />
        </div>
      </section>
    </>
  );
}
