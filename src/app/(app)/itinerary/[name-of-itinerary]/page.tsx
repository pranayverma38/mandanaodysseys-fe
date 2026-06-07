import { getItineraryByHandle } from '@/data/itineraries'
import { createListingMetadata, createNotFoundMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import ItineraryDetailTemplate from '../components/itinerary-detail-template'

type PageParams = { 'name-of-itinerary': string }

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { 'name-of-itinerary': itineraryHandle } = await params
  const itinerary = await getItineraryByHandle(itineraryHandle)

  if (!itinerary) {
    return createNotFoundMetadata('Itinerary')
  }

  return createListingMetadata({
    title: itinerary.title,
    description: itinerary.description,
    path: `/itinerary/${itineraryHandle}`,
  })
}

const Page = async ({ params }: { params: Promise<PageParams> }) => {
  const { 'name-of-itinerary': itineraryHandle } = await params
  const itinerary = await getItineraryByHandle(itineraryHandle)

  if (!itinerary) {
    notFound()
  }

  if (!itinerary.id) {
    return redirect('/inspirations')
  }

  return <ItineraryDetailTemplate itinerary={itinerary} />
}

export default Page
