import { redirect } from 'next/navigation'

export default function AccountBillingRedirect() {
  redirect('/account?tab=bookings')
}
