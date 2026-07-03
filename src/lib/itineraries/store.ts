import 'server-only'

import type { CustomItinerary, CustomItineraryStatus } from '@/data/account/types'
import {
  parseCustomItineraries,
  serializeCustomItineraries,
  visibleToCustomer,
  withEffectiveStatus,
} from './metadata'
import {
  findCustomerByEmail,
  isMedusaAdminConfigured,
  listAllCustomers,
  updateCustomerMetadata,
} from './medusa-admin'

export type AdminCustomItinerary = CustomItinerary & {
  userEmail: string
  updatedAt: string
}

export type CreateItineraryInput = {
  userEmail: string
  title: string
  destination: string
  duration: string
  travelers: number
  validUntil: string
  totalPrice: number
  documentUrl: string
  thumbnail: string
  notes?: string
  status?: CustomItineraryStatus
}

export type UpdateItineraryInput = Partial<
  Omit<CreateItineraryInput, 'userEmail' | 'status'>
> & {
  userEmail?: string
  status?: CustomItineraryStatus
}

function toAdminItinerary(itinerary: CustomItinerary, userEmail: string): AdminCustomItinerary {
  return {
    ...withEffectiveStatus(itinerary),
    userEmail,
    updatedAt: itinerary.createdAt,
  }
}

function flattenCustomerItineraries(customers: Awaited<ReturnType<typeof listAllCustomers>>) {
  const items: AdminCustomItinerary[] = []

  for (const customer of customers) {
    const email = customer.email?.trim().toLowerCase() ?? ''
    if (!email) continue

    for (const itinerary of parseCustomItineraries(customer.metadata)) {
      items.push(toAdminItinerary(itinerary, email))
    }
  }

  return items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function getVisibleItinerariesFromMetadata(
  metadata: Record<string, unknown> | null | undefined
): CustomItinerary[] {
  return parseCustomItineraries(metadata)
    .map(withEffectiveStatus)
    .filter(visibleToCustomer)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getItinerariesForUser(email: string): Promise<CustomItinerary[]> {
  if (!isMedusaAdminConfigured()) return []

  const customer = await findCustomerByEmail(email)
  if (!customer) return []

  return getVisibleItinerariesFromMetadata(customer.metadata)
}

export async function getAllItineraries(
  filter?: 'all' | 'active' | 'expired'
): Promise<AdminCustomItinerary[]> {
  if (!isMedusaAdminConfigured()) return []

  let itineraries = flattenCustomerItineraries(await listAllCustomers())

  if (filter === 'active') {
    itineraries = itineraries.filter((item) => ['draft', 'sent', 'accepted'].includes(item.status))
  } else if (filter === 'expired') {
    itineraries = itineraries.filter((item) => item.status === 'expired')
  }

  return itineraries
}

export async function getItineraryById(id: string): Promise<AdminCustomItinerary | null> {
  const itineraries = await getAllItineraries()
  return itineraries.find((item) => item.id === id) ?? null
}

async function saveCustomerItineraries(email: string, itineraries: CustomItinerary[]) {
  const customer = await findCustomerByEmail(email)
  if (!customer) {
    throw new Error(`No customer account found for ${email}. The user must sign up first.`)
  }

  const nextMetadata = {
    ...(customer.metadata ?? {}),
    ...serializeCustomItineraries(itineraries),
  }

  await updateCustomerMetadata(customer.id, nextMetadata)
}

export async function createItinerary(input: CreateItineraryInput): Promise<AdminCustomItinerary> {
  const email = input.userEmail.trim().toLowerCase()
  const customer = await findCustomerByEmail(email)

  if (!customer) {
    throw new Error(`No customer account found for ${email}. The user must sign up first.`)
  }

  const now = new Date().toISOString()
  const itinerary: CustomItinerary = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    destination: input.destination.trim(),
    duration: input.duration.trim(),
    travelers: input.travelers,
    createdAt: now.slice(0, 10),
    validUntil: input.validUntil,
    totalPrice: input.totalPrice,
    status: input.status ?? 'draft',
    documentUrl: input.documentUrl.trim(),
    thumbnail: input.thumbnail.trim(),
    notes: input.notes?.trim() || undefined,
  }

  const existing = parseCustomItineraries(customer.metadata)
  await saveCustomerItineraries(email, [...existing, itinerary])

  return { ...itinerary, userEmail: email, updatedAt: now }
}

export async function updateItinerary(
  id: string,
  input: UpdateItineraryInput
): Promise<AdminCustomItinerary | null> {
  const current = await getItineraryById(id)
  if (!current) return null

  const email = (input.userEmail ?? current.userEmail).trim().toLowerCase()
  const customer = await findCustomerByEmail(email)

  if (!customer) {
    throw new Error(`No customer account found for ${email}.`)
  }

  const itineraries = parseCustomItineraries(customer.metadata)
  const index = itineraries.findIndex((item) => item.id === id)

  if (index === -1) {
    return null
  }

  const existing = itineraries[index]
  const updated: CustomItinerary = {
    ...existing,
    title: (input.title ?? existing.title).trim(),
    destination: (input.destination ?? existing.destination).trim(),
    duration: (input.duration ?? existing.duration).trim(),
    travelers: input.travelers ?? existing.travelers,
    validUntil: input.validUntil ?? existing.validUntil,
    totalPrice: input.totalPrice ?? existing.totalPrice,
    status: input.status ?? existing.status,
    documentUrl: (input.documentUrl ?? existing.documentUrl).trim(),
    thumbnail: (input.thumbnail ?? existing.thumbnail).trim(),
    notes: input.notes !== undefined ? input.notes.trim() || undefined : existing.notes,
  }

  itineraries[index] = updated

  if (email !== current.userEmail.trim().toLowerCase()) {
    const previousItineraries = parseCustomItineraries(
      (await findCustomerByEmail(current.userEmail))?.metadata
    ).filter((item) => item.id !== id)

    await saveCustomerItineraries(current.userEmail, previousItineraries)
  }

  await saveCustomerItineraries(email, itineraries)

  return {
    ...withEffectiveStatus(updated),
    userEmail: email,
    updatedAt: new Date().toISOString(),
  }
}

export async function updateItineraryStatus(
  id: string,
  status: CustomItineraryStatus
): Promise<AdminCustomItinerary | null> {
  return updateItinerary(id, { status })
}

export async function deleteItinerary(id: string): Promise<boolean> {
  const current = await getItineraryById(id)
  if (!current) return false

  const next = parseCustomItineraries((await findCustomerByEmail(current.userEmail))?.metadata).filter(
    (item) => item.id !== id
  )

  await saveCustomerItineraries(current.userEmail, next)
  return true
}

export async function getItineraryStats() {
  const counts = { draft: 0, sent: 0, accepted: 0, expired: 0, total: 0 }
  const itineraries = await getAllItineraries()

  for (const itinerary of itineraries) {
    const status = withEffectiveStatus(itinerary).status
    counts[status] += 1
    counts.total += 1
  }

  return counts
}

export { isMedusaAdminConfigured as isDatabaseConfigured }
