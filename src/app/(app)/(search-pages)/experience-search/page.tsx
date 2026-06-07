import { Divider } from '@/components/divider'
import { getItineraries } from '@/data/itineraries'
import { buildItinerarySearchFilterOptions } from '@/data/itineraries/search'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import { Suspense } from 'react'
import ExperienceSearchContent from './experience-search-content'

export const metadata: Metadata = createPageMetadata({
  title: 'Search Tour Packages',
  description:
    'Search and compare affordable international tour packages and travel experiences. Find your perfect vacation with Mandana Odysseys.',
  path: '/experience-search',
})

const Page = async () => {
  const listings = await getItineraries()
  const filterOptions = buildItinerarySearchFilterOptions(listings)

  return (
    <Suspense fallback={<div className="container py-20 text-center">Loading packages...</div>}>
      <ExperienceSearchContent listings={listings} filterOptions={filterOptions} />
    </Suspense>
  )
}

export default Page
