const pulseClass = 'animate-pulse rounded-3xl bg-neutral-200 dark:bg-neutral-800'

export default function HomeLoading() {
  return (
    <main role="status" aria-live="polite" className="relative">
      <span className="sr-only">Loading homepage</span>
      <div className="h-[85dvh] min-h-[85dvh] bg-[#0a0705] lg:h-[90dvh] lg:min-h-[90dvh]" />
      <div className="container space-y-8 py-10 sm:py-14">
        <div className={`${pulseClass} mx-auto h-10 w-64`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`${pulseClass} aspect-4/3`} />
          ))}
        </div>
      </div>
    </main>
  )
}
