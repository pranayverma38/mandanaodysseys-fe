import 'server-only'

import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from '@/lib/medusa/config'
import { createMedusaClient, medusaFetch, type MedusaCustomer } from '@/lib/medusa/server-client'
import { cookies } from 'next/headers'

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_COOKIE_NAME)?.value
}

export async function setAuthToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: AUTH_COOKIE_MAX_AGE,
  })
}

export async function clearAuthToken() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}

export async function getAuthenticatedCustomer(): Promise<MedusaCustomer | null> {
  const token = await getAuthToken()

  if (!token) {
    return null
  }

  try {
    const { customer } = await medusaFetch<{ customer: MedusaCustomer }>('/store/customers/me', {
      token,
    })
    return customer
  } catch {
    await clearAuthToken()
    return null
  }
}

export async function verifyCustomerCredentials(email: string, password: string) {
  const sdk = createMedusaClient()
  const result = await sdk.auth.login('customer', 'emailpass', { email, password })
  return typeof result === 'string' ? result : null
}
