import { Heading } from '@/components/heading'
import {
  DESTINATION_CONTINENTS,
  DESTINATIONS,
  getDestinationPath,
  getDestinationsByContinent,
} from '@/data/destinations'
import { createPageMetadata } from '@/lib/seo'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = createPageMetadata({
  title: 'Destinations',
  description:
    'Explore international travel destinations with Mandana Odysseys. Browse tour packages across Asia and Oceania — India, Sri Lanka, Thailand, Nepal, Vietnam, Bali, and Australia.',
  path: '/destinations',
})

export default function DestinationsPage() {
  return (
    <div className="container flex flex-col gap-y-16 py-16 lg:gap-y-24 lg:pb-28">
      {DESTINATION_CONTINENTS.map((continent) => {
        const destinations = getDestinationsByContinent(continent)

        return (
          <section key={continent} className="space-y-8">
            <div className="flex items-end justify-between gap-4">
              <Heading level={2}>{continent}</Heading>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {destinations.length} {destinations.length === 1 ? 'country' : 'countries'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {destinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={getDestinationPath(destination.slug)}
                  className="group relative flex aspect-4/5 flex-col overflow-hidden rounded-2xl"
                >
                  <Image
                    src={destination.thumbnail}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 space-y-1 text-white">
                    <p className="text-xs font-medium tracking-wide uppercase opacity-80">{destination.country}</p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-lg font-semibold">{destination.name}</span>
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900">
                        <ArrowUpRightIcon className="size-4" />
                      </div>
                    </div>
                    <p className="line-clamp-2 text-sm text-white/80">{destination.description}</p>
                    <p className="text-xs font-medium text-white/70">{destination.packageCount}+ packages</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <section className="rounded-3xl bg-neutral-50 p-8 dark:bg-neutral-900">
        <Heading level={2} className="mb-6">
          All destinations
        </Heading>
        <div className="flex flex-wrap gap-3">
          {DESTINATIONS.map((destination) => (
            <Link
              key={destination.slug}
              href={getDestinationPath(destination.slug)}
              className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
            >
              {destination.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
