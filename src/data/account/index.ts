import { mapCustomerToProfile } from '@/lib/account/map-customer'
import { getAuthenticatedCustomer } from '@/lib/auth/session'
import { getVisibleItinerariesFromMetadata } from '@/lib/itineraries/store'
import { parseWishlistHandles } from '@/lib/wishlist/metadata'
import type { AccountData } from './types'

const EMPTY_ACCOUNT_DATA: AccountData = {
  profile: {
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    city: '',
    country: '',
    about: '',
    memberSince: '',
  },
  customItineraries: [],
  bookings: [],
  wishlistPackageIds: [],
}

export async function getAccountData(): Promise<AccountData> {
  const customer = await getAuthenticatedCustomer()

  if (!customer) {
    return EMPTY_ACCOUNT_DATA
  }

  return {
    profile: mapCustomerToProfile(customer),
    customItineraries: getVisibleItinerariesFromMetadata(customer.metadata),
    bookings: [],
    wishlistPackageIds: parseWishlistHandles(customer.metadata),
  }
}

export type { AccountData, AccountTab, Booking, CustomItinerary, UserProfile } from './types'
