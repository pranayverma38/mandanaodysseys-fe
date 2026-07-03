'use client'

import { Button } from '@/components/button'
import type { CheckoutBooking } from '@/lib/checkout/build-booking'
import { getStripeClient } from '@/lib/stripe/client'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
import type { PaymentMode } from './payment-options'
import { useDebouncedValue } from './use-debounced-value'

const CHECKOUT_FORM_ID = 'checkout-payment-form'

const stripeAppearance = {
  theme: 'flat' as const,
  variables: {
    colorPrimary: '#f97316',
    colorBackground: '#faf6f1',
    colorText: '#292524',
    colorTextSecondary: '#78716c',
    colorTextPlaceholder: '#a8a29e',
    colorDanger: '#ef4444',
    colorIcon: '#ea580c',
    borderRadius: '12px',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    fontSizeBase: '15px',
    spacingUnit: '4px',
    spacingGridRow: '12px',
    spacingGridColumn: '12px',
  },
  rules: {
    '.Input': {
      backgroundColor: '#ffffff',
      border: '1px solid #e7e5e4',
      boxShadow: 'none',
      padding: '11px 12px',
    },
    '.Input:focus': {
      border: '1px solid #fdba74',
      boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.12)',
    },
    '.Tab': {
      border: '1px solid #e7e5e4',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
    },
    '.Tab--selected': {
      border: '1px solid #f97316',
      backgroundColor: '#fff7ed',
      color: '#9a3412',
    },
    '.TabIcon': {
      fill: '#ea580c',
    },
  },
}

/** Let Stripe show every wallet it can — do NOT set any wallet to `never`. */
const paymentElementOptions = {
  layout: {
    type: 'tabs' as const,
    defaultCollapsed: false,
  },
  wallets: {
    applePay: 'auto' as const,
    googlePay: 'auto' as const,
    link: 'auto' as const,
  },
}

interface Props {
  booking: CheckoutBooking
  itineraryTitle: string
  chargeAmount: number
  paymentMode: PaymentMode
  depositAmount: number
  disabled: boolean
  submitLabel: string
  onProcessingChange?: (isProcessing: boolean) => void
}

function PaymentForm({
  submitLabel,
  disabled,
  intentVersion,
  onProcessingChange,
}: {
  submitLabel: string
  disabled: boolean
  intentVersion: number
  onProcessingChange?: (isProcessing: boolean) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (intentVersion <= 1 || !elements) {
      return
    }

    void elements.fetchUpdates()
  }, [intentVersion, elements])

  const returnUrl =
    typeof window !== 'undefined' ? new URL('/pay-done', window.location.origin).toString() : '/pay-done'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements || disabled) {
      return
    }

    setIsProcessing(true)
    onProcessingChange?.(true)
    setMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    })

    if (error) {
      setMessage(error.message ?? 'Payment could not be completed. Please try again.')
      setIsProcessing(false)
      onProcessingChange?.(false)
    }
  }

  return (
    <form id={CHECKOUT_FORM_ID} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border border-orange-200/90 bg-[#faf6f1] shadow-sm dark:border-orange-500/30 dark:bg-orange-950/25">
        <div className="flex items-center gap-2 border-b border-orange-200/70 bg-orange-500/[0.07] px-4 py-2.5 dark:border-orange-500/25">
          <LockClosedIcon className="size-4 shrink-0 text-orange-600 dark:text-orange-400" />
          <span className="text-sm font-semibold text-[#8b5a2b] dark:text-orange-200">Secure checkout</span>
          <span className="ms-auto text-[11px] text-stone-500 dark:text-stone-400">256-bit encrypted</span>
        </div>

        <div className="p-4">
          <PaymentElement options={paymentElementOptions} />
        </div>
      </div>

      {message && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-300">
          {message}
        </p>
      )}

      <div className="hidden lg:block">
        <Button
          color="orange"
          type="submit"
          className="w-full rounded-xl! py-3.5! text-base! shadow-sm"
          disabled={disabled || !stripe || !elements || isProcessing}
        >
          {isProcessing ? 'Processing…' : submitLabel}
        </Button>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Your payment is processed securely by Stripe
        </p>
      </div>
    </form>
  )
}

