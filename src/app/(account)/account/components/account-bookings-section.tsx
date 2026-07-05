'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import FormattedPrice from '@/components/formatted-price'
import type { Booking, BookingStatus } from '@/data/account/types'
import { Calendar03Icon, UserGroupIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

const STATUS_STYLES: Record<BookingStatus, { label: string; color: 'green' | 'orange' | 'blue' | 'red' }> = {
  confirmed: { label: 'Confirmed', color: 'green' },
  pending: { label: 'Pending', color: 'orange' },
  completed: { label: 'Completed', color: 'blue' },
  cancelled: { label: 'Cancelled', color: 'red' },
}

interface Props {
  bookings: Booking[]
}

export function AccountBookingsSection({ bookings }: Props) {
  if (!bookings.length) {
    return (
      <section aria-labelledby="account-bookings-heading">
        <SectionHeader />
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50/50 px-8 py-16 text-center dark:border-neutral-700 dark:bg-neutral-900/50">
          <HugeiconsIcon icon={Calendar03Icon} size={40} className="mx-auto text-neutral-300 dark:text-neutral-600" />
          <h3 className="mt-4 text-lg font-semibold">No bookings yet</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
            Once you book a package, your order details and payment status will show up here.
          </p>
          <Button href="/destinations" className="mt-6">
            Explore packages
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="account-bookings-heading">
      <SectionHeader />

      <div className="space-y-5">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </section>
  )
}

function BookingCard({ booking }: { booking: Booking }) {
  const status = STATUS_STYLES[booking.status]
  const remaining = booking.amountDue
  const isFullyPaid = booking.paymentStatus === 'paid'
  const paidPercent = Math.round((booking.paidAmount / booking.totalAmount) * 100)

  return (
    <article className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-col md:flex-row">
        <div className="relative aspect-16/9 w-full shrink-0 md:aspect-auto md:w-56 lg:w-64">
          <Image
            src={booking.packageImage}
            alt={booking.packageTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 256px"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge color={status.color}>{status.label}</Badge>
                <Badge color={isFullyPaid ? 'green' : 'amber'}>
                  {isFullyPaid ? 'Fully paid' : 'Partial payment'}
                </Badge>
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                <Link
                  href={`/itinerary/${booking.packageHandle}`}
                  className="hover:text-[#fc6200] hover:underline"
                >
                  {booking.packageTitle}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{booking.destination}</p>
            </div>
            <p className="text-xs font-medium text-neutral-400">#{booking.orderNumber}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-300">
            <span className="inline-flex items-center gap-1.5">
              <HugeiconsIcon icon={Calendar03Icon} size={16} className="text-[#fc6200]" />
              Travel:{' '}
              {new Date(booking.travelDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <HugeiconsIcon icon={UserGroupIcon} size={16} className="text-[#fc6200]" />
              {booking.guests} guests
            </span>
          </div>

          <div className="mt-5 rounded-2xl bg-neutral-50 p-4 dark:bg-neutral-800/50">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">Package total</p>
                <p className="mt-0.5 text-xl font-bold">
                  <FormattedPrice value={booking.totalAmount} />
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
                  {isFullyPaid ? 'Amount paid' : 'Paid so far'}
                </p>
                <p className={clsx('mt-0.5 text-xl font-bold', isFullyPaid ? 'text-green-600' : 'text-[#fc6200]')}>
                  <FormattedPrice value={booking.paidAmount} />
                </p>
              </div>
              {!isFullyPaid && (
                <div className="text-right">
                  <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">Remaining</p>
                  <p className="mt-0.5 text-xl font-bold text-neutral-900 dark:text-white">
                    <FormattedPrice value={remaining} />
                  </p>
                </div>
              )}
            </div>

            {!isFullyPaid && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Payment progress</span>
                  <span>{paidPercent}% paid</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-[#fc6200] to-[#ff9a3d] transition-all"
                    style={{ width: `${paidPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-neutral-500">
              Booked on{' '}
              {new Date(booking.bookedAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
            <div className="flex gap-2">
              <Button href={`/itinerary/${booking.packageHandle}`} outline>
                View package
              </Button>
              {!isFullyPaid && (
                <Button href={`/checkout/pay-remaining?orderId=${booking.id}`} color="orange">
                  Pay remaining
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function SectionHeader() {
  return (
    <div className="mb-8">
      <h2 id="account-bookings-heading" className="text-2xl font-medium tracking-tight sm:text-3xl">
        Your <span className="font-serif italic text-[#fc6200]">bookings</span>
      </h2>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Track confirmed orders, view package details, and see whether you have paid in full or only the booking amount.
      </p>
    </div>
  )
}
