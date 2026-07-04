import 'server-only'

import type { Booking } from '@/data/account/types'
import { mapMedusaOrderToBooking } from '@/lib/bookings/map-order'
import { isMedusaAdminConfigured } from '@/lib/itineraries/medusa-admin'
import { listBookingOrdersForCustomer } from '@/lib/medusa/orders'
import type { MedusaCustomer } from '@/lib/medusa/server-client'

export async function getBookingsForCustomer(customer: MedusaCustomer): Promise<Booking[]> {
  if (!isMedusaAdminConfigured()) {
    return []
  }

  const orders = await listBookingOrdersForCustomer(customer)

  return orders
    .map(mapMedusaOrderToBooking)
    .filter((booking): booking is Booking => booking !== null)
}
