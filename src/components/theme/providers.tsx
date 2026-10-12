"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <TooltipProvider>{children}</TooltipProvider>
      </MotionConfig>
    </NextThemesProvider>
  );
}
