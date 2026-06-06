'use client'

import { Button } from '@/components/button'
import FormattedPrice from '@/components/formatted-price'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Text } from '@/components/text'
import type { ItineraryDetail } from '@/data/itineraries/types'
import Form from 'next/form'
import DateInputPopover from '../../(listings)/components/date-input-popover'
import GuestsInputPopover from '../../(listings)/components/guests-input-popover'

interface Props {
  pricing: ItineraryDetail['pricing']
  onSubmit: (formData: FormData) => void | Promise<void>
}

const ItineraryPricingSidebar = ({ pricing, onSubmit }: Props) => {
  return (
    <div className="listingSection__wrap rounded-2xl shadow-lg-for-card bg-card p-4 sm:p-6 2xl:p-7">
      <div className="flex items-end text-2xl font-[540]">
        <span className="font-normal text-muted-foreground-lighter line-through notranslate">
          <FormattedPrice value={pricing.originalPrice} />
        </span>
        <FormattedPrice value={pricing.price} className="mx-2" />
        <span className="text-base font-normal text-muted-foreground">{pricing.priceLabel ?? ' / guest'}</span>
      </div>

      <Form
        action={onSubmit}
        className="flex flex-col rounded-3xl border border-border"
        id="booking-form"
      >
        <DateInputPopover className="z-11 flex-1" />
        <div className="w-full border-b border-border"></div>
        <GuestsInputPopover className="flex-1" />
      </Form>

      <DescriptionList>
        <DescriptionTerm>Fee & Taxes</DescriptionTerm>
        <DescriptionDetails className="sm:text-right notranslate">
          <FormattedPrice value={pricing.feeAndTaxes} />
        </DescriptionDetails>
        <DescriptionTerm className="font-medium sm:text-gray-900">Total</DescriptionTerm>
        <DescriptionDetails className="font-medium sm:text-right notranslate">
          <FormattedPrice value={pricing.total} />
        </DescriptionDetails>
      </DescriptionList>

      <div>
        <Button color="reserve" form="booking-form" type="submit" className="w-full sm:h-12">
          Reserve
        </Button>
        <Text className="mt-4 text-center text-sm text-muted-foreground">You won&apos;t be charged yet</Text>
      </div>
    </div>
  )
}

export default ItineraryPricingSidebar
