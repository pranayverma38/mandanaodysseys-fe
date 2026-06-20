import type { ItineraryAmenity } from './types'

export const ITINERARY_MOBILITY_LEVELS = ['Easy', 'Light Activity', 'Moderate', 'Active'] as const

export type ItineraryMobility = (typeof ITINERARY_MOBILITY_LEVELS)[number]

export const ITINERARY_MOBILITY_ICON = 'DashboardSpeed01Icon'

export function createMobilityAmenity(mobility: ItineraryMobility): ItineraryAmenity {
  return { icon: ITINERARY_MOBILITY_ICON, text: mobility }
}
