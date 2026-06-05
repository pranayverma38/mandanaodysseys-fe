import type { Metadata } from 'next'

export const SITE_NAME = 'Mandana Odysseys'

export const SITE_TITLE = 'Affordable International Travel Experiences | Mandana Odysseys'

export const SITE_DESCRIPTION =
  'Book affordable international tour and travel packages with Mandana Odysseys. Explore curated guided tours, vacation packages, and unforgettable travel experiences worldwide.'

export const SITE_KEYWORDS = [
  'Mandana Odysseys',
  'international travel packages',
  'affordable tour packages',
  'travel booking',
  'vacation packages',
  'guided tours',
  'international tours',
  'travel experiences',
  'tour operator',
  'holiday packages',
  'group travel',
  'adventure travel',
]

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL
  if (url) return url.replace(/\/$/, '')
  return 'https://mandanaodysseys.com'
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: getSiteUrl(),
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'travel',
}

type PageMetadataOptions = {
  title: string
  description?: string
  path?: string
  keywords?: string[]
  noIndex?: boolean
  openGraphType?: 'website' | 'article'
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '',
  keywords,
  noIndex = false,
  openGraphType = 'website',
}: PageMetadataOptions): Metadata {
  const url = `${getSiteUrl()}${path}`

  return {
    title,
    description,
    ...(keywords && { keywords }),
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: openGraphType,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  }
}

export function createListingMetadata({
  title,
  description,
  path,
}: {
  title: string
  description?: string
  path: string
}): Metadata {
  const metaDescription =
    description ??
    `Book ${title} with Mandana Odysseys. Affordable international travel packages and guided tours. Reserve your spot today.`

  return createPageMetadata({
    title,
    description: metaDescription,
    path,
    keywords: [...SITE_KEYWORDS, title],
  })
}

export function createCategoryMetadata({
  name,
  description,
  path,
  label = 'Travel Packages',
}: {
  name: string
  description?: string
  path: string
  label?: string
}): Metadata {
  return createPageMetadata({
    title: `${name} ${label}`,
    description:
      description ??
      `Browse ${name} travel packages with Mandana Odysseys. Affordable international tours and curated vacation experiences.`,
    path,
  })
}

export function createNotFoundMetadata(resource = 'Page'): Metadata {
  return createPageMetadata({
    title: `${resource} Not Found`,
    description: `The ${resource.toLowerCase()} you are looking for does not exist or may have been removed.`,
    noIndex: true,
  })
}
