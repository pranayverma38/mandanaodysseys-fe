import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo'

export default function TravelAgencyJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: getSiteUrl(),
    sameAs: [],
    areaServed: 'Worldwide',
    priceRange: '$$',
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'TouristTrip',
        name: 'International Travel Packages',
        description: SITE_DESCRIPTION,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
