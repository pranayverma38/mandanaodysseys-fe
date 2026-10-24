import type { ItineraryDetail } from '@/data/itineraries/types'

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  process.env.MEDUSA_BACKEND_URL ||
  'https://api.mandanaodysseys.com'

const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ''

const STORE_HEADERS: Record<string, string> = PUBLISHABLE_KEY
  ? { 'x-publishable-api-key': PUBLISHABLE_KEY }
  : {}

type ApiItinerary = {
  id: string
  handle: string
  title: string
  badge?: string
  destination: string
  address: string
  locations: { name: string; lat: number; lng: number }[]
  review_start: number
  review_count: number
  categories: { category: string }[]
  duration: { days: number; nights: number; label: string }
  mobility: string
  featured_image?: string
  gallery_imgs: string[]
  gallery_videos: string[]
  amenities: { icon: string | null; text: string }[]
  pricing: { price: string; originalPrice: string; feeAndTaxes: string; total: string; priceLabel?: string }
  description: string
  things_to_do: { name: string; time: string; description: string; imageUrl: string; lat: number; lng: number }[]
  includes: string[]
  excludes: string[]
  accommodations: { name: string; imageUrl: string; rating: number; location: string }[]
  map: { lat: number | null; lng: number | null }
  reviews: { id: string; title: string; rating: number; content: string; author: string; date: string; datetime: string; authorAvatarUrl?: string }[]
}

const FALLBACK_AVATAR = { src: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' }

function normalizeItinerary(api: ApiItinerary): ItineraryDetail {
  return {
    id: api.id,
    handle: api.handle,
    title: api.title,
    badge: api.badge,
    destination: api.destination,
    address: api.address,
    locations: api.locations || [],
    reviewStart: api.review_start || 0,
    reviewCount: api.review_count || 0,
    categories: api.categories || [],
    duration: {
      days: api.duration?.days || 1,
      nights: api.duration?.nights || 0,
      label: api.duration?.label || `${api.duration?.days} Days / ${api.duration?.nights} Nights`,
    },
    mobility: (api.mobility as ItineraryDetail['mobility']) || 'Easy',
    featuredImage: api.featured_image || '',
    galleryImgs: api.gallery_imgs || [],
    galleryVideos: api.gallery_videos || [],
    amenities: (api.amenities || []).map((amenity) => ({
      icon: typeof amenity?.icon === 'string' ? amenity.icon : null,
      text: amenity?.text || '',
    })),
    pricing: {
      price: api.pricing?.price || '',
      originalPrice: api.pricing?.originalPrice || '',
      feeAndTaxes: api.pricing?.feeAndTaxes || '',
      total: api.pricing?.total || '',
      priceLabel: api.pricing?.priceLabel,
    },
    description: api.description || '',
    thingsToDo: api.things_to_do || [],
    includes: api.includes || [],
    excludes: api.excludes || [],
    accommodations: api.accommodations || [],
    map: { lat: api.map?.lat ?? 0, lng: api.map?.lng ?? 0 },
    reviews: (api.reviews || []).map((r) => ({
      id: r.id,
      title: r.title,
      rating: r.rating,
      content: r.content,
      author: r.author,
      authorAvatar: r.authorAvatarUrl ? { src: r.authorAvatarUrl } : FALLBACK_AVATAR,
      date: r.date,
      datetime: r.datetime,
    })),
  }
}

export async function fetchItinerariesFromMedusa(): Promise<ItineraryDetail[] | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/store/itineraries?limit=200`, {
      headers: STORE_HEADERS,
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data.itineraries?.length) return null
    return data.itineraries.map(normalizeItinerary)
  } catch {
    return null
  }
}

export async function fetchItineraryByHandleFromMedusa(handle: string): Promise<ItineraryDetail | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/store/itineraries/${handle}`, {
      headers: STORE_HEADERS,
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data.itinerary) return null
    return normalizeItinerary(data.itinerary)
  } catch {
    return null
  }
}
