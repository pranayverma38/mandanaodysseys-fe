export type ItineraryDuration = {
  /** Total trip length in days — use for filtering */
  days: number
  /** Hotel nights included */
  nights: number
  /** Display label shown in amenities and cards */
  label: string
}

export function createItineraryDuration(days: number, nights: number): ItineraryDuration {
  const label =
    nights > 0 ? `${days} Days / ${nights} Nights` : `${days} ${days === 1 ? 'Day' : 'Days'}`

  return { days, nights, label }
}
