'use client'

import { Location06Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import type { ItineraryExperience } from '@/data/itineraries/types'
import { isProxiedItineraryImageUrl, resolveItineraryImageUrl } from '@/lib/itinerary-image-url'
import { SectionHeading } from '../../(listings)/components/section-heading'

interface Props {
  experiences: ItineraryExperience[]
}

function ExperienceCard({
  experience,
  className,
}: {
  experience: ItineraryExperience
  className?: string
}) {
  const imageUrl = resolveItineraryImageUrl(experience.imageUrl)

  return (
    <article
      className={clsx(
        'flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg-for-card',
        className
      )}
    >
      <div className="relative aspect-4/3 w-full">
        <Image
          src={imageUrl}
          alt={experience.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={isProxiedItineraryImageUrl(imageUrl)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-foreground">{experience.title}</h3>
          {experience.subtitle ? (
            <p className="text-sm text-muted-foreground">{experience.subtitle}</p>
          ) : null}
        </div>

        {experience.description ? (
          <p className="text-sm leading-6 text-muted-foreground">{experience.description}</p>
        ) : null}

        {experience.location ? (
          <div className="mt-auto flex items-start gap-2 text-sm text-muted-foreground">
            <HugeiconsIcon icon={Location06Icon} size={18} className="mt-0.5 shrink-0" />
            <span>{experience.location}</span>
          </div>
        ) : null}
      </div>
    </article>
  )
}

const ItineraryExperiencesSection = ({ experiences }: Props) => {
  if (!experiences.length) {
    return null
  }

  const useMobileSlider = experiences.length > 1

  return (
    <div id="itinerary-experiences" className="listingSection__wrap scroll-mt-20">
      <SectionHeading>Experiences</SectionHeading>

      {useMobileSlider ? (
        <div className="hidden-scrollbar -mr-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-4 sm:-mr-6 sm:pr-6 md:hidden">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.title}-${index}`}
              experience={experience}
              className="w-[85%] shrink-0 snap-start"
            />
          ))}
        </div>
      ) : (
        <div className="md:hidden">
          {experiences.map((experience, index) => (
            <ExperienceCard key={`${experience.title}-${index}`} experience={experience} />
          ))}
        </div>
      )}

      <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
        {experiences.map((experience, index) => (
          <ExperienceCard key={`${experience.title}-${index}`} experience={experience} />
        ))}
      </div>
    </div>
  )
}

export default ItineraryExperiencesSection
