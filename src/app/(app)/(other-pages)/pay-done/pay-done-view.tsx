'use client'

import ButtonPrimary from '@/components/button-primary'
import FormattedPrice from '@/components/formatted-price'
import { MotionDiv } from '@/components/motion-div'
import {
  Alert02Icon,
  ArrowLeft02Icon,
  Calendar04Icon,
  CheckmarkCircle02Icon,
  Home02FreeIcons,
  Loading03Icon,
  Mail01Icon,
  Search01Icon,
  Ticket01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import './pay-done.css'

export type PayDoneStatus = 'missing' | 'verify-error' | 'failed' | 'processing' | 'succeeded'

export type PayDoneViewProps = {
  status: PayDoneStatus
  title?: string
  dateRange?: string
  guests?: string
  chargeAmount?: number
  paymentMode?: string
  paymentId?: string
  handle?: string
  stripeStatus?: string
}

const STATUS_CONFIG = {
  missing: {
    icon: Search01Icon,
    headline: 'Payment reference',
    accent: 'missing',
    subtitle: 'We could not find a payment reference in this link.',
    description: 'If you just completed checkout, wait a moment and refresh. Your confirmation email may still be on its way.',
  },
  'verify-error': {
    icon: Alert02Icon,
    headline: 'Unable to verify',
    accent: 'error',
    subtitle: 'We could not confirm this payment with our provider.',
    description: 'If you were charged, please contact support with your email and trip details so we can help right away.',
  },
  failed: {
    icon: Alert02Icon,
    headline: 'Payment not completed',
    accent: 'error',
    subtitle: 'Your booking was not confirmed because the payment did not go through.',
    description: 'No worries — your trip details are still saved. Head back to checkout and try again when you are ready.',
  },
  processing: {
    icon: Loading03Icon,
    headline: 'Almost there',
    accent: 'processing',
    subtitle: 'Your payment is being processed.',
    description: 'We will email you as soon as it is confirmed. You can safely close this page.',
  },
  succeeded: {
    icon: CheckmarkCircle02Icon,
    headline: 'You are booked',
    accent: 'success',
    subtitle: 'Your adventure is officially on the calendar.',
    description: 'A confirmation email is on its way with your full itinerary details and next steps.',
  },
} as const

function StatusIcon({ status }: { status: PayDoneStatus }) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon

  return (
    <div className={`pay-done-status-icon pay-done-status-icon--${config.accent}`}>
      <MotionDiv
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
        className="relative flex size-20 items-center justify-center rounded-full sm:size-24"
      >
        {status === 'succeeded' && (
          <>
            <span className="pay-done-pulse-ring" aria-hidden />
            <span className="pay-done-pulse-ring pay-done-pulse-ring--delayed" aria-hidden />
          </>
        )}
        <HugeiconsIcon
          icon={Icon}
          size={status === 'processing' ? 40 : 44}
          strokeWidth={1.5}
          className={status === 'processing' ? 'pay-done-spin' : undefined}
        />
      </MotionDiv>
    </div>
  )
}

function ConfettiField() {
  return (
    <div className="pay-done-confetti pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 18 }).map((_, index) => (
        <span key={index} className="pay-done-confetti__piece" style={{ '--i': index } as React.CSSProperties} />
      ))}
    </div>
  )
}

function DetailTile({
  icon,
  label,
  value,
  delay,
}: {
  icon: typeof Calendar04Icon
  label: string
  value: string
  delay: number
}) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-[#fc6200]/30 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm dark:hover:border-[#ff9a3d]/30 dark:hover:bg-white/8"
    >
      <HugeiconsIcon icon={icon} size={26} className="text-[#fc6200]" />
      <p className="mt-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 text-lg font-medium text-foreground">{value}</p>
    </MotionDiv>
  )
}

function BookingRow({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 py-4 last:border-b-0">
      <span className="text-sm text-neutral-400">{label}</span>
      <span
        className={
          highlight
            ? 'text-base font-semibold text-[#ff9a3d] notranslate'
            : 'text-right text-sm font-medium text-white capitalize'
        }
      >
        {value}
      </span>
    </div>
  )
}

