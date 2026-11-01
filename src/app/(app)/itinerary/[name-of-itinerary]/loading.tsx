const pulseClass = 'animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800'

export default function ItineraryLoading() {
  return (
    <div role="status" aria-live="polite" className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <span className="sr-only">Loading itinerary</span>

      <div className="mt-5 flex gap-6 overflow-hidden py-4 lg:mt-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={`${pulseClass} h-5 w-28 rounded-full`} />
        ))}
      </div>

      <div className="mt-2 md:grid md:grid-cols-3 md:gap-x-2">
        <div className={`${pulseClass} aspect-4/5 md:aspect-3/4`} />
        <div className={`${pulseClass} hidden aspect-3/4 md:block`} />
        <div className="hidden md:grid md:gap-y-2">
          <div className={`${pulseClass} aspect-3/2`} />
          <div className={`${pulseClass} aspect-3/2`} />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[59%_minmax(0,1fr)] xl:gap-x-[8%]">
        <div className="space-y-4">
          <div className={`${pulseClass} h-10 w-3/4`} />
          <div className={`${pulseClass} h-4 w-1/2`} />
          <div className={`${pulseClass} h-24 w-full`} />
          <div className={`${pulseClass} h-64 w-full`} />
        </div>
        <div className={`${pulseClass} hidden h-80 lg:block`} />
      </div>
    </div>
  )
}
