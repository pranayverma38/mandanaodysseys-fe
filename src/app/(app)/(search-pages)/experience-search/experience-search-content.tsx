'use client'

import { Divider } from '@/components/divider'
import ExperiencesCard from '@/components/experiences-card'
import ListingFilterTabs from '@/components/listing-filter-tabs'
import {
  countActiveItineraryFilters,
  filterItineraryListings,
  parseItinerarySearchParams,
  type ItinerarySearchFilterOption,
} from '@/data/itineraries/search'
import type { TItineraryListing } from '@/data/listings'
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'

interface Props {
  listings: TItineraryListing[]
  filterOptions: ItinerarySearchFilterOption[]
}

const ExperienceSearchResults = ({ listings, filterOptions }: Props) => {
  const searchParams = useSearchParams()

  const searchParamsKey = searchParams.toString()

  const filters = useMemo(() => parseItinerarySearchParams(searchParams), [searchParamsKey, searchParams])
  const filteredListings = useMemo(() => filterItineraryListings(listings, filters), [listings, filters])
  const activeFilterCount = useMemo(() => countActiveItineraryFilters(searchParams), [searchParamsKey, searchParams])

  return (
    <>
      <ListingFilterTabs
        filterOptions={filterOptions}
        className="container mt-6 flex justify-center lg:mt-3"
        syncWithUrl
        activeFilterCount={activeFilterCount}
      />

      <Divider className="my-6 lg:my-9" />

      <div className="relative container">
        <h2 id="heading" className="scroll-mt-20 text-lg font-[550] lg:text-xl">
          {filteredListings.length === listings.length
            ? `Explore ${listings.length} tour packages`
            : `${filteredListings.length} of ${listings.length} tour packages`}
        </h2>

        {filteredListings.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:gap-y-12 lg:mt-6 lg:grid-cols-3 xl:gap-x-8 2xl:grid-cols-4 2xl:gap-x-7">
            {filteredListings.map((listing) => (
              <ExperiencesCard key={listing.id} data={listing} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-muted-foreground">
            No packages match your filters. Try adjusting destination, experience type, duration, or price.
          </p>
        )}
      </div>
    </>
  )
}

const ExperienceSearchContent = ({ listings, filterOptions }: Props) => {
  return (
    <div className="relative pb-28">
      <Suspense fallback={<div className="container py-10 text-center">Loading filters...</div>}>
        <ExperienceSearchResults listings={listings} filterOptions={filterOptions} />
      </Suspense>
    </div>
  )
}

export default ExperienceSearchContent
