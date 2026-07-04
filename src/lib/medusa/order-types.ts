export const BOOKING_ORDER_SOURCE = 'nextjs-checkout'

export type BookingOrderMetadata = {
  source: typeof BOOKING_ORDER_SOURCE
  booking_key: string
  package_handle: string
  package_title: string
  package_image: string
  destination: string
  customer_id: string
  customer_email: string
  customer_name: string
  guests_label: string
  guest_count: string
  start_date: string
  end_date: string
  date_range: string
  trip_total: string
  paid_amount: string
  amount_due: string
  payment_status: 'partial' | 'paid'
  payment_mode: string
  stripe_payment_intent_id: string
  stripe_payment_intent_ids: string
  recorded_payments?: string
  booked_at: string
}

export type RecordedOrderPayment = {
  payment_intent_id: string
  payment_collection_id: string
  amount: string
}

export type MedusaPaymentCollectionResponse = {
  payment_collection: {
    id: string
    amount: number
    status: string
  }
}

export type MedusaOrderItem = {
  id: string
  title: string
  unit_price: number
  metadata?: Record<string, unknown> | null
}

export type MedusaPaymentCollection = {
  id: string
  amount: number
  status: string
  captured_amount?: number | null
}

export type MedusaOrder = {
  id: string
  display_id: number
  status: string
  email: string | null
  customer_id: string | null
  total: number
  metadata: Record<string, unknown> | null
  created_at: string
  updated_at: string
  items?: MedusaOrderItem[]
  payment_collections?: MedusaPaymentCollection[]
  payment_status?: string
}

export type MedusaOrdersResponse = {
  orders: MedusaOrder[]
  count: number
}

export type MedusaOrderResponse = {
  order: MedusaOrder
}

export type MedusaDraftOrderResponse = {
  draft_order: MedusaOrder
}

export type MedusaStore = {
  id: string
  default_sales_channel_id: string | null
  default_region_id: string | null
}

export type MedusaStoresResponse = {
  stores: MedusaStore[]
}

export type MedusaRegion = {
  id: string
  currency_code: string
}

export type MedusaRegionsResponse = {
  regions: MedusaRegion[]
}
