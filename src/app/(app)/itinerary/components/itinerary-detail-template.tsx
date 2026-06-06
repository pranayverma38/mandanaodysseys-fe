import ButtonPrimary from '@/components/button-primary'
import FormattedPrice from '@/components/formatted-price'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Text } from '@/components/text'
import type { ItineraryDetail } from '@/data/itineraries/types'
import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Form from 'next/form'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import DateInputPopover from '../../(listings)/components/date-input-popover'
import GuestsInputPopover from '../../(listings)/components/guests-input-popover'
import HeaderGallery from '../../(listings)/components/header-gallery'
import { SectionFeaturedAmenities } from '../../(listings)/components/section-featured-amenities'
import { SectionHeading } from '../../(listings)/components/section-heading'
import SectionListingReviews from '../../(listings)/components/section-listing-reviews'
import SectionMap from '../../(listings)/components/section-map'
import ItinerarySectionHeader from './itinerary-section-header'
import ItineraryStickyNav from './itinerary-sticky-nav'
import ItineraryAccommodationSection from './itinerary-accommodation-section'
import ItineraryBenefitsSection from './itinerary-benefits-section'

interface Props {
  itinerary: ItineraryDetail
}

const ItineraryDetailTemplate = ({ itinerary }: Props) => {
  const {
    address,
    galleryImgs,
    categories,
    pricing,
    reviewCount,
    reviewStart,
    title,
    amenities,
    description,
    thingsToDo,
    includes,
    accommodations,
    reviews,
    map,
  } = itinerary

  const handleSubmitForm = async (formData: FormData) => {
    'use server'

    console.log('Form submitted with data:', Object.fromEntries(formData.entries()))
    redirect('/checkout')
  }

  return (
    <>
      <ItineraryStickyNav />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-5 lg:mt-8">
          <HeaderGallery images={galleryImgs} gridType="grid4" />
        </div>

      <main className="mt-10 flex min-w-0 flex-col gap-8 lg:flex-row xl:gap-[8%]">
        <div className="flex w-full flex-col lg:w-3/5 xl:w-[59%]">
          <ItinerarySectionHeader
            address={address}
            categories={categories}
            reviewCount={reviewCount}
            reviewStart={reviewStart}
            title={title}
          />

          <Divider className="my-8 xl:my-12" />

          <SectionFeaturedAmenities featuredAmenities={amenities} />

          <Divider className="my-8 xl:my-12" />

          <div className="listingSection__wrap">
            <SectionHeading>Description</SectionHeading>
            <div className="leading-relaxed text-muted-foreground">{description}</div>

            <SectionHeading id="itinerary-your-trip" className="scroll-mt-20">
              What you&apos;ll do
            </SectionHeading>
            <div className="flex flex-col gap-8">
              {thingsToDo.map((item, index) => (
                <div key={index} className="flex items-start gap-4 sm:items-center sm:gap-8">
                  <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl">
                    <Image fill src={item.imageUrl} alt={item.name} className="object-cover shadow-inner" />
                  </div>
                  <div className="max-w-md text-sm/5 text-muted-foreground">
                    <p>{item.time}</p>
                    <p className="mt-2 font-medium text-foreground">{item.name}</p>
                    <p className="mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider className="my-8 xl:my-12" />

          <div id="itinerary-inclusions" className="listingSection__wrap scroll-mt-20">
            <SectionHeading>Included in the price</SectionHeading>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {includes.map((item) => (
                <div key={item} className="flex items-center gap-x-3">
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={24} className="mt-px shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Divider className="my-8 xl:my-12" />

          <ItineraryAccommodationSection accommodations={accommodations} />
        </div>

        <div className="w-full min-w-0 lg:flex-1 lg:basis-0">
          <div className="sticky top-17 min-w-0 max-w-full">
            <div className="listingSection__wrap rounded-2xl shadow-lg-for-card bg-card p-4 sm:p-6 2xl:p-7">
              <div className="flex items-end text-2xl font-[540]">
                <span className="font-normal text-muted-foreground-lighter line-through">{pricing.originalPrice}</span>
                <FormattedPrice value={pricing.price} className="mx-2" />
                <span className="text-base font-normal text-muted-foreground">
                  {pricing.priceLabel ?? ' / guest'}
                </span>
              </div>

              <Form
                action={handleSubmitForm}
                className="flex flex-col rounded-3xl border border-border"
                id="booking-form"
              >
                <DateInputPopover className="z-11 flex-1" />
                <div className="w-full border-b border-border"></div>
                <GuestsInputPopover className="flex-1" />
              </Form>

              <DescriptionList>
                <DescriptionTerm>Fee & Taxes</DescriptionTerm>
                <DescriptionDetails className="sm:text-right">{pricing.feeAndTaxes}</DescriptionDetails>
                <DescriptionTerm className="font-medium sm:text-gray-900">Total</DescriptionTerm>
                <DescriptionDetails className="font-medium sm:text-right">{pricing.total}</DescriptionDetails>
              </DescriptionList>

              <div>
                <ButtonPrimary form="booking-form" type="submit" className="w-full sm:h-12">
                  Reserve
                </ButtonPrimary>
                <Text className="mt-4 text-center text-sm text-muted-foreground">You won&apos;t be charged yet</Text>
              </div>
            </div>

            <ItineraryBenefitsSection />
          </div>
        </div>
      </main>

      <Divider className="my-10 xl:my-16" />

      <div id="itinerary-reviews" className="scroll-mt-20">
        <SectionListingReviews
          reviewCount={reviewCount}
          reviewStart={reviewStart}
          reviews={reviews}
          showHeadingDivider={false}
        />
      </div>

      <Divider className="my-10 xl:my-16" />

      <div className="mt-10 mb-10 xl:mt-16 xl:mb-16">
        <SectionMap location={{ ...map, id: 1, name: title }} />
      </div>
      </div>
    </>
  )
}

export default ItineraryDetailTemplate
