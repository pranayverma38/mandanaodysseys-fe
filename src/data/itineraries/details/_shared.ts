import avatarImage1 from '@/images/avatars/Image-1.png'
import avatarImage2 from '@/images/avatars/Image-2.png'
import avatarImage3 from '@/images/avatars/Image-3.png'
import avatarImage4 from '@/images/avatars/Image-4.png'
import type { ItineraryReview } from '../types'

export function createDefaultReviews(overrides?: Partial<ItineraryReview>[]): ItineraryReview[] {
  const base: ItineraryReview[] = [
    {
      id: '1',
      title: "Can't say enough good things",
      rating: 5,
      content: 'Lovely guide, very friendly! I would definitely book this package again.',
      author: 'S. Walkinshaw',
      authorAvatar: avatarImage1,
      date: 'May 16, 2025',
      datetime: '2025-05-16',
    },
    {
      id: '2',
      title: 'Perfect for going out when you want to stay comfy',
      rating: 4,
      content: 'Excellent itinerary. The guide was super friendly, hotels were clean and well located.',
      author: 'Risako M',
      authorAvatar: avatarImage2,
      date: 'May 11, 2025',
      datetime: '2025-05-11',
    },
    {
      id: '3',
      title: 'Very well organised trip',
      rating: 5,
      content: 'Very nice and friendly guide. The experience looked even better than in the pictures.',
      author: 'Eden Birch',
      authorAvatar: avatarImage3,
      date: 'Aug 22, 2024',
      datetime: '2024-08-22',
    },
    {
      id: '4',
      title: 'Memorable family vacation',
      rating: 5,
      content: 'Lots of great stops nearby and we tried many local restaurants. Would book again.',
      author: 'Jonathan Edwards',
      authorAvatar: avatarImage3,
      date: 'May 16, 2025',
      datetime: '2025-05-16',
    },
    {
      id: '5',
      title: 'Smooth from start to finish',
      rating: 5,
      content: 'Transfers, hotels, and sightseeing were all handled professionally.',
      author: 'Jonathan',
      authorAvatar: avatarImage4,
      date: 'May 16, 2025',
      datetime: '2025-05-16',
    },
  ]

  if (!overrides?.length) {
    return base
  }

  return base.map((review, index) => ({ ...review, ...overrides[index] }))
}
