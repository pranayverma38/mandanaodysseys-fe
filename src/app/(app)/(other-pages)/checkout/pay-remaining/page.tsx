import { getRemainingCheckoutSession } from '@/lib/bookings/remaining-checkout'
import { getAuthenticatedCustomer } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import PayRemainingCheckoutPage from './pay-remaining-checkout-page'

interface Props {
  searchParams: Promise<{ orderId?: string }>
}

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams
  const orderId = typeof params.orderId === 'string' ? params.orderId.trim() : undefined

  if (!orderId) {
    redirect('/account?tab=bookings')
  }

  const customer = await getAuthenticatedCustomer()

  if (!customer) {
    redirect(`/?auth=login&redirect=${encodeURIComponent(`/checkout/pay-remaining?orderId=${orderId}`)}`)
  }

  const session = await getRemainingCheckoutSession(orderId, customer)

  if (!session) {
    redirect('/account?tab=bookings')
  }

  return <PayRemainingCheckoutPage session={session} />
}

export default Page
