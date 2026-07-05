import { getAccountData } from '@/data/account'
import type { AccountTab } from '@/data/account/types'
import { getItineraries } from '@/data/itineraries'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import { AccountDashboard } from './components/account-dashboard'

export const metadata: Metadata = createPageMetadata({
  title: 'My Account',
  description:
    'Manage your Mandana Odysseys profile, custom itineraries, bookings, wishlist, and account security.',
  path: '/account',
  noIndex: true,
})

const VALID_TABS: AccountTab[] = ['account', 'itineraries', 'password', 'bookings', 'wishlist']

function resolveTab(tab: string | undefined): AccountTab {
  if (tab && VALID_TABS.includes(tab as AccountTab)) {
    return tab as AccountTab
  }
  return 'account'
}

interface Props {
  searchParams: Promise<{ tab?: string }>
}

const Page = async ({ searchParams }: Props) => {
  const { tab } = await searchParams
  const initialTab = resolveTab(tab)

  const [accountData, allPackages] = await Promise.all([getAccountData(), getItineraries()])

  const wishlistPackages = allPackages.filter((pkg) => accountData.wishlistPackageIds.includes(pkg.handle))

  const counts = {
    itineraries: accountData.customItineraries.length,
    bookings: accountData.bookings.filter((b) => b.status !== 'cancelled' && b.status !== 'completed').length,
    wishlist: wishlistPackages.length,
  }

  return (
    <AccountDashboard
      initialTab={initialTab}
      accountData={accountData}
      wishlistPackages={wishlistPackages}
      counts={counts}
    />
  )
}

export default Page
