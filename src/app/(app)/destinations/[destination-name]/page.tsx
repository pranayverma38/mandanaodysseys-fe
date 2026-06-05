import { DestinationsBreadcrumb } from '@/app/(app)/destinations/components/destinations-breadcrumb'
import { Heading } from '@/components/heading'
import {
  DESTINATIONS,
  getDestinationBySlug,
  getTourTypePath,
  TOUR_TYPES,
} from '@/data/destinations'
import { createCategoryMetadata, createNotFoundMetadata } from '@/lib/seo'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ 'destination-name': string }>
}

export async function generateStaticParams() {
  return DESTINATIONS.map((destination) => ({
    'destination-name': destination.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'destination-name': destinationSlug } = await params
  const destination = getDestinationBySlug(destinationSlug)

  if (!destination) {
    return createNotFoundMetadata('Destination')
  }

  return createCategoryMetadata({
    name: destination.name,
    description: destination.description,
    path: `/destinations/${destination.slug}`,
    label: 'Tour Packages',
  })
}

export default async function DestinationPage({ params }: PageProps) {
  const { 'destination-name': destinationSlug } = await params
  const destination = getDestinationBySlug(destinationSlug)

  if (!destination) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-y-12 lg:gap-y-16">
      <DestinationsBreadcrumb destinationSlug={destination.slug} />

      <section className="space-y-8">
        <Heading level={2}>
          Browse by <span data-slot="italic">holiday type</span>
        </Heading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOUR_TYPES.map((tourType) => (
            <Link
              key={tourType.slug}
              href={getTourTypePath(destination.slug, tourType.slug)}
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{tourType.name}</h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{tourType.description}</p>
                </div>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white dark:border-neutral-700 dark:bg-neutral-800">
                  <ArrowUpRightIcon className="size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
