import 'server-only'

import { asBookingMetadata, getBookingOrderForCustomer } from '@/lib/medusa/orders'
import type { MedusaCustomer } from '@/lib/medusa/server-client'

function parseMetadataNumber(value: unknown, fallback = 0) {
  const parsed = Number.parseFloat(String(value ?? ''))
  return Number.isFinite(parsed) ? parsed : fallback
}

export async function validateRemainingPaymentAmount(
  customer: MedusaCustomer,
  medusaOrderId: string,
  amount: number
): Promise<{ ok: true; amountDue: number } | { ok: false; error: string }> {
  const order = await getBookingOrderForCustomer(medusaOrderId, customer)

  if (!order) {
    return { ok: false, error: 'Booking not found.' }
  }

  const metadata = asBookingMetadata(order.metadata)

  if (!metadata) {
    return { ok: false, error: 'Invalid booking order.' }
  }

  if (metadata.payment_status === 'paid') {
    return { ok: false, error: 'This booking is already fully paid.' }
  }

  const tripTotal = parseMetadataNumber(metadata.trip_total, order.total)
  const paidSoFar = parseMetadataNumber(metadata.paid_amount)
  const amountDue = parseMetadataNumber(metadata.amount_due, Math.max(tripTotal - paidSoFar, 0))

  if (amountDue <= 0) {
    return { ok: false, error: 'No remaining balance on this booking.' }
  }

  if (Math.abs(amount - amountDue) > 0.01) {
    return {
      ok: false,
      error: 'Remaining balance must be paid in full.',
    }
  }

  return { ok: true, amountDue }
}
