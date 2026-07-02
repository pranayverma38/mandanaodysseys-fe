import Medusa from '@medusajs/js-sdk'
import { AUTH_COOKIE_NAME, MEDUSA_BACKEND_URL, MEDUSA_PUBLISHABLE_KEY } from './config'

export function createMedusaClient(token?: string) {
  const sdk = new Medusa({
    baseUrl: MEDUSA_BACKEND_URL,
    publishableKey: MEDUSA_PUBLISHABLE_KEY,
    auth: {
      type: 'jwt',
      jwtTokenStorageMethod: 'memory',
    },
  })

  if (token) {
    sdk.client.setToken(token)
  }

  return sdk
}

export type MedusaCustomer = {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

export async function medusaFetch<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...init } = options
  const headers = new Headers(init.headers)

  headers.set('Content-Type', 'application/json')

  if (MEDUSA_PUBLISHABLE_KEY) {
    headers.set('x-publishable-api-key', MEDUSA_PUBLISHABLE_KEY)
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${MEDUSA_BACKEND_URL}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  })

  const text = await response.text()
  const data = text ? (JSON.parse(text) as T & { message?: string; type?: string }) : ({} as T)

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string'
        ? data.message
        : `Medusa request failed (${response.status})`
    throw new Error(message)
  }

  return data
}

export { AUTH_COOKIE_NAME }
