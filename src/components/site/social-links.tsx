import type { IconType } from "react-icons";
import { FaGithub, FaHackerrank, FaHashnode, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { Mail } from "lucide-react";
import type { SocialKey, SocialLink } from "@/content/types";
import { socials } from "@/content/site";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialKey, IconType | typeof Mail> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  hashnode: FaHashnode,
  leetcode: SiLeetcode,
  hackerrank: FaHackerrank,
  email: Mail,
};

export function SocialIcon({ name, className }: { name: SocialKey; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden />;
}

export function SocialLinks({ links = socials, className }: { links?: SocialLink[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-1", className)}>
      {links.map((link) => (
        <li key={link.key}>
          <a
            href={link.href}
            target={link.key === "email" ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={link.label}
            title={link.label}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand"
          >
            <SocialIcon name={link.key} className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
