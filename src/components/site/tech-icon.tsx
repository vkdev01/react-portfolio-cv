import type { IconType } from "react-icons";
import { SiFastapi, SiFlask, SiNextdotjs, SiNodedotjs, SiPython, SiPytorch, SiReact } from "react-icons/si";
import { Code2, SquareTerminal, Telescope } from "lucide-react";
import type { TechIconKey } from "@/content/types";

const ICONS: Record<TechIconKey, IconType | typeof Code2> = {
  fastapi: SiFastapi,
  python: SiPython,
  nodejs: SiNodedotjs,
  flask: SiFlask,
  react: SiReact,
  nextjs: SiNextdotjs,
  pytorch: SiPytorch,
  agent: Telescope,
  terminal: SquareTerminal,
  generic: Code2,
};

export function TechIcon({ name, className }: { name: TechIconKey; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden />;
}
