import type { CustomItinerary, CustomItineraryStatus } from '@/data/account/types'

const CUSTOM_ITINERARIES_KEY = 'custom_itineraries'

export function parseCustomItineraries(
  metadata: Record<string, unknown> | null | undefined
): CustomItinerary[] {
  if (!metadata?.[CUSTOM_ITINERARIES_KEY]) {
    return []
  }

  const raw = metadata[CUSTOM_ITINERARIES_KEY]

  if (Array.isArray(raw)) {
    return raw.filter(isCustomItinerary)
  }

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw) as unknown
      if (Array.isArray(parsed)) {
        return parsed.filter(isCustomItinerary)
      }
    } catch {
      return []
    }
  }

  return []
}

function isCustomItinerary(value: unknown): value is CustomItinerary {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.destination === 'string' &&
    typeof item.duration === 'string' &&
    typeof item.travelers === 'number' &&
    typeof item.createdAt === 'string' &&
    typeof item.validUntil === 'string' &&
    typeof item.totalPrice === 'number' &&
    typeof item.status === 'string' &&
    typeof item.documentUrl === 'string' &&
    typeof item.thumbnail === 'string'
  )
}

export function serializeCustomItineraries(itineraries: CustomItinerary[]): Record<string, string> {
  return {
    [CUSTOM_ITINERARIES_KEY]: JSON.stringify(itineraries),
  }
}

export function isPastDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  return date < today
}

export function withEffectiveStatus(itinerary: CustomItinerary): CustomItinerary {
  if (itinerary.status === 'sent' && isPastDate(itinerary.validUntil)) {
    return { ...itinerary, status: 'expired' as CustomItineraryStatus }
  }
  return itinerary
}

export function visibleToCustomer(itinerary: CustomItinerary): boolean {
  return itinerary.status === 'sent' || itinerary.status === 'accepted' || itinerary.status === 'expired'
}
