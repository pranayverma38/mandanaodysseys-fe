import { ListingType } from '@/type'
import { HotAirBalloonFreeIcons } from '@hugeicons/core-free-icons'
import { IconSvgElement } from '@hugeicons/react'
import { ExperiencesSearchForm } from './experiences-search-form'

export const heroSearchFormTabsData: {
  name: ListingType
  icon: IconSvgElement
  href: string
  formComponent: React.ComponentType<{ formStyle: 'default' | 'small' }>
}[] = [
  {
    name: 'Experiences',
    icon: HotAirBalloonFreeIcons,
    href: '/experience-search',
    formComponent: ExperiencesSearchForm,
  },
]
