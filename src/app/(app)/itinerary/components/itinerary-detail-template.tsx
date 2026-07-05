import { Divider } from '@/components/divider'
import type { ItineraryDetail } from '@/data/itineraries/types'
import ItineraryInclusionsSection from './itinerary-inclusions-section'
import ItineraryPricingSidebar from './itinerary-pricing-sidebar'
import { redirect } from 'next/navigation'
import HeaderGallery from '../../(listings)/components/header-gallery'
import { SectionFeaturedAmenities } from '../../(listings)/components/section-featured-amenities'
import { buildItineraryDetailAmenities } from '@/data/itineraries/details/_shared'
import { SectionHeading } from '../../(listings)/components/section-heading'
import ItineraryTripMapSection from './itinerary-trip-map-section'
import ItinerarySectionHeader from './itinerary-section-header'
import ItineraryStarRating from './itinerary-star-rating'
import ItineraryStickyNav from './itinerary-sticky-nav'
import ItineraryAccommodationSection from './itinerary-accommodation-section'
import ItineraryBenefitsSection from './itinerary-benefits-section'
import ItineraryReviewsSection from './itinerary-reviews-section'

interface Props {
  itinerary: ItineraryDetail
}

const ItineraryDetailTemplate = ({ itinerary }: Props) => {
  const {
    address,
    destination,
    galleryImgs,
    categories,
    pricing,
    reviewCount,
    reviewStart,
    title,
    handle,
    amenities,
    description,
    duration,
    mobility,
    thingsToDo,
    includes,
    excludes,
    accommodations,
    reviews,
  } = itinerary

  const handleSubmitForm = async (formData: FormData) => {
    'use server'

    const entries = Object.fromEntries(formData.entries())
    const searchParams = new URLSearchParams()

    if (entries.handle) {
      searchParams.set('handle', String(entries.handle))
    }

    if (entries.startDate) {
      searchParams.set('startDate', String(entries.startDate))
    }

    searchParams.set('guestAdults', String(entries.guestAdults ?? 1))
    searchParams.set('guestChildren', String(entries.guestChildren ?? 0))
    searchParams.set('guestInfants', String(entries.guestInfants ?? 0))

    redirect(`/checkout?${searchParams.toString()}`)
  }

  return (
    <>
      <ItineraryStickyNav />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-5 flex flex-col gap-3 lg:mt-8">
          <ItineraryStarRating point={reviewStart} reviewCount={reviewCount} />
          <HeaderGallery images={galleryImgs} gridType="grid4" />
        </div>

      <main className="mt-10 grid min-w-0 grid-cols-1 lg:grid-cols-[59%_minmax(0,1fr)] lg:gap-x-8 xl:gap-x-[8%]">
        <div className="order-1 flex min-w-0 flex-col lg:order-none">
          <ItinerarySectionHeader
            address={address}
            categories={categories}
            destination={destination}
            title={title}
            packageHandle={handle}
          />

          <Divider className="my-8 xl:my-12" />

          <SectionFeaturedAmenities
            featuredAmenities={buildItineraryDetailAmenities(duration, mobility, amenities)}
          />

          <Divider className="my-8 xl:my-12" />

          <div className="listingSection__wrap">
            <SectionHeading>Description</SectionHeading>
            <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
              {description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="order-4 mt-8 w-full min-w-0 lg:order-none lg:mt-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <div className="sticky top-17 min-w-0 max-w-full">
            <ItineraryPricingSidebar handle={handle} pricing={pricing} onSubmit={handleSubmitForm} />

            <ItineraryBenefitsSection />
          </div>
        </div>

        <div className="order-2 col-span-full lg:order-none">
          <Divider className="my-8 xl:my-12" />

          <ItineraryTripMapSection thingsToDo={thingsToDo} />

          <Divider className="my-8 xl:my-12" />
        </div>

        <div className="order-3 flex min-w-0 flex-col lg:order-none">
          <ItineraryInclusionsSection includes={includes} excludes={excludes} />

          <Divider className="my-8 xl:my-12" />

          <ItineraryAccommodationSection accommodations={accommodations} />
        </div>
      </main>

      <Divider className="my-10 xl:my-16" />

      <div id="itinerary-reviews" className="scroll-mt-20">
        <ItineraryReviewsSection
          reviewCount={reviewCount}
          reviewStart={reviewStart}
          reviews={reviews}
        />
      </div>
      </div>
    </>
  )
}

export default ItineraryDetailTemplate
