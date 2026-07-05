'use client'

import type { AccountData, AccountTab } from '@/data/account/types'
import type { TItineraryListing } from '@/data/itineraries'
import { useCallback, useEffect, useState } from 'react'
import { AccountBookingsSection } from './account-bookings-section'
import { AccountItinerariesSection } from './account-itineraries-section'
import { AccountPasswordSection } from './account-password-section'
import { AccountProfileSection } from './account-profile-section'
import { AccountShell } from './account-shell'
import { AccountWishlistSection } from './account-wishlist-section'

interface Props {
  initialTab: AccountTab
  accountData: AccountData
  wishlistPackages: TItineraryListing[]
  counts: {
    itineraries: number
    bookings: number
    wishlist: number
  }
  basePath?: string
}

function buildAccountUrl(tab: AccountTab, basePath: string) {
  return tab === 'account' ? basePath : `${basePath}?tab=${tab}`
}

export function AccountDashboard({
  initialTab,
  accountData,
  wishlistPackages,
  counts,
  basePath = '/account',
}: Props) {
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const handleTabChange = useCallback(
    (tab: AccountTab) => {
      setActiveTab(tab)
      window.history.replaceState(window.history.state, '', buildAccountUrl(tab, basePath))
    },
    [basePath]
  )

  return (
    <AccountShell
      activeTab={activeTab}
      profile={accountData.profile}
      counts={counts}
      onTabChange={handleTabChange}
    >
      {activeTab === 'account' && <AccountProfileSection profile={accountData.profile} />}
      {activeTab === 'itineraries' && (
        <AccountItinerariesSection itineraries={accountData.customItineraries} />
      )}
      {activeTab === 'password' && <AccountPasswordSection />}
      {activeTab === 'bookings' && <AccountBookingsSection bookings={accountData.bookings} />}
      {activeTab === 'wishlist' && <AccountWishlistSection packages={wishlistPackages} />}
    </AccountShell>
  )
}
