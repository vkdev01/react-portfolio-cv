"use client";

import { useState } from "react";
import { Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ACCENTS, DEFAULT_ACCENT, applyAccent, type Accent } from "./accents";

const SWATCH: Record<Accent, string> = {
  violet: "oklch(0.65 0.22 288)",
  emerald: "oklch(0.7 0.16 160)",
  amber: "oklch(0.78 0.16 70)",
  rose: "oklch(0.68 0.2 10)",
  sky: "oklch(0.7 0.14 235)",
};

function readAccent(): Accent {
  if (typeof document === "undefined") return DEFAULT_ACCENT;
  const current = document.documentElement.dataset.accent as Accent | undefined;
  return current && ACCENTS.includes(current) ? current : DEFAULT_ACCENT;
}

export function AccentPicker() {
  // Safe to read the DOM here: the menu content that uses this state is never server-rendered.
  const [accent, setAccent] = useState<Accent>(readAccent);

  const choose = (next: Accent) => {
    setAccent(next);
    applyAccent(next);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Choose accent color">
          <Palette />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Accent</DropdownMenuLabel>
        {ACCENTS.map((name) => (
          <DropdownMenuItem key={name} onSelect={() => choose(name)} className="capitalize">
            <span className="size-3 rounded-full" style={{ background: SWATCH[name] }} />
            {name}
            {accent === name && <Check className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
