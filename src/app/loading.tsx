export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
      <div className="h-[var(--navbar-height)] border-b border-[var(--color-border)] px-6 flex items-center justify-between">
        <div className="skeleton h-6 w-28" />
        <div className="hidden md:flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-4 w-16" />
          ))}
        </div>
        <div className="h-9 w-24 rounded-full" />
      </div>
      <div className="flex-1 container-cafe py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <div className="skeleton h-8 w-48 rounded-full" />
          <div className="skeleton h-16 w-full max-w-lg" />
          <div className="skeleton h-16 w-full max-w-md" />
          <div className="skeleton h-5 w-full max-w-sm" />
          <div className="flex gap-4 pt-4">
            <div className="skeleton h-12 w-32 rounded-full" />
            <div className="skeleton h-12 w-36 rounded-full" />
          </div>
        </div>
        <div className="skeleton aspect-[4/5] max-w-md mx-auto w-full rounded-[var(--radius-xl)]" />
      </div>
    </div>
  );
}
