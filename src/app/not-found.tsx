import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="text-gradient mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This route doesn&apos;t exist. Maybe it was moved, or maybe it never compiled.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
