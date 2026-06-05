import { DESTINATIONS, TOUR_TYPES } from '@/data/destinations'
import { getSiteUrl } from '@/lib/seo'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const lastModified = new Date()

  const staticRoutes = [
    '',
    '/experience',
    '/experience-search',
    '/about',
    '/contact',
    '/blog',
    '/destinations',
  ]

  const destinationRoutes = DESTINATIONS.flatMap((destination) => [
    `/destinations/${destination.slug}`,
    ...TOUR_TYPES.map((tourType) => `/destinations/${destination.slug}/${tourType.slug}`),
  ])

  const allRoutes = [...staticRoutes, ...destinationRoutes]

  return allRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path === '/destinations' ? 0.9 : 0.8,
  }))
}
