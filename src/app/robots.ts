import { getSiteUrl } from '@/lib/seo'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account', '/account-*', '/login', '/signup', '/forgot-password', '/checkout', '/pay-done'],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  }
}
