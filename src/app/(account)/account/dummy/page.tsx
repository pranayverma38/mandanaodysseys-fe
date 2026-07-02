import { getDummyAccountData } from '@/data/account/dummy'
import type { AccountTab } from '@/data/account/types'
import { getItineraries } from '@/data/itineraries'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { AccountBookingsSection } from '../components/account-bookings-section'
import { AccountItinerariesSection } from '../components/account-itineraries-section'
import { AccountPasswordSection } from '../components/account-password-section'
import { AccountProfileSection } from '../components/account-profile-section'
import { AccountShell } from '../components/account-shell'
import { AccountWishlistSection } from '../components/account-wishlist-section'

export const metadata: Metadata = createPageMetadata({
  title: 'Account Demo (Dummy Data)',
  description: 'Preview account dashboard UI with sample Eden Smith demo data.',
  path: '/account/dummy',
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

  const [accountData, allPackages] = await Promise.all([getDummyAccountData(), getItineraries()])

  const wishlistPackages = allPackages.filter((pkg) => accountData.wishlistPackageIds.includes(pkg.handle))

  const counts = {
    itineraries: accountData.customItineraries.length,
    bookings: accountData.bookings.filter((b) => b.status !== 'cancelled' && b.status !== 'completed').length,
    wishlist: wishlistPackages.length,
  }

  return (
    <Suspense fallback={null}>
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100">
        Demo preview only — this page shows static sample data for Eden Smith. Live account data is at{' '}
        <a href="/account" className="font-medium underline">
          /account
        </a>
        .
      </div>

      <AccountShell activeTab={activeTab} profile={accountData.profile} counts={counts} basePath="/account/dummy">
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

export default Page
