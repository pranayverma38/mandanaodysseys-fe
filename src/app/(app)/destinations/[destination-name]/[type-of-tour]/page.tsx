import { DestinationsBreadcrumb } from '@/app/(app)/destinations/components/destinations-breadcrumb'
import SectionListingsCarousel from '@/components/section-listings-carousel'
import { Heading } from '@/components/heading'
import {
  DESTINATIONS,
  getDestinationBySlug,
  getTourTypeBySlug,
  TOUR_TYPES,
} from '@/data/destinations'
import { getExperienceListings } from '@/data/listings'
import { createCategoryMetadata, createNotFoundMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ 'destination-name': string; 'type-of-tour': string }>
}

export async function generateStaticParams() {
  return DESTINATIONS.flatMap((destination) =>
    TOUR_TYPES.map((tourType) => ({
      'destination-name': destination.slug,
      'type-of-tour': tourType.slug,
    }))
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'destination-name': destinationSlug, 'type-of-tour': tourTypeSlug } = await params
  const destination = getDestinationBySlug(destinationSlug)
  const tourType = getTourTypeBySlug(tourTypeSlug)

  if (!destination || !tourType) {
    return createNotFoundMetadata('Tour Package')
  }

  return createCategoryMetadata({
    name: `${tourType.name} in ${destination.name}`,
    description: `${tourType.description} Explore ${tourType.name.toLowerCase()} in ${destination.name} with Mandana Odysseys.`,
    path: `/destinations/${destination.slug}/${tourType.slug}`,
    label: 'Packages',
  })
}

export default async function TourTypePage({ params }: PageProps) {
  const { 'destination-name': destinationSlug, 'type-of-tour': tourTypeSlug } = await params
  const destination = getDestinationBySlug(destinationSlug)
  const tourType = getTourTypeBySlug(tourTypeSlug)

  if (!destination || !tourType) {
    notFound()
  }

  const listings = await getExperienceListings()

  return (
    <div className="flex flex-col gap-y-12 pb-16 lg:gap-y-16 lg:pb-24">
      <DestinationsBreadcrumb destinationSlug={destination.slug} tourTypeSlug={tourType.slug} />

      <section className="space-y-6">
        <Heading level={2}>
          Featured <span data-slot="italic">packages</span>
        </Heading>
        <SectionListingsCarousel
          heading={`Top ${tourType.name.toLowerCase()} <span data-slot="italic">in ${destination.name}</span>`}
          headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
          subHeading={`Handpicked ${tourType.name.toLowerCase()} curated for travelers exploring ${destination.name}.`}
          listings={listings.slice(0, 8)}
          cardType="experience"
        />
      </section>

      <section className="space-y-6">
        <Heading level={2}>
          More packages <span data-slot="italic">to explore</span>
        </Heading>
        <SectionListingsCarousel
          heading={`Popular picks for <span data-slot="italic">${destination.name}</span>`}
          headingFontClassName="text-2xl sm:text-3xl xl:text-4xl"
          listings={listings.slice(2, 10)}
          cardType="experience"
        />
      </section>

      <section className="rounded-3xl bg-neutral-50 p-8 dark:bg-neutral-900">
        <Heading level={3} className="mb-4">
          Explore other holiday types in {destination.name}
        </Heading>
        <div className="flex flex-wrap gap-3">
          {TOUR_TYPES.filter((item) => item.slug !== tourType.slug).map((item) => (
            <Link
              key={item.slug}
              href={`/destinations/${destination.slug}/${item.slug}`}
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
