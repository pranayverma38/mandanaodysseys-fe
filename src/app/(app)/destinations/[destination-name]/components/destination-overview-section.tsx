import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import type { DestinationHighlight } from '@/data/destinations'
import Image from 'next/image'

const CATEGORY_LABELS: Record<DestinationHighlight['category'], string> = {
  Cuisine: 'Cuisine',
  Culture: 'Culture',
  History: 'History',
  Landmark: 'Best tourist place',
}

interface DestinationOverviewSectionProps {
  introDescription: string
  highlightsTitle: string
  highlights: DestinationHighlight[]
}

export function DestinationOverviewSection({
  introDescription,
  highlightsTitle,
  highlights,
}: DestinationOverviewSectionProps) {
  const displayHighlights = highlights.slice(0, 4)

  return (
    <div id="destination-overview" className="scroll-mt-16 w-full bg-background">
      <div className="container flex flex-col gap-y-12 px-4 py-12 sm:px-6 lg:gap-y-16 lg:px-8 lg:py-16">
        <Text className="mx-auto max-w-3xl text-center text-lg text-muted-foreground">{introDescription}</Text>

        <div className="space-y-8">
          <Heading level={2} className="text-center">
            {highlightsTitle}
          </Heading>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {displayHighlights.map((highlight) => (
              <article
                key={highlight.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="relative aspect-4/3 overflow-hidden lg:aspect-3/4">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-medium text-neutral-900 backdrop-blur-sm sm:top-3 sm:left-3 sm:px-3 sm:py-1 sm:text-xs">
                    {CATEGORY_LABELS[highlight.category]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-4 lg:p-5">
                  <h3 className="text-sm font-semibold text-neutral-900 sm:text-base dark:text-neutral-100">
                    {highlight.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-neutral-600 sm:mt-2 sm:text-sm dark:text-neutral-400">
                    {highlight.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
