import { fetchReelsFromMedusa, type HomepageReel } from '@/lib/medusa-reels'

export type TravellerStory = HomepageReel

export async function getTravellerStories(): Promise<TravellerStory[]> {
  const reels = await fetchReelsFromMedusa()
  return reels ?? []
}
