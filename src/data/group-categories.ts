export type GroupCategoryCarouselCard = {
  id: string
  name: string
  handle: string
  thumbnail: string
  href: string
}

export type GroupCategoryCarouselGroup = {
  title: string
  handle: string
  icon: string
  categories: GroupCategoryCarouselCard[]
}
