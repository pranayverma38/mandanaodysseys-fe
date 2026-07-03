import { getItineraryByHandle } from '@/data/itineraries'
import { buildCheckoutBookingFromParams } from '@/lib/checkout/build-booking'
import { redirect } from 'next/navigation'
import CheckoutPage from './checkout-page'

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams
  const handle = typeof params.handle === 'string' ? params.handle : undefined

  if (!handle) {
    redirect('/')
  }

  const itinerary = await getItineraryByHandle(handle)

  if (!itinerary) {
    redirect('/')
  }

  const booking = buildCheckoutBookingFromParams(itinerary, params)

  if (!booking) {
    redirect(`/itinerary/${handle}`)
  }

  return <CheckoutPage itinerary={itinerary} booking={booking} />
}

export default Page
