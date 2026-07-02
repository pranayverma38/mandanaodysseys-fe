import {
  Calendar03Icon,
  FavouriteIcon,
  MapsIcon,
  SecurityLockIcon,
  UserIcon,
} from '@hugeicons/core-free-icons'
import type { AccountTab } from './types'

export const NAV_ITEMS: {
  id: AccountTab
  label: string
  description: string
  icon: typeof UserIcon
}[] = [
  {
    id: 'account',
    label: 'Account',
    description: 'Profile & personal details',
    icon: UserIcon,
  },
  {
    id: 'itineraries',
    label: 'Your Itineraries',
    description: 'Custom quotes & downloads',
    icon: MapsIcon,
  },
  {
    id: 'password',
    label: 'Reset Password',
    description: 'Security settings',
    icon: SecurityLockIcon,
  },
  {
    id: 'bookings',
    label: 'Bookings',
    description: 'Orders & payments',
    icon: Calendar03Icon,
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    description: 'Saved packages',
    icon: FavouriteIcon,
  },
]

export const HEADER_MENU_TABS: AccountTab[] = ['account', 'itineraries', 'bookings', 'wishlist']

export function getAccountTabHref(tab: AccountTab): string {
  return tab === 'account' ? '/account' : `/account?tab=${tab}`
}
