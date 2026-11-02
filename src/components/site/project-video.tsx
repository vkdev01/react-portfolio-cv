"use client";

import { useEffect, useRef } from "react";
import { Maximize2 } from "lucide-react";
import type { ProjectMedia } from "@/content/types";

/** Plays only while on screen, and never for reduced-motion users; nothing downloads until then. */
export function ProjectVideo({ media }: { media: ProjectMedia }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={media.video}
      target="_blank"
      rel="noreferrer"
      title="Watch full size"
      className="group/media relative -mx-5 -mt-5 mb-5 block aspect-[16/10] overflow-hidden border-b bg-muted"
    >
      <video
        ref={ref}
        src={media.video}
        poster={media.poster}
        aria-label={media.alt}
        muted
        loop
        playsInline
        preload="none"
        className="size-full object-cover object-top transition-transform duration-500 group-hover/media:scale-[1.02]"
      />
      <span className="pointer-events-none absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover/media:opacity-100">
        <Maximize2 className="size-3" /> Watch full size
      </span>
    </a>
  );
}
