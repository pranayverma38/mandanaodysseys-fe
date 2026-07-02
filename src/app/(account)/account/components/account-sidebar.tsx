'use client'

import { NAV_ITEMS } from '@/data/account/navigation'
import type { AccountTab, UserProfile } from '@/data/account/types'
import { Invoice01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'

const BRAND_ORANGE = '#fc6200'

interface Props {
  activeTab: AccountTab
  onTabChange: (tab: AccountTab) => void
  profile: UserProfile
  counts: {
    itineraries: number
    bookings: number
    wishlist: number
  }
}

export function AccountSidebar({ activeTab, onTabChange, profile, counts }: Props) {
  const countByTab: Partial<Record<AccountTab, number>> = {
    itineraries: counts.itineraries,
    bookings: counts.bookings,
    wishlist: counts.wishlist,
  }

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-lg shadow-neutral-200/40 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
        <div className="relative overflow-hidden bg-linear-to-br from-[#fc6200] via-[#ff7a1a] to-[#ff9a3d] px-6 py-8 text-white">
          <div className="absolute -top-8 -right-8 size-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-6 size-28 rounded-full bg-black/10 blur-xl" />
          <div className="relative min-w-0">
            <p className="truncate text-lg font-semibold">{profile.fullName}</p>
            <p className="truncate text-sm text-white/85">{profile.email}</p>
          </div>
        </div>

        <nav aria-label="Account sections" className="p-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id
              const count = countByTab[item.id]

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    className={clsx(
                      'group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-200',
                      isActive
                        ? 'bg-[#fc6200]/10 shadow-sm'
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span
                      className={clsx(
                        'flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                        isActive ? 'bg-[#fc6200] text-white' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'
                      )}
                    >
                      <HugeiconsIcon icon={item.icon} size={20} color={isActive ? '#fff' : undefined} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={clsx(
                          'block text-sm font-semibold',
                          isActive ? 'text-[#fc6200]' : 'text-neutral-900 dark:text-neutral-100'
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="block truncate text-xs text-neutral-500 dark:text-neutral-400">
                        {item.description}
                      </span>
                    </span>
                    {count !== undefined && count > 0 && (
                      <span
                        className={clsx(
                          'flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                          isActive
                            ? 'bg-[#fc6200] text-white'
                            : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200'
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-neutral-100 px-5 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <HugeiconsIcon icon={Invoice01Icon} size={16} color={BRAND_ORANGE} />
            <span>
              Member since{' '}
              {new Date(profile.memberSince).toLocaleDateString('en-IN', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export { NAV_ITEMS }
