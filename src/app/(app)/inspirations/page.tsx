import { Heading } from '@/components/heading'
import { getInspirationPath, TOUR_TYPES } from '@/data/destinations'
import { createPageMetadata } from '@/lib/seo'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = createPageMetadata({
  title: 'Inspirations',
  description:
    'Find travel inspiration with Mandana Odysseys. Browse holiday types — family vacations, honeymoons, wildlife safaris, beach holidays, luxury escapes, and more.',
  path: '/inspirations',
})

export default function InspirationsPage() {
  return (
    <div className="container flex flex-col gap-y-12 py-16 lg:gap-y-16 lg:pb-28">
      <section className="space-y-8">
        <Heading level={2}>
          Browse by <span data-slot="italic">holiday type</span>
        </Heading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOUR_TYPES.map((tourType) => (
            <Link
              key={tourType.slug}
              href={getInspirationPath(tourType.slug)}
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{tourType.name}</h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{tourType.description}</p>
                </div>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white dark:border-neutral-700 dark:bg-neutral-800">
                  <ArrowUpRightIcon className="size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-neutral-50 p-8 dark:bg-neutral-900">
        <Heading level={2} className="mb-6">
          All holiday types
        </Heading>
        <div className="flex flex-wrap gap-3">
          {TOUR_TYPES.map((tourType) => (
            <Link
              key={tourType.slug}
              href={getInspirationPath(tourType.slug)}
              className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
            >
              {tourType.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
