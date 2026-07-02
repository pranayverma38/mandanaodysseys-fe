export const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL ??
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ??
  'https://api.mandanaodysseys.com'

export const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ''

export const MEDUSA_SECRET_KEY = process.env.MEDUSA_SECRET_KEY ?? ''

export const AUTH_COOKIE_NAME = 'medusa_customer_token'

export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
