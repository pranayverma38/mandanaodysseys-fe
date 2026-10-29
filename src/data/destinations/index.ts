import { australia } from './australia'
import { bali } from './bali'
import { bhutan } from './bhutan'
import { india } from './india'
import { nepal } from './nepal'
import { sriLanka } from './sri-lanka'
import { switzerland } from './switzerland'
import { thailand } from './thailand'
import type { Destination, DestinationContinent, DestinationDetail } from './types'
import { vietnam } from './vietnam'

export const ALL_DESTINATION_DETAILS: DestinationDetail[] = [
  india,
  sriLanka,
  bhutan,
  thailand,
  nepal,
  vietnam,
  bali,
  australia,
  switzerland,
]

export const DESTINATION_DETAILS: DestinationDetail[] = ALL_DESTINATION_DETAILS.filter(
  (destination) => destination.enabled
)

export const DESTINATIONS: Destination[] = DESTINATION_DETAILS

export const DESTINATION_CONTINENTS: DestinationContinent[] = [
  ...new Set(DESTINATIONS.map((destination) => destination.continent)),
]

export function getDestinationDetailBySlug(slug: string): DestinationDetail | undefined {
  return DESTINATION_DETAILS.find((destination) => destination.slug === slug)
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return getDestinationDetailBySlug(slug)
}

export function getDestinationsByContinent(continent: DestinationContinent): Destination[] {
  return DESTINATIONS.filter((destination) => destination.continent === continent)
}

export function isDestinationEnabled(slug: string): boolean {
  return DESTINATIONS.some((destination) => destination.slug === slug)
}

export function getDestinationPath(slug: string): string {
  return `/destinations/${slug}`
}

export * from './types'
export * from './tour-types'
