import type { Booking, BookingPaymentStatus, BookingStatus } from '@/data/account/types'
import type { BookingOrderMetadata, MedusaOrder } from '@/lib/medusa/order-types'

function parseMetadataNumber(value: unknown, fallback = 0) {
  const parsed = Number.parseFloat(String(value ?? ''))
  return Number.isFinite(parsed) ? parsed : fallback
}

function deriveBookingStatus(startDate: string): BookingStatus {
  const travelDate = new Date(startDate)

  if (Number.isNaN(travelDate.getTime())) {
    return 'confirmed'
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  travelDate.setHours(0, 0, 0, 0)

  return travelDate < today ? 'completed' : 'confirmed'
}

function formatOrderNumber(order: MedusaOrder) {
  const year = new Date(order.created_at).getFullYear()
  return `MO-${year}-${String(order.display_id).padStart(4, '0')}`
}

export function mapMedusaOrderToBooking(order: MedusaOrder): Booking | null {
  const metadata = order.metadata as BookingOrderMetadata | null

  if (!metadata?.package_handle) {
    return null
  }

  const tripTotal = parseMetadataNumber(metadata.trip_total, order.total)
  const paidAmount = parseMetadataNumber(metadata.paid_amount)
  const amountDue = parseMetadataNumber(metadata.amount_due, Math.max(tripTotal - paidAmount, 0))
  const paymentStatus: BookingPaymentStatus = metadata.payment_status === 'paid' ? 'paid' : 'partial'
  const startDate = metadata.start_date || order.created_at.slice(0, 10)
  const bookedAt = metadata.booked_at || order.created_at

  return {
    id: order.id,
    orderNumber: formatOrderNumber(order),
    packageTitle: metadata.package_title || order.items?.[0]?.title || metadata.package_handle,
    packageHandle: metadata.package_handle,
    packageImage:
      metadata.package_image ||
      'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1600',
    destination: metadata.destination,
    travelDate: startDate,
    bookedAt: bookedAt.slice(0, 10),
    guests: Number.parseInt(metadata.guest_count ?? '1', 10) || 1,
    totalAmount: tripTotal,
    paidAmount,
    amountDue,
    paymentStatus,
    status: deriveBookingStatus(startDate),
  }
}