const CheckoutStripePayment = ({
  booking,
  itineraryTitle,
  chargeAmount,
  paymentMode,
  depositAmount,
  disabled,
  submitLabel,
  onProcessingChange,
}: Props) => {
  const debouncedChargeAmount = useDebouncedValue(chargeAmount, 450)
  const paymentIntentIdRef = useRef<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [intentVersion, setIntentVersion] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isLoadingIntent, setIsLoadingIntent] = useState(true)

  useEffect(() => {
    paymentIntentIdRef.current = null
    setClientSecret(null)
    setIntentVersion(0)
  }, [booking.handle])

  const isAmountSynced = debouncedChargeAmount === chargeAmount
  const canPay = !disabled && isAmountSynced && Boolean(clientSecret)

  useEffect(() => {
    if (disabled || debouncedChargeAmount <= 0) {
      return
    }

    let cancelled = false

    async function syncPaymentIntent() {
      setIsLoadingIntent(true)
      setError(null)

      try {
        const response = await fetch('/api/stripe/payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: debouncedChargeAmount,
            paymentIntentId: paymentIntentIdRef.current ?? undefined,
            metadata: {
              handle: booking.handle,
              itineraryTitle,
              paymentMode,
              tripTotal: String(booking.total),
              depositAmount: String(depositAmount),
              chargeAmount: String(debouncedChargeAmount),
              dateRange: booking.dateRangeLabel,
              guests: booking.guestsLabel,
            },
          }),
        })

        const data = (await response.json()) as {
          clientSecret?: string
          paymentIntentId?: string
          error?: string
        }

        if (cancelled) {
          return
        }

        if (!response.ok || !data.clientSecret || !data.paymentIntentId) {
          throw new Error(data.error ?? 'Failed to initialize payment')
        }

        setClientSecret((current) => current ?? data.clientSecret!)
        paymentIntentIdRef.current = data.paymentIntentId!
        setIntentVersion((version) => version + 1)
      } catch (syncError) {
        if (!cancelled) {
          setError(syncError instanceof Error ? syncError.message : 'Failed to initialize payment')
        }
      } finally {
        if (!cancelled) {
          setIsLoadingIntent(false)
        }
      }
    }

    void syncPaymentIntent()

    return () => {
      cancelled = true
    }
  }, [
    debouncedChargeAmount,
    disabled,
    booking.dateRangeLabel,
    booking.guestsLabel,
    booking.handle,
    booking.total,
    depositAmount,
    itineraryTitle,
    paymentMode,
  ])

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Stripe publishable key is missing. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to your environment.
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-2.5">
      <h3 className="text-base font-medium sm:text-lg">Payment</h3>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </p>
      )}

      {isLoadingIntent && !clientSecret ? (
        <div className="overflow-hidden rounded-2xl border border-orange-200/90 bg-[#faf6f1] p-4 dark:border-orange-500/30 dark:bg-orange-950/25">
          <div className="mb-3 h-4 w-32 animate-pulse rounded bg-orange-100" />
          <div className="flex gap-2">
            <div className="h-10 w-16 animate-pulse rounded-xl bg-white" />
            <div className="h-10 w-20 animate-pulse rounded-xl bg-white" />
            <div className="h-10 w-14 animate-pulse rounded-xl bg-white" />
          </div>
          <div className="mt-4 h-11 animate-pulse rounded-xl bg-white" />
        </div>
      ) : clientSecret ? (
        <Elements
          stripe={getStripeClient()}
          options={{
            clientSecret,
            appearance: stripeAppearance,
          }}
        >
          <PaymentForm
            submitLabel={submitLabel}
            disabled={!canPay}
            intentVersion={intentVersion}
            onProcessingChange={onProcessingChange}
          />
        </Elements>
      ) : null}

      {!isAmountSynced && (
        <p className="text-xs text-muted-foreground">Updating payment amount…</p>
      )}
    </section>
  )
}

export { CHECKOUT_FORM_ID }
export default CheckoutStripePayment
