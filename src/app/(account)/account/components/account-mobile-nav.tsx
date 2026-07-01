'use client'

import type { AccountTab } from '@/data/account/types'
import {
  Calendar03Icon,
  FavouriteIcon,
  MapsIcon,
  SecurityLockIcon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { NAV_ITEMS } from './account-sidebar'

interface Props {
  activeTab: AccountTab
  onTabChange: (tab: AccountTab) => void
}

const TAB_ICONS: Record<AccountTab, typeof UserIcon> = {
  account: UserIcon,
  itineraries: MapsIcon,
  password: SecurityLockIcon,
  bookings: Calendar03Icon,
  wishlist: FavouriteIcon,
}

export function AccountMobileNav({ activeTab, onTabChange }: Props) {
  return (
    <div className="lg:hidden">
      <div className="hidden-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id
          const Icon = TAB_ICONS[item.id]

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={clsx(
                'flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all',
                isActive
                  ? 'border-[#fc6200] bg-[#fc6200] text-white shadow-md shadow-[#fc6200]/25'
                  : 'border-neutral-200 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <HugeiconsIcon icon={Icon} size={16} color={isActive ? '#fff' : undefined} />
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
