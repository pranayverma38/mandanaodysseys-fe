'use client'

import { Badge } from '@/components/badge'
import type { UserProfile } from '@/data/account/types'
import { Calendar03Icon, FavouriteIcon, MapsIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
  profile: UserProfile
  counts: {
    itineraries: number
    bookings: number
    wishlist: number
  }
}

export function AccountHero({ profile, counts }: Props) {
  const stats = [
    { label: 'Custom Itineraries', value: counts.itineraries, icon: MapsIcon },
    { label: 'Active Bookings', value: counts.bookings, icon: Calendar03Icon },
    { label: 'Wishlisted', value: counts.wishlist, icon: FavouriteIcon },
  ]

  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl bg-neutral-950 text-white lg:mb-10">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/315566/pexels-photo-315566.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-linear-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/70" />
      <div className="absolute -top-20 right-0 size-72 rounded-full bg-[#fc6200]/20 blur-3xl" />

      <div className="relative px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge color="orange" className="mb-3">
              Traveler Dashboard
            </Badge>
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Welcome back,{' '}
              <span className="font-serif italic text-[#ff9a3d]">{profile.firstName}</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-neutral-300 sm:text-base">
              Manage your profile, download custom itineraries, track bookings, and revisit your dream packages — all in
              one place.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-sm sm:px-5"
              >
                <HugeiconsIcon icon={stat.icon} size={22} className="mb-2 text-[#ff9a3d]" />
                <p className="text-2xl font-semibold sm:text-3xl">{stat.value}</p>
                <p className="mt-0.5 text-xs text-neutral-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
