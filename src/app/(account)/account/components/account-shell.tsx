'use client'

import type { AccountTab, UserProfile } from '@/data/account/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
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
  children: React.ReactNode
}

export function AccountShell({ activeTab, profile, counts, children }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTabChange = useCallback(
    (tab: AccountTab) => {
      const params = new URLSearchParams(searchParams.toString())
      if (tab === 'account') {
        params.delete('tab')
      } else {
        params.set('tab', tab)
      }
      const query = params.toString()
      router.push(query ? `/account?${query}` : '/account')
    },
    [router, searchParams]
  )

  return (
    <div>
      <AccountHero profile={profile} counts={counts} />

      <AccountMobileNav activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="mt-6 grid gap-8 lg:mt-10 lg:grid-cols-[300px_1fr] lg:gap-10 xl:grid-cols-[320px_1fr]">
        <div className="hidden lg:block">
          <AccountSidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            profile={profile}
            counts={counts}
          />
        </div>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
