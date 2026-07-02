import type { UserProfile } from '@/data/account/types'
import type { MedusaCustomer } from '@/lib/medusa/server-client'

function metadataString(metadata: Record<string, unknown> | null | undefined, key: string): string {
  const value = metadata?.[key]
  return typeof value === 'string' ? value : ''
}

export function splitFullName(fullName: string) {
  const trimmed = fullName.trim()
  const parts = trimmed.split(/\s+/)

  if (parts.length === 0 || !parts[0]) {
    return { firstName: '', lastName: '' }
  }

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' }
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  }
}

export function getCustomerFullName(customer: MedusaCustomer) {
  const metadataName = metadataString(customer.metadata, 'full_name')
  if (metadataName) {
    return metadataName
  }

  return [customer.first_name, customer.last_name].filter(Boolean).join(' ').trim()
}

export function mapCustomerToProfile(customer: MedusaCustomer): UserProfile {
  return {
    fullName: getCustomerFullName(customer),
    email: customer.email,
    phone: customer.phone ?? '',
    gender: metadataString(customer.metadata, 'gender'),
    dateOfBirth: metadataString(customer.metadata, 'date_of_birth'),
    address: metadataString(customer.metadata, 'address'),
    city: metadataString(customer.metadata, 'city'),
    country: metadataString(customer.metadata, 'country'),
    about: metadataString(customer.metadata, 'about'),
    memberSince: customer.created_at.slice(0, 10),
  }
}

export function buildCustomerUpdatePayload(formData: FormData) {
  const fullName = String(formData.get('fullName') ?? '').trim()
  const { firstName, lastName } = splitFullName(fullName)

  return {
    first_name: firstName,
    last_name: lastName,
    phone: String(formData.get('phone') ?? '').trim() || undefined,
    metadata: {
      full_name: fullName,
      gender: String(formData.get('gender') ?? '').trim(),
      date_of_birth: String(formData.get('dateOfBirth') ?? '').trim(),
      address: String(formData.get('address') ?? '').trim(),
      city: String(formData.get('city') ?? '').trim(),
      country: String(formData.get('country') ?? '').trim(),
      about: String(formData.get('about') ?? '').trim(),
    },
  }
}
