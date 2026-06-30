import { ApplicationLayout } from '@/app/application-layout'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import FeatureSection2 from '@/components/feature-section-2'
import Header from '@/components/header/header'
import { Heading } from '@/components/heading'
import NewsletterSection from '@/components/newsletter-section-1'
import SectionGridCategoryBox from '@/components/section-grid-category-box'
import { DESTINATIONS, getDestinationPath } from '@/data/destinations'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

const destinationCategories = DESTINATIONS.map((destination) => ({
  id: `destination://${destination.slug}`,
  name: destination.name,
  titleRaw: destination.name,
  subtitle: destination.country,
  handle: destination.slug,
  region: destination.continent,
  href: getDestinationPath(destination.slug),
  description: destination.description,
  count: destination.packageCount,
  thumbnail: destination.thumbnail,
}))

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ApplicationLayout header={<Header hasBorderBottom={false} />}>
      {children}

      <div className="container mb-24 flex flex-col gap-y-20 lg:mb-28 lg:gap-y-28">
        <Divider />

        <div>
          <div className="mb-11 flex flex-wrap items-end justify-between gap-5">
            <Heading>
              Explore our <span data-slot="italic">destinations</span>
            </Heading>
            <Button color="light" href="/destinations">
              View all destinations
              <ArrowRightIcon className="size-4!" />
            </Button>
          </div>
          <SectionGridCategoryBox categories={destinationCategories} card="5" />
        </div>
        <FeatureSection2 variant="up" />
        <NewsletterSection />
      </div>
    </ApplicationLayout>
  )
}

export default Layout
