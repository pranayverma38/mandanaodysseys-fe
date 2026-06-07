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
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import ExperienceMapWithMarkers from './experience-map-with-markers'

interface Props {
  listings: TItineraryListing[]
  filterOptions: ItinerarySearchFilterOption[]
}

const ExperienceSearchResults = ({ listings, filterOptions }: Props) => {
  const searchParams = useSearchParams()
  const [currentHoverID, setCurrentHoverID] = useState('')
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const searchParamsKey = searchParams.toString()

  const filters = useMemo(() => parseItinerarySearchParams(searchParams), [searchParamsKey, searchParams])
  const filteredListings = useMemo(() => filterItineraryListings(listings, filters), [listings, filters])
  const activeFilterCount = useMemo(() => countActiveItineraryFilters(searchParams), [searchParamsKey, searchParams])

  return (
    <div className={clsx('relative flex min-h-screen gap-8 2xl:gap-12')}>
      <div className="flex flex-1 flex-col pt-6 pb-20 lg:w-1/2 lg:pt-8">
        <ListingFilterTabs
          filterOptions={filterOptions}
          className="flex justify-center lg:justify-start"
          syncWithUrl
          activeFilterCount={activeFilterCount}
          inPageStaySearchWithMap
        />

        <Divider className="my-6 xl:my-8" />

        <h2 id="heading" className="scroll-mt-20 text-xl font-[550]">
          {filteredListings.length === listings.length
            ? `Explore ${listings.length} tour packages`
            : `${filteredListings.length} of ${listings.length} tour packages`}
        </h2>

        {filteredListings.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-1 xl:grid-cols-2 2xl:gap-x-8">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                onMouseEnter={() => {
                  if (isDesktop) setCurrentHoverID(listing.id)
                }}
                onMouseLeave={() => {
                  if (isDesktop) setCurrentHoverID('')
                }}
              >
                <ExperiencesCard data={listing} size={isDesktop ? 'default' : 'small'} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-muted-foreground">
            No packages match your filters. Try adjusting destination, experience type, duration, or price.
          </p>
        )}
      </div>

      <div className="hidden flex-1 lg:block lg:w-1/2">
        <div
          className={clsx(
            'fixed inset-0 top-0 flex lg:sticky lg:top-22.5 lg:size-full lg:max-h-[calc(100vh-calc(var(--spacing)*22))] lg:py-6'
          )}
        >
          <div className="relative flex-1 overflow-hidden lg:rounded-3xl">
            <ExperienceMapWithMarkers currentHoverID={currentHoverID} listings={filteredListings} />
          </div>
        </div>
      </div>
    </div>
  )
}

const ExperienceSearchContent = ({ listings, filterOptions }: Props) => {
  return (
    <Suspense fallback={<div className="py-10 text-center">Loading filters...</div>}>
      <ExperienceSearchResults listings={listings} filterOptions={filterOptions} />
    </Suspense>
  )
}

export default ExperienceSearchContent
