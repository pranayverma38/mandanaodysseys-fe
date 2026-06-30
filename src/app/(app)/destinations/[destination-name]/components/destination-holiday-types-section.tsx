import { Heading } from '@/components/heading'
import { getTourTypePath, TOUR_TYPES } from '@/data/destinations'
import type { TItineraryListing } from '@/data/itineraries'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface DestinationHolidayTypesSectionProps {
  destinationName: string
  destinationSlug: string
  listings: TItineraryListing[]
}

export function DestinationHolidayTypesSection({
  destinationName,
  destinationSlug,
  listings,
}: DestinationHolidayTypesSectionProps) {
  const tourTypesWithPackages = TOUR_TYPES.map((tourType) => ({
    ...tourType,
    packageCount: listings.filter((listing) =>
      listing.categories.some((category) => category.category === tourType.slug)
    ).length,
  })).filter((tourType) => tourType.packageCount > 0)

  if (tourTypesWithPackages.length === 0) {
    return null
  }

  return (
    <section className="space-y-8">
      <Heading level={2}>
        Browse by <span data-slot="italic">holiday type</span> in {destinationName}
      </Heading>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tourTypesWithPackages.map((tourType) => (
          <Link
            key={tourType.slug}
            href={getTourTypePath(destinationSlug, tourType.slug)}
            className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{tourType.name}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{tourType.description}</p>
                <p className="mt-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {tourType.packageCount} {tourType.packageCount === 1 ? 'package' : 'packages'}
                </p>
              </div>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white dark:border-neutral-700 dark:bg-neutral-800">
                <ArrowUpRightIcon className="size-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
