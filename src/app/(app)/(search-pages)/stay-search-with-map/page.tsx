import { getStayListingFilterOptions } from '@/data/data'
import { getStayListings } from '@/data/listings'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import SectionGridHasMap from './section-grid-has-map'

export async function generateMetadata({ params }: { params: Promise<{ handle?: string[] }> }): Promise<Metadata> {
  return createPageMetadata({
    title: 'Search Accommodations on Map',
    description:
      'Explore accommodations on an interactive map for your international travel packages. Find the perfect location with Mandana Odysseys.',
    path: '/stay-search-with-map',
  })
}

const Page = async ({ params }: { params: Promise<{ handle?: string[] }> }) => {
  const listings = await getStayListings()
  const filterOptions = await getStayListingFilterOptions()

  return (
    <div className="container px-4 lg:px-8 xl:max-w-none">
      <SectionGridHasMap listings={listings} filterOptions={filterOptions} />
    </div>
  )
}

export default Page
