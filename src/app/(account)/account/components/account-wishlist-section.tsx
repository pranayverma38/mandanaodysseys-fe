'use client'

import { Button } from '@/components/button'
import ExperiencesCard from '@/components/experiences-card'
import type { TItineraryListing } from '@/data/itineraries'
import { FavouriteIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
  packages: TItineraryListing[]
}

export function AccountWishlistSection({ packages }: Props) {
  if (!packages.length) {
    return (
      <section aria-labelledby="account-wishlist-heading">
        <SectionHeader count={0} />
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50/50 px-8 py-16 text-center dark:border-neutral-700 dark:bg-neutral-900/50">
          <HugeiconsIcon icon={FavouriteIcon} size={40} className="mx-auto text-neutral-300 dark:text-neutral-600" />
          <h3 className="mt-4 text-lg font-semibold">Your wishlist is empty</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
            Save packages you love and come back to them when you are ready to book your next adventure.
          </p>
          <Button href="/destinations" className="mt-6">
            Browse destinations
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="account-wishlist-heading">
      <SectionHeader count={packages.length} />

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg) => (
          <ExperiencesCard key={pkg.id} data={{ ...pkg, like: true }} />
        ))}
      </div>
    </section>
  )
}

function SectionHeader({ count }: { count: number }) {
  return (
    <div className="mb-8">
      <h2 id="account-wishlist-heading" className="text-2xl font-medium tracking-tight sm:text-3xl">
        Your <span className="font-serif italic text-[#fc6200]">wishlist</span>
        {count > 0 && (
          <span className="ms-2 inline-flex size-8 items-center justify-center rounded-full bg-[#fc6200]/10 text-base font-semibold text-[#fc6200]">
            {count}
          </span>
        )}
      </h2>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Packages you have saved for later. Tap the heart on any package to add or remove it from your wishlist.
      </p>
    </div>
  )
}
