import type { ItineraryThingToDo } from './types'

export type ItineraryMapStop = {
  name: string
  lat: number
  lng: number
}

function hasSameCoordinates(a: ItineraryMapStop, b: ItineraryMapStop) {
  return a.lat === b.lat && a.lng === b.lng
}

/** Returns map stops in itinerary order, skipping consecutive duplicate coordinates. */
export function getItineraryMapStops(thingsToDo: ItineraryThingToDo[]): ItineraryMapStop[] {
  const stops: ItineraryMapStop[] = []

  for (const item of thingsToDo) {
    const stop: ItineraryMapStop = { name: item.name, lat: item.lat, lng: item.lng }
    const last = stops[stops.length - 1]

    if (last && hasSameCoordinates(last, stop)) {
      continue
    }

    stops.push(stop)
  }

  return stops
}
