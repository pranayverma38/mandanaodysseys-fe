import { Heading } from '@/components/heading'
import { DestinationsBreadcrumb } from '@/app/(app)/destinations/components/destinations-breadcrumb'
import { DestinationHeroScrollArrow } from './destination-hero-scroll-arrow'
import { DestinationHeroVideo } from './destination-hero-video'
import Image from 'next/image'

interface DestinationIntroSectionProps {
  destinationSlug: string
  introTitle: string
  destinationName: string
  heroImage: string
  heroVideo?: string
}

export function DestinationIntroSection({
  destinationSlug,
  introTitle,
  destinationName,
  heroImage,
  heroVideo,
}: DestinationIntroSectionProps) {
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
      </div>
    </div>
  )
}
