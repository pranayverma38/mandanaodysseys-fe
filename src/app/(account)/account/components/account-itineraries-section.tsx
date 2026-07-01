'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import FormattedPrice from '@/components/formatted-price'
import type { CustomItinerary, CustomItineraryStatus } from '@/data/account/types'
import { Download01Icon, EyeIcon, Invoice01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

const STATUS_STYLES: Record<
  CustomItineraryStatus,
  { label: string; color: 'orange' | 'green' | 'zinc' | 'red' }
> = {
  draft: { label: 'Draft', color: 'zinc' },
  sent: { label: 'Quotation sent', color: 'orange' },
  accepted: { label: 'Accepted', color: 'green' },
  expired: { label: 'Expired', color: 'red' },
}

interface Props {
  itineraries: CustomItinerary[]
}

export function AccountItinerariesSection({ itineraries }: Props) {
  if (!itineraries.length) {
    return (
      <section aria-labelledby="account-itineraries-heading">
        <SectionHeader />
        <EmptyState
          title="No custom itineraries yet"
          description="When our travel experts prepare a personalized itinerary for you, it will appear here with pricing and download options."
        />
      </section>
    )
  }

  return (
    <section aria-labelledby="account-itineraries-heading">
      <SectionHeader />

      <div className="space-y-5">
        {itineraries.map((itinerary) => {
          const status = STATUS_STYLES[itinerary.status]
          const isExpired = itinerary.status === 'expired'

          return (
            <article
              key={itinerary.id}
              className={clsx(
                'group overflow-hidden rounded-3xl border bg-white transition-shadow hover:shadow-lg hover:shadow-neutral-200/50 dark:bg-neutral-900 dark:hover:shadow-none',
                isExpired
                  ? 'border-neutral-200 opacity-75 dark:border-neutral-800'
                  : 'border-neutral-200/80 dark:border-neutral-800'
              )}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="relative aspect-16/10 w-full shrink-0 lg:aspect-auto lg:w-72">
                  <Image
                    src={itinerary.thumbnail}
                    alt={itinerary.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 288px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent lg:bg-linear-to-r" />
                  <Badge color={status.color} className="absolute top-4 left-4">
                    {status.label}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium tracking-wider text-[#fc6200] uppercase">
                        {itinerary.destination}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-neutral-900 dark:text-white">
                        {itinerary.title}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        {itinerary.duration} · {itinerary.travelers} travelers
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#fc6200]/20 bg-[#fc6200]/5 px-5 py-3 text-right">
                      <p className="flex items-center justify-end gap-1.5 text-xs font-medium text-[#fc6200]">
                        <HugeiconsIcon icon={Invoice01Icon} size={14} />
                        Quoted price
                      </p>
                      <p className="mt-0.5 text-2xl font-bold text-neutral-900 dark:text-white">
                        <FormattedPrice value={itinerary.totalPrice} />
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-500">incl. taxes & fees</p>
                    </div>
                  </div>

                  {itinerary.notes && (
                    <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {itinerary.notes}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>
                      Created{' '}
                      {new Date(itinerary.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span>
                      Valid until{' '}
                      {new Date(itinerary.validUntil).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      href={itinerary.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <HugeiconsIcon icon={EyeIcon} size={18} />
                      View itinerary
                    </Button>
                    <Button
                      href={itinerary.documentUrl}
                      download
                      outline
                      className="inline-flex items-center gap-2"
                    >
                      <HugeiconsIcon icon={Download01Icon} size={18} />
                      Download PDF
                    </Button>
                    {!isExpired && (
                      <Link
                        href="/contact"
                        className="inline-flex items-center self-center text-sm font-medium text-[#fc6200] underline-offset-4 hover:underline"
                      >
                        Request changes
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function SectionHeader() {
  return (
    <div className="mb-8">
      <h2 id="account-itineraries-heading" className="text-2xl font-medium tracking-tight sm:text-3xl">
        Your <span className="font-serif italic text-[#fc6200]">itineraries</span>
      </h2>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Custom travel plans prepared by our experts. Review quotations, view details, and download your itinerary
        anytime.
      </p>
    </div>
  )
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50/50 px-8 py-16 text-center dark:border-neutral-700 dark:bg-neutral-900/50">
      <HugeiconsIcon icon={Invoice01Icon} size={40} className="mx-auto text-neutral-300 dark:text-neutral-600" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
    </div>
  )
}
