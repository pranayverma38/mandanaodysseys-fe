export type AccountTab = 'account' | 'itineraries' | 'password' | 'bookings' | 'wishlist'

export type UserProfile = {
  fullName: string
  email: string
  phone: string
  gender: string
  dateOfBirth: string
  address: string
  city: string
  country: string
  about: string
  memberSince: string
}

export type CustomItineraryStatus = 'draft' | 'sent' | 'accepted' | 'expired'

export type CustomItinerary = {
  id: string
  title: string
  destination: string
  duration: string
  travelers: number
  createdAt: string
  validUntil: string
  totalPrice: number
  status: CustomItineraryStatus
  documentUrl: string
  thumbnail: string
  notes?: string
}

export type BookingPaymentStatus = 'partial' | 'paid'

export type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled'

export type Booking = {
  id: string
  orderNumber: string
  packageTitle: string
  packageHandle: string
  packageImage: string
  destination: string
  travelDate: string
  bookedAt: string
  guests: number
  totalAmount: number
  paidAmount: number
  amountDue: number
  paymentStatus: BookingPaymentStatus
  status: BookingStatus
}

export type AccountData = {
  profile: UserProfile
  customItineraries: CustomItinerary[]
  bookings: Booking[]
  wishlistPackageIds: string[]
}
