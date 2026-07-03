'use client'

import { Button } from '@/components/button'
import FormattedPrice from '@/components/formatted-price'
import type { CustomItinerary, CustomItineraryStatus } from '@/data/account/types'
import { Download01Icon, EyeIcon, Invoice01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { RequestChangesDialog } from './request-changes-dialog'

const STATUS_STYLES: Record<CustomItineraryStatus, { label: string; className: string }> = {
  draft: {
    label: 'Draft',
    className: 'bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-700',
  },
  sent: {
    label: 'Quotation sent',
    className: 'bg-orange-100 text-orange-800 ring-1 ring-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:ring-orange-500/30',
  },
  accepted: {
    label: 'Accepted',
    className: 'bg-green-100 text-green-800 ring-1 ring-green-200 dark:bg-green-500/20 dark:text-green-300 dark:ring-green-500/30',
  },
  expired: {
    label: 'Expired',
    className: 'bg-red-100 text-red-800 ring-1 ring-red-200 dark:bg-red-500/20 dark:text-red-300 dark:ring-red-500/30',
  },
}

interface Props {
  itineraries: CustomItinerary[]
}

export function AccountItinerariesSection({ itineraries }: Props) {
  const [requestChangesOpen, setRequestChangesOpen] = useState(false)

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

      <RequestChangesDialog open={requestChangesOpen} onClose={() => setRequestChangesOpen(false)} />

      <div className="space-y-5">
        {itineraries.map((itinerary) => {
          const status = STATUS_STYLES[itinerary.status]
          const isExpired = itinerary.status === 'expired'

          return (
            <article
              key={itinerary.id}
              className={clsx(
                'group overflow-hidden rounded-3xl border bg-white transition-shadow hover:shadow-lg hover:shadow-neutral-200/50 dark:bg-neutral-900 dark:hover:shadow-none',
                isExpired ? 'border-neutral-200 dark:border-neutral-800' : 'border-neutral-200/80 dark:border-neutral-800'
              )}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="relative aspect-16/10 w-full shrink-0 lg:aspect-auto lg:w-72">
                  <Image
                    src={itinerary.thumbnail}
                    alt={itinerary.title}
                    fill
                    className={clsx('object-cover', isExpired && 'grayscale')}
                    sizes="(max-width: 1024px) 100vw, 288px"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span
                        className={clsx(
                          'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
                          status.className
                        )}
                      >
                        {status.label}
                      </span>
                      <p className="mt-2 text-xs font-medium tracking-wider text-[#fc6200] uppercase">
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
                        <FormattedPrice value={itinerary.totalPrice} baseCurrency="AUD" />
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
                      <button
                        type="button"
                        onClick={() => setRequestChangesOpen(true)}
                        className="inline-flex items-center self-center text-sm font-medium text-[#fc6200] underline-offset-4 hover:underline"
                      >
                        Request changes
                      </button>
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
