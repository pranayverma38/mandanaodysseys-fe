export type TravellerStory = {
  id: string
  title: string
  destination: string
  videoSrc: string
}

export const TRAVELLER_STORIES: TravellerStory[] = [
  {
    id: 'main',
    title: "Prajakta's Singapore Holiday",
    destination: 'Singapore',
    videoSrc: '/videos/header/section-home-videos/main.mp4',
  },
  {
    id: 'story-1',
    title: "Myur & Sonia's Bali Holiday",
    destination: 'Bali',
    videoSrc: '/videos/header/section-home-videos/story-1.mp4',
  },
  {
    id: 'story-2',
    title: "Rahul's Thailand Adventure",
    destination: 'Thailand',
    videoSrc: '/videos/header/section-home-videos/story-2.mp4',
  },
  {
    id: 'story-3',
    title: "Ananya's Vietnam Escape",
    destination: 'Vietnam',
    videoSrc: '/videos/header/section-home-videos/story-3.mp4',
  },
  {
    id: 'story-4',
    title: "Vikram's Nepal Trek",
    destination: 'Nepal',
    videoSrc: '/videos/header/section-home-videos/story-4.mp4',
  },
]
