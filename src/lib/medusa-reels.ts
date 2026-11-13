import { MEDUSA_BACKEND_URL, MEDUSA_PUBLISHABLE_KEY } from '@/lib/medusa/config'

export type HomepageReel = {
  id: string
  title: string
  location: string
  videoSrc: string
}

type ApiReel = {
  id: string
  video_url: string
  title: string
  location: string
}

const STORE_HEADERS: Record<string, string> = MEDUSA_PUBLISHABLE_KEY
  ? { 'x-publishable-api-key': MEDUSA_PUBLISHABLE_KEY }
  : {}

function normalizeReel(reel: ApiReel): HomepageReel {
  return {
    id: reel.id,
    title: reel.title,
    location: reel.location,
    videoSrc: reel.video_url,
  }
}

export async function fetchReelsFromMedusa(): Promise<HomepageReel[] | null> {
  try {
    const response = await fetch(`${MEDUSA_BACKEND_URL}/store/reels?limit=20`, {
      headers: STORE_HEADERS,
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (!Array.isArray(data.reels) || data.reels.length === 0) {
      return null
    }

    return data.reels.map(normalizeReel)
  } catch {
    return null
  }
}
