export type GroupCategoryCarouselCard = {
  id: string
  name: string
  handle: string
  thumbnail: string
  href: string
}

/** Shared shape for destination/category card components (e.g. experience-search grid). */
export type TCategory = {
  id: string
  name: string
  handle: string
  href: string
  thumbnail: string
  count: number
  subtitle?: string
  titleRaw?: string
  region?: string
  description?: string
}

export type GroupCategoryCarouselGroup = {
  title: string
  handle: string
  icon: string
  categories: GroupCategoryCarouselCard[]
}
