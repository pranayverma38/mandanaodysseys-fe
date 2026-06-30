import { DestinationDetailTemplate } from '@/app/(app)/destinations/[destination-name]/components/destination-detail-template'
import { DESTINATIONS, getDestinationDetailBySlug } from '@/data/destinations'
import { getItineraryListingsByFilters } from '@/data/itineraries'
import { createCategoryMetadata, createNotFoundMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
  const destination = getDestinationDetailBySlug(destinationSlug)

  if (!destination) {
    return createNotFoundMetadata('Destination')
  }

  return createCategoryMetadata({
    name: destination.name,
    description: destination.introDescription,
    path: `/destinations/${destination.slug}`,
    label: 'Tour Packages',
  })
}

export default async function DestinationPage({ params }: PageProps) {
  const { 'destination-name': destinationSlug } = await params
  const destination = getDestinationDetailBySlug(destinationSlug)

  if (!destination) {
    notFound()
  }

  const listings = await getItineraryListingsByFilters({ destination: destination.slug })

  return <DestinationDetailTemplate destination={destination} listings={listings} />
}
