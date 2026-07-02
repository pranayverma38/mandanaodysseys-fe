import 'server-only'

import { MEDUSA_BACKEND_URL, MEDUSA_JWT_SECRET, MEDUSA_PUBLISHABLE_KEY } from '@/lib/medusa/config'
import jwt from 'jsonwebtoken'

const RESET_PASSWORD_TOKEN_TTL_SECONDS = 15 * 60

function createPasswordResetToken(email: string) {
  if (!MEDUSA_JWT_SECRET) {
    throw new Error('Password updates are not configured. Missing MEDUSA_JWT_SECRET.')
  }

  return jwt.sign(
    {
      entity_id: email,
      actor_type: 'customer',
      provider: 'emailpass',
      purpose: 'reset',
    },
    MEDUSA_JWT_SECRET,
    {
      expiresIn: RESET_PASSWORD_TOKEN_TTL_SECONDS,
    }
  )
}

export async function updateCustomerPassword(email: string, newPassword: string) {
  const resetToken = createPasswordResetToken(email)

  const response = await fetch(`${MEDUSA_BACKEND_URL}/auth/customer/emailpass/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(MEDUSA_PUBLISHABLE_KEY ? { 'x-publishable-api-key': MEDUSA_PUBLISHABLE_KEY } : {}),
      Authorization: `Bearer ${resetToken}`,
    },
    body: JSON.stringify({ password: newPassword }),
    cache: 'no-store',
  })

  const text = await response.text()
  let data: { message?: string } = {}

  if (text) {
    try {
      data = JSON.parse(text) as { message?: string }
    } catch {
      data = {}
    }
  }

  if (!response.ok) {
    const message =
      typeof data.message === 'string' ? data.message : `Unable to update password (${response.status})`
    throw new Error(message)
  }
}
