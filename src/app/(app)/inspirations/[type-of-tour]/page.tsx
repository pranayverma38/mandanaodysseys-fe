import { InspirationsBreadcrumb } from '@/app/(app)/inspirations/components/inspirations-breadcrumb'
import { Heading } from '@/components/heading'
import ItineraryListingsGrid from '@/components/itinerary-listings-grid'
import { Text } from '@/components/text'
import {
  DESTINATIONS,
  getInspirationPath,
  getTourTypeBySlug,
  getTourTypePath,
  TOUR_TYPES,
} from '@/data/destinations'
import { getItineraryListingsByFilters } from '@/data/itineraries'
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

  const listings = await getItineraryListingsByFilters({ category: tourType.slug })

  const destinationsWithPackages = DESTINATIONS.map((destination) => ({
    ...destination,
    packageCount: listings.filter((listing) => listing.destination === destination.slug).length,
  })).filter((destination) => destination.packageCount > 0)

  return (
    <div className="flex flex-col gap-y-12 pb-16 lg:gap-y-16 lg:pb-24">
      <InspirationsBreadcrumb tourTypeSlug={tourType.slug} />

      <section className="space-y-6">
        <div>
          <Heading level={2}>
            {tourType.name} <span data-slot="italic">worldwide</span>
          </Heading>
          <Text className="mt-3 max-w-3xl text-muted-foreground">
            {tourType.description} Handpicked {tourType.name.toLowerCase()} curated for travelers across our
            destinations.
          </Text>
        </div>

        <ItineraryListingsGrid
          listings={listings}
          className="mt-2"
          emptyMessage={`No ${tourType.name.toLowerCase()} packages yet. Explore other holiday types below.`}
        />
      </section>

      {destinationsWithPackages.length > 0 && (
        <section className="space-y-6">
          <Heading level={2}>
            Explore by <span data-slot="italic">destination</span>
          </Heading>
          <div className="flex flex-wrap gap-3">
            {destinationsWithPackages.map((destination) => (
              <Link
                key={destination.slug}
                href={getTourTypePath(destination.slug, tourType.slug)}
                className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
              >
                {destination.name} ({destination.packageCount})
              </Link>
            ))}
          </div>
        </section>
      )}

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
