import { InspirationsBreadcrumb } from '@/app/(app)/inspirations/components/inspirations-breadcrumb'
import SectionListingsCarousel from '@/components/section-listings-carousel'
import { Heading } from '@/components/heading'
import {
  DESTINATIONS,
  getInspirationPath,
  getTourTypeBySlug,
  getTourTypePath,
  TOUR_TYPES,
} from '@/data/destinations'
import { getExperienceListings } from '@/data/listings'
import { createCategoryMetadata, createNotFoundMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ 'type-of-tour': string }>
}

export async function generateStaticParams() {
  return TOUR_TYPES.map((tourType) => ({
    'type-of-tour': tourType.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'type-of-tour': tourTypeSlug } = await params
  const tourType = getTourTypeBySlug(tourTypeSlug)

  if (!tourType) {
    return createNotFoundMetadata('Inspiration')
  }

  return createCategoryMetadata({
    name: tourType.name,
    description: tourType.description,
    path: `/inspirations/${tourType.slug}`,
    label: 'Travel Inspiration',
  })
}

export default async function InspirationTourTypePage({ params }: PageProps) {
  const { 'type-of-tour': tourTypeSlug } = await params
  const tourType = getTourTypeBySlug(tourTypeSlug)

  if (!tourType) {
    notFound()
  }

  const listings = await getExperienceListings()

  return (
    <div className="flex flex-col gap-y-12 pb-16 lg:gap-y-16 lg:pb-24">
      <InspirationsBreadcrumb tourTypeSlug={tourType.slug} />

      <section className="space-y-6">
        <Heading level={2}>
          Featured <span data-slot="italic">packages</span>
        </Heading>
        <SectionListingsCarousel
          heading={`Top ${tourType.name.toLowerCase()} <span data-slot="italic">worldwide</span>`}
          headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
          subHeading={`Handpicked ${tourType.name.toLowerCase()} curated for travelers across our destinations.`}
          listings={listings.slice(0, 8)}
          cardType="experience"
        />
      </section>

      <section className="space-y-6">
        <Heading level={2}>
          Explore by <span data-slot="italic">destination</span>
        </Heading>
        <div className="flex flex-wrap gap-3">
          {DESTINATIONS.map((destination) => (
            <Link
              key={destination.slug}
              href={getTourTypePath(destination.slug, tourType.slug)}
              className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
            >
              {destination.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <Heading level={2}>
          More packages <span data-slot="italic">to explore</span>
        </Heading>
        <SectionListingsCarousel
          heading={`Popular ${tourType.name.toLowerCase()} <span data-slot="italic">picks</span>`}
          headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
          listings={listings.slice(2, 10)}
          cardType="experience"
        />
      </section>

      <section className="rounded-3xl bg-neutral-50 p-8 dark:bg-neutral-900">
        <Heading level={3} className="mb-4">
          Explore other holiday types
        </Heading>
        <div className="flex flex-wrap gap-3">
          {TOUR_TYPES.filter((item) => item.slug !== tourType.slug).map((item) => (
            <Link
              key={item.slug}
              href={getInspirationPath(item.slug)}
              className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
