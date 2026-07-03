import 'server-only'

import { cookies } from 'next/headers'

const ADMIN_COOKIE_NAME = 'mo_admin_session'
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 12 // 12 hours

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    throw new Error('ADMIN_PASSWORD is not configured')
  }
  return password
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!session) return false

  try {
    const expected = Buffer.from(getAdminPassword()).toString('base64')
    return session === expected
  } catch {
    return false
  }
}

export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (password !== getAdminPassword()) {
      return { success: false, error: 'Invalid password' }
    }

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE_NAME, Buffer.from(password).toString('base64'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/admin',
      maxAge: ADMIN_COOKIE_MAX_AGE,
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Admin access is not configured. Set ADMIN_PASSWORD in .env.local' }
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}
