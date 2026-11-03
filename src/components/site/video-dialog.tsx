"use client";

import type { ReactNode } from "react";
import { Dialog } from "radix-ui";
import { XIcon } from "lucide-react";
import type { ProjectMedia } from "@/content/types";

/** Plays a demo clip in an in-page dialog; the video only exists while the dialog is open. */
export function VideoDialog({
  media,
  title,
  children,
}: {
  media: ProjectMedia;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(94vw,1280px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border bg-background shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          <div className="flex items-center justify-between gap-4 border-b px-4 py-2.5">
            <Dialog.Title className="truncate text-sm font-medium">{title}</Dialog.Title>
            <Dialog.Close
              aria-label="Close video"
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <XIcon className="size-4" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">{media.alt}</Dialog.Description>
          <video
            src={media.video}
            poster={media.poster}
            aria-label={media.alt}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="aspect-[16/10] max-h-[80vh] w-full bg-black object-contain"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
