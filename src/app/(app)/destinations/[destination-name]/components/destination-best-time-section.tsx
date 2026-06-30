import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import type { DestinationBestTimePeriod } from '@/data/destinations'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

interface DestinationBestTimeSectionProps {
  destinationName: string
  bestTimeSummary: string
  periods: DestinationBestTimePeriod[]
}

export function DestinationBestTimeSection({
  destinationName,
  bestTimeSummary,
  periods,
}: DestinationBestTimeSectionProps) {
  return (
    <section className="space-y-8">
      <div>
        <Heading level={2}>
          Best time to visit <span data-slot="italic">{destinationName}</span>
        </Heading>
        <Text className="mt-3 max-w-3xl text-muted-foreground">{bestTimeSummary}</Text>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {periods.map((period) => (
          <article
            key={period.period}
            className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-[#FC6200]">
              <CalendarDaysIcon className="size-4" />
              {period.period}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{period.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{period.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
