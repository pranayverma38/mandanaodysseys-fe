import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import type { DestinationHighlight } from '@/data/destinations'
import { DestinationsBreadcrumb } from '@/app/(app)/destinations/components/destinations-breadcrumb'
import { DestinationHeroScrollArrow } from './destination-hero-scroll-arrow'
import { DestinationHeroVideo } from './destination-hero-video'
import Image from 'next/image'

const CATEGORY_LABELS: Record<DestinationHighlight['category'], string> = {
  Cuisine: 'Cuisine',
  Culture: 'Culture',
  History: 'History',
  Landmark: 'Best tourist place',
}

interface DestinationIntroSectionProps {
  destinationSlug: string
  introTitle: string
  introDescription: string
  highlightsTitle: string
  highlights: DestinationHighlight[]
  destinationName: string
  heroImage: string
  heroVideo?: string
}

export function DestinationIntroSection({
  destinationSlug,
  introTitle,
  introDescription,
  highlightsTitle,
  highlights,
  destinationName,
  heroImage,
  heroVideo,
}: DestinationIntroSectionProps) {
  const displayHighlights = highlights.slice(0, 4)

  return (
    <div className="relative">
      <div className="relative sticky top-20 z-0 h-[calc(100dvh-5rem)] overflow-hidden">
        {heroVideo ? (
          <DestinationHeroVideo src={heroVideo} poster={heroImage} />
        ) : (
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/45 to-black/25" />
      </div>

      <div className="relative z-10 -mt-[calc(100dvh-5rem)]">
        <section className="flex min-h-[calc(100dvh-5rem)] w-full flex-col">
          <div className="container relative flex min-h-[calc(100dvh-5rem)] flex-col px-4 py-6 sm:px-6 lg:px-8">
            <DestinationsBreadcrumb destinationSlug={destinationSlug} overlay />

            <div className="relative mt-auto flex w-full flex-col items-center gap-4 pb-25 sm:gap-6 sm:pb-12 lg:pb-16">
              <div className="w-full max-w-3xl self-start">
                <p className="text-sm font-medium tracking-wide text-white/80 uppercase">{destinationName}</p>
                <Heading level={1} className="mt-3 text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                  {introTitle}
                </Heading>
              </div>
              <DestinationHeroScrollArrow />
            </div>
          </div>
        </section>

        <div id="destination-content" className="w-full bg-background">
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
      </div>
    </div>
  )
}
