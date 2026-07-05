'use client'

import type { AccountTab, UserProfile } from '@/data/account/types'
import { AccountHero } from './account-hero'
import { AccountMobileNav } from './account-mobile-nav'
import { AccountSidebar } from './account-sidebar'

interface Props {
  activeTab: AccountTab
  profile: UserProfile
  counts: {
    itineraries: number
    bookings: number
    wishlist: number
  }
  onTabChange: (tab: AccountTab) => void
  children: React.ReactNode
}

export function AccountShell({ activeTab, profile, counts, onTabChange, children }: Props) {
  return (
    <div>
      <AccountHero profile={profile} counts={counts} />

      <AccountMobileNav activeTab={activeTab} onTabChange={onTabChange} />

      <div className="mt-6 grid gap-8 lg:mt-10 lg:grid-cols-[300px_1fr] lg:gap-10 xl:grid-cols-[320px_1fr]">
        <div className="hidden lg:block">
          <AccountSidebar
            activeTab={activeTab}
            onTabChange={onTabChange}
            profile={profile}
            counts={counts}
          />
        </div>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
