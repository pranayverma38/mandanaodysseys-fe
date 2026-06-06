export type ItinerarySubCategory = {
  slug: string
  name: string
}

export type ItineraryCategory = {
  slug: string
  name: string
  subCategories: ItinerarySubCategory[]
}

export const ITINERARY_CATEGORIES: ItineraryCategory[] = [
  {
    slug: 'india',
    name: 'India',
    subCategories: [
      { slug: 'heritage-tours', name: 'Heritage Tours' },
      { slug: 'beach-getaways', name: 'Beach Getaways' },
      { slug: 'city-breaks', name: 'City Breaks' },
      { slug: 'family-vacations', name: 'Family Vacations' },
      { slug: 'wildlife-safaris', name: 'Wildlife Safaris' },
    ],
  },
  {
    slug: 'international',
    name: 'International',
    subCategories: [
      { slug: 'europe-tours', name: 'Europe Tours' },
      { slug: 'luxury-escapes', name: 'Luxury Escapes' },
      { slug: 'beach-holidays', name: 'Beach Holidays' },
      { slug: 'group-tours', name: 'Group Tours' },
    ],
  },
]

export function getItineraryCategoryName(categorySlug: string) {
  return ITINERARY_CATEGORIES.find((category) => category.slug === categorySlug)?.name ?? categorySlug
}

export function getItinerarySubCategoryName(categorySlug: string, subCategorySlug: string) {
  const category = ITINERARY_CATEGORIES.find((item) => item.slug === categorySlug)
  return category?.subCategories.find((subCategory) => subCategory.slug === subCategorySlug)?.name ?? subCategorySlug
}