function IssueLayout({ status, children }: { status: PayDoneStatus; children?: React.ReactNode }) {
  const config = STATUS_CONFIG[status]

  return (
    <div className="mx-auto w-full max-w-xl">
      <MotionDiv
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`pay-done-card pay-done-card--${config.accent} overflow-hidden rounded-[2rem] border p-8 text-center sm:p-10`}
      >
        <div className="mx-auto flex justify-center">
          <StatusIcon status={status} />
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">Payment status</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {config.headline}
          </h1>
          <p className="mt-3 text-base text-neutral-300">{config.subtitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">{config.description}</p>
        </MotionDiv>

        {children}

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          {(status === 'failed' || status === 'missing') && (
            <ButtonPrimary href="/checkout" className="w-full sm:w-auto">
              <HugeiconsIcon icon={ArrowLeft02Icon} className="size-5" />
              Return to checkout
            </ButtonPrimary>
          )}
          <ButtonPrimary href="/" outline className="w-full sm:w-auto">
            <HugeiconsIcon icon={Home02FreeIcons} className="size-5" />
            Back to home
          </ButtonPrimary>
        </MotionDiv>
      </MotionDiv>
    </div>
  )
}

export default function PayDoneView({
  status,
  title = 'Your trip',
  dateRange = 'Dates to be confirmed',
  guests = 'Guests',
  chargeAmount = 0,
  paymentMode = 'Full payment',
  paymentId,
  handle,
  stripeStatus,
}: PayDoneViewProps) {
  const showBookingDetails = status === 'succeeded' || status === 'processing'
  const config = STATUS_CONFIG[status]

  if (!showBookingDetails) {
    return (
      <main className="pay-done-page container mb-24 mt-10 sm:mb-32 sm:mt-14">
        <IssueLayout status={status} />
      </main>
    )
  }

  return (
    <main className="pay-done-page container mb-24 mt-8 sm:mb-32 sm:mt-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 lg:gap-10">
        <MotionDiv
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="pay-done-hero relative overflow-hidden rounded-[2rem] bg-neutral-950 text-white lg:rounded-[2.5rem]"
        >
          {status === 'succeeded' && <ConfettiField />}

          <div
            className="absolute inset-0 bg-[url('https://images.pexels.com/photos/315566/pexels-photo-315566.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-25"
            aria-hidden
          />
          <div className="absolute inset-0 bg-linear-to-br from-neutral-950 via-neutral-950/95 to-neutral-950/80" aria-hidden />
          <div className="absolute -top-24 right-0 size-80 rounded-full bg-[#fc6200]/25 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 left-0 size-64 rounded-full bg-[#ff9a3d]/15 blur-3xl" aria-hidden />

          <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <MotionDiv
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <StatusIcon status={status} />
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#ff9a3d] uppercase">
                      {status === 'processing' ? 'Processing payment' : 'Booking confirmed'}
                    </p>
                    <p className="mt-1 text-sm text-neutral-400">{config.description}</p>
                  </div>
                </MotionDiv>

                <MotionDiv
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18 }}
                >
                  <h1 className="mt-8 text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] font-medium tracking-tight">
                    Congratulations,{' '}
                    <span className="font-style-script text-[1.15em] text-[#FC6200] italic">you&apos;re going!</span>
                  </h1>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                    {title}
                    {handle ? (
                      <>
                        {' '}
                        <span className="text-neutral-500">· Ref {handle}</span>
                      </>
                    ) : null}
                  </p>
                </MotionDiv>

                {status === 'processing' && (
                  <MotionDiv
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.28 }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-100"
                  >
                    <HugeiconsIcon icon={Mail01Icon} size={18} />
                    We will email you once payment clears
                  </MotionDiv>
                )}
              </div>

              <MotionDiv
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="w-full shrink-0 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:max-w-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-[#fc6200] text-white">
                    <HugeiconsIcon icon={Ticket01Icon} size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs tracking-wide text-neutral-400 uppercase">Payment ID</p>
                    <p className="mt-0.5 break-all font-mono text-sm font-semibold text-white sm:text-base">
                      {paymentId ?? '—'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-0">
                  <BookingRow label="Payment type" value={paymentMode} />
                  <BookingRow
                    label="Amount paid"
                    value={<FormattedPrice value={chargeAmount} />}
                    highlight
                  />
                  {stripeStatus && <BookingRow label="Status" value={stripeStatus.replace(/_/g, ' ')} />}
                </div>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>

        <div className="grid gap-4 sm:grid-cols-2">
          <DetailTile icon={Calendar04Icon} label="Travel dates" value={dateRange} delay={0.3} />
          <DetailTile icon={UserIcon} label="Guests" value={guests} delay={0.38} />
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <ButtonPrimary href="/" className="w-full sm:w-auto">
            <HugeiconsIcon icon={Home02FreeIcons} className="size-5" />
            Explore more trips
          </ButtonPrimary>
          <Link
            href="/account"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-base font-[450] text-neutral-900 transition hover:bg-neutral-50 sm:w-auto dark:border-neutral-700 dark:text-white dark:hover:bg-white/5"
          >
            View my account
          </Link>
        </MotionDiv>
      </div>
    </main>
  )
}
