import { getAccountData } from '@/data/account'
import type { AccountTab } from '@/data/account/types'
import { getItineraries } from '@/data/itineraries'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { AccountBookingsSection } from './components/account-bookings-section'
import { AccountItinerariesSection } from './components/account-itineraries-section'
import { AccountPasswordSection } from './components/account-password-section'
import { AccountProfileSection } from './components/account-profile-section'
import { AccountShell } from './components/account-shell'
import { AccountWishlistSection } from './components/account-wishlist-section'

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
  const activeTab = resolveTab(tab)

  const [accountData, allPackages] = await Promise.all([getAccountData(), getItineraries()])

  const wishlistPackages = allPackages.filter((pkg) => accountData.wishlistPackageIds.includes(pkg.handle))

  const counts = {
    itineraries: accountData.customItineraries.length,
    bookings: accountData.bookings.filter((b) => b.status !== 'cancelled' && b.status !== 'completed').length,
    wishlist: wishlistPackages.length,
  }

  return (
    <Suspense fallback={<AccountDashboardSkeleton />}>
      <AccountShell activeTab={activeTab} profile={accountData.profile} counts={counts}>
        {activeTab === 'account' && <AccountProfileSection profile={accountData.profile} />}
        {activeTab === 'itineraries' && (
          <AccountItinerariesSection itineraries={accountData.customItineraries} />
        )}
        {activeTab === 'password' && <AccountPasswordSection />}
        {activeTab === 'bookings' && <AccountBookingsSection bookings={accountData.bookings} />}
        {activeTab === 'wishlist' && <AccountWishlistSection packages={wishlistPackages} />}
      </AccountShell>
    </Suspense>
  )
}

function AccountDashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-48 rounded-3xl bg-neutral-200 dark:bg-neutral-800" />
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="hidden h-96 rounded-3xl bg-neutral-200 lg:block dark:bg-neutral-800" />
        <div className="h-96 rounded-3xl bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  )
}

export default Page
