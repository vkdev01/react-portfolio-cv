"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AccentPicker } from "@/components/theme/accent-picker";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const trim = (path: string) => path.replace(/\/+$/, "") || "/";

function isActive(pathname: string, href: string) {
  const [current, target] = [trim(pathname), trim(href)];
  return target === "/" ? current === "/" : current === target || current.startsWith(`${target}/`);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/60 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5" aria-label="Main">
        <Link href="/" className="group flex items-center gap-2 font-mono text-sm font-semibold">
          <span className="inline-flex size-8 items-center justify-center rounded-lg border bg-card text-brand transition-colors group-hover:border-brand/50">
            {site.initials}
          </span>
          <span className="hidden sm:inline">{site.name.toLowerCase().replace(" ", ".")}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    active && "text-foreground",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3 -bottom-[17px] h-px bg-linear-to-r from-transparent via-brand to-transparent"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-0.5">
          <AccentPicker />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="font-mono">{site.initials}</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                          isActive(pathname, item.href) && "bg-muted text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
