import { GuestsObject } from '@/type'

export function getTotalGuests(guests: GuestsObject): number {
  return (guests.guestAdults ?? 0) + (guests.guestChildren ?? 0) + (guests.guestInfants ?? 0)
}

export function calculateGuestPricing(pricePerGuest: number, totalGuests: number) {
  const subtotal = pricePerGuest * totalGuests
  const feeAndTaxes = Math.round(subtotal / 9)
  const total = subtotal + feeAndTaxes

  return { feeAndTaxes, total }
}

export function formatGuestsLabel(guests: GuestsObject): string {
  const totalGuests = getTotalGuests(guests) || 1
  return `${totalGuests} Guest${totalGuests === 1 ? '' : 's'}`
}
