import type { ItineraryDetail } from '@/data/itineraries/types'
import { parseUsdAmount } from '@/lib/currency'
import {
  calculateGuestPricing,
  formatGuestsLabel,
  getTotalGuests,
} from '@/lib/itinerary-guest-pricing'
import { GuestsObject } from '@/type'
import converSelectedDateToString from '@/utils/conver-selected-date-to-string'
import { addDays } from 'date-fns'

export type CheckoutBooking = {
  handle: string
  startDate: Date
  endDate: Date
  dateRangeLabel: string
  guests: GuestsObject
  guestsLabel: string
  totalGuests: number
  feeAndTaxes: number
  total: number
}

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string
): string | undefined {
  const value = params[key]
  return typeof value === 'string' ? value : undefined
}

export function buildCheckoutBookingFromParams(
  itinerary: ItineraryDetail,
  params: Record<string, string | string[] | undefined>
): CheckoutBooking | null {
  const handle = getParam(params, 'handle') ?? itinerary.handle
  const startDateRaw = getParam(params, 'startDate')
  const startDate = startDateRaw ? new Date(startDateRaw) : new Date()

  if (Number.isNaN(startDate.getTime())) {
    return null
  }

  const guests: GuestsObject = {
    guestAdults: Number.parseInt(getParam(params, 'guestAdults') ?? '1', 10) || 1,
    guestChildren: Number.parseInt(getParam(params, 'guestChildren') ?? '0', 10) || 0,
    guestInfants: Number.parseInt(getParam(params, 'guestInfants') ?? '0', 10) || 0,
  }

  const totalGuests = getTotalGuests(guests) || 1
  const endDate = addDays(startDate, itinerary.duration.days - 1)
  const pricePerGuest = parseUsdAmount(itinerary.pricing.price)

  const scaledPricing =
    pricePerGuest !== null
      ? calculateGuestPricing(pricePerGuest, totalGuests)
      : {
          feeAndTaxes: parseUsdAmount(itinerary.pricing.feeAndTaxes) ?? 0,
          total: parseUsdAmount(itinerary.pricing.total) ?? 0,
        }

  return {
    handle,
    startDate,
    endDate,
    dateRangeLabel: converSelectedDateToString([startDate, endDate]),
    guests,
    guestsLabel: formatGuestsLabel(guests),
    totalGuests,
    feeAndTaxes: scaledPricing.feeAndTaxes,
    total: scaledPricing.total,
  }
}
