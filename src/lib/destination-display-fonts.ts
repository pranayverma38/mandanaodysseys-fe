import {
  Amita,
  Atma,
  Carattere,
  IM_Fell_English_SC,
  Lobster,
  Mouse_Memoirs,
  Pattaya,
  Rum_Raisin,
} from 'next/font/google'

const indiaFont = Amita({ subsets: ['latin'], weight: '400' })
const sriLankaFont = IM_Fell_English_SC({ subsets: ['latin'], weight: '400' })
const thailandFont = Atma({ subsets: ['latin'], weight: '400' })
const nepalFont = Rum_Raisin({ subsets: ['latin'], weight: '400' })
const vietnamFont = Pattaya({ subsets: ['latin'], weight: '400' })
const baliFont = Lobster({ subsets: ['latin'], weight: '400' })
const australiaFont = Mouse_Memoirs({ subsets: ['latin'], weight: '400' })
const switzerlandFont = Carattere({ subsets: ['latin'], weight: '400' })

/** Display fonts for Elite Gateways destination cards — keyed by destination slug. */
const DESTINATION_DISPLAY_FONTS: Record<string, { className: string }> = {
  india: indiaFont,
  'sri-lanka': sriLankaFont,
  thailand: thailandFont,
  nepal: nepalFont,
  vietnam: vietnamFont,
  bali: baliFont,
  australia: australiaFont,
  switzerland: switzerlandFont,
}

export function getDestinationDisplayFontClass(destinationSlug: string): string | undefined {
  return DESTINATION_DISPLAY_FONTS[destinationSlug]?.className
}
