import 'server-only'

import { MEDUSA_BACKEND_URL, MEDUSA_PUBLISHABLE_KEY, MEDUSA_SECRET_KEY } from '@/lib/medusa/config'
import type { MedusaCustomer } from '@/lib/medusa/server-client'

type AdminCustomersResponse = {
  customers: MedusaCustomer[]
  count: number
  offset: number
  limit: number
}

type AdminCustomerResponse = {
  customer: MedusaCustomer
}

export function isMedusaAdminConfigured(): boolean {
  return Boolean(MEDUSA_SECRET_KEY)
}

export async function medusaAdminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!MEDUSA_SECRET_KEY) {
    throw new Error('MEDUSA_SECRET_KEY is not configured.')
  }

  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')
  headers.set('Authorization', `Basic ${MEDUSA_SECRET_KEY}`)

  if (MEDUSA_PUBLISHABLE_KEY) {
    headers.set('x-publishable-api-key', MEDUSA_PUBLISHABLE_KEY)
  }

  const response = await fetch(`${MEDUSA_BACKEND_URL}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  })

  const text = await response.text()
  const data = text ? (JSON.parse(text) as T & { message?: string }) : ({} as T)

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string'
        ? data.message
        : `Medusa admin request failed (${response.status})`
    throw new Error(message)
  }

  return data
}

export async function listAllCustomers(): Promise<MedusaCustomer[]> {
  const customers: MedusaCustomer[] = []
  const limit = 100
  let offset = 0

  while (true) {
    const { customers: page, count } = await medusaAdminFetch<AdminCustomersResponse>(
      `/admin/customers?limit=${limit}&offset=${offset}`
    )

    customers.push(...page)
    offset += page.length

    if (offset >= count || page.length === 0) {
      break
    }
  }

  return customers
}

export async function findCustomerByEmail(email: string): Promise<MedusaCustomer | null> {
  const { customers } = await medusaAdminFetch<AdminCustomersResponse>(
    `/admin/customers?email=${encodeURIComponent(email.trim().toLowerCase())}&limit=1`
  )

  return customers[0] ?? null
}

export async function updateCustomerMetadata(
  customerId: string,
  metadata: Record<string, unknown>
): Promise<MedusaCustomer> {
  const { customer } = await medusaAdminFetch<AdminCustomerResponse>(`/admin/customers/${customerId}`, {
    method: 'POST',
    body: JSON.stringify({ metadata }),
  })

  return customer
}
