export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="absolute -top-40 left-1/2 h-112 w-3xl -translate-x-1/2 rounded-full bg-brand/20 blur-[120px] dark:bg-brand/15" />
      <div className="absolute top-40 -right-40 size-96 rounded-full bg-brand-2/10 blur-[120px]" />
    </div>
  );
}
