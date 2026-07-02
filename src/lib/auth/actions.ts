'use server'

import { createMedusaClient, medusaFetch } from '@/lib/medusa/server-client'
import {
  clearAuthToken,
  getAuthToken,
  getAuthenticatedCustomer,
  setAuthToken,
  verifyCustomerCredentials,
} from '@/lib/auth/session'
import { mapCustomerToProfile } from '@/lib/account/map-customer'
import { parseWishlistHandles } from '@/lib/wishlist/metadata'
import { splitFullName } from '@/lib/account/map-customer'

export type AuthActionState = {
  error?: string
  success?: string
}

export async function getSessionCustomer() {
  const customer = await getAuthenticatedCustomer()

  if (!customer) {
    return null
  }

  return {
    id: customer.id,
    email: customer.email,
    fullName: mapCustomerToProfile(customer).fullName,
    wishlistHandles: parseWishlistHandles(customer.metadata),
  }
}

export async function loginAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  try {
    const token = await verifyCustomerCredentials(email, password)

    if (!token) {
      return { error: 'Invalid email or password.' }
    }

    await setAuthToken(token)
    return { success: 'Logged in successfully.' }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unable to log in.' }
  }
}

export async function signupAction(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const fullName = String(formData.get('fullName') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')

  if (!fullName || !email || !password) {
    return { error: 'Full name, email, and password are required.' }
  }

  const { firstName, lastName } = splitFullName(fullName)
  const sdk = createMedusaClient()

  try {
    const registrationToken = await sdk.auth.register('customer', 'emailpass', { email, password })

    if (typeof registrationToken !== 'string') {
      return { error: 'Additional verification is required before sign up can be completed.' }
    }

    await sdk.store.customer.create(
      {
        email,
        first_name: firstName,
        last_name: lastName,
        metadata: {
          full_name: fullName,
        },
      },
      {},
      {
        Authorization: `Bearer ${registrationToken}`,
      }
    )

    const loginToken = await verifyCustomerCredentials(email, password)

    if (!loginToken) {
      return { error: 'Account created, but automatic sign-in failed. Please log in.' }
    }

    await setAuthToken(loginToken)
    return { success: 'Account created successfully.' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create account.'

    if (message.toLowerCase().includes('already exists')) {
      return { error: 'An account with this email already exists. Please sign in instead.' }
    }

    return { error: message }
  }
}

export async function logoutAction() {
  await clearAuthToken()
}

export async function requestPasswordResetAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()

  if (!email) {
    return { error: 'Email is required.' }
  }

  try {
    const sdk = createMedusaClient()
    await sdk.auth.resetPassword('customer', 'emailpass', { identifier: email })
    return {
      success: 'If an account exists for this email, you will receive password reset instructions shortly.',
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unable to request password reset.' }
  }
}

export async function resetPasswordWithTokenAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const token = String(formData.get('token') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const confirmPassword = String(formData.get('confirmPassword') ?? '')

  if (!token) {
    return { error: 'Reset token is missing or invalid.' }
  }

  if (!password || password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  try {
    const sdk = createMedusaClient()
    await sdk.auth.updateProvider('customer', 'emailpass', { password }, token)
    return { success: 'Password updated successfully. You can now sign in.' }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unable to reset password.' }
  }
}

export async function changePasswordAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const currentPassword = String(formData.get('currentPassword') ?? '')
  const newPassword = String(formData.get('newPassword') ?? '')
  const confirmPassword = String(formData.get('confirmPassword') ?? '')

  const customer = await getAuthenticatedCustomer()

  if (!customer) {
    return { error: 'You must be signed in to change your password.' }
  }

  if (!currentPassword) {
    return { error: 'Current password is required.' }
  }

  if (!newPassword || newPassword.length < 8) {
    return { error: 'New password must be at least 8 characters.' }
  }

  if (newPassword !== confirmPassword) {
    return { error: 'New passwords do not match.' }
  }

  try {
    const loginToken = await verifyCustomerCredentials(customer.email, currentPassword)

    if (!loginToken) {
      return { error: 'Current password is incorrect.' }
    }

    const sdk = createMedusaClient()
    await sdk.auth.resetPassword('customer', 'emailpass', { identifier: customer.email })

    try {
      await sdk.auth.updateProvider('customer', 'emailpass', { password: newPassword }, loginToken)
      await setAuthToken(loginToken)
      return { success: 'Password updated successfully.' }
    } catch {
      return {
        success: `We sent a password reset link to ${customer.email}. Open the link in your email and set your new password to complete the change.`,
      }
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unable to change password.' }
  }
}

export async function getWishlistHandlesAction(): Promise<string[]> {
  const customer = await getAuthenticatedCustomer()
  return parseWishlistHandles(customer?.metadata)
}

export async function toggleWishlistAction(packageHandle: string): Promise<{ error?: string; handles?: string[] }> {
  const token = await getAuthToken()

  if (!token) {
    return { error: 'AUTH_REQUIRED' }
  }

  try {
    const { customer } = await medusaFetch<{ customer: { metadata: Record<string, unknown> | null } }>(
      '/store/customers/me',
      { token }
    )

    const currentHandles = parseWishlistHandles(customer.metadata)
    const nextHandles = currentHandles.includes(packageHandle)
      ? currentHandles.filter((handle) => handle !== packageHandle)
      : [...currentHandles, packageHandle]

    const nextMetadata = {
      ...(customer.metadata ?? {}),
      wishlist_handles: JSON.stringify(nextHandles),
    }

    await medusaFetch('/store/customers/me', {
      method: 'POST',
      token,
      body: JSON.stringify({ metadata: nextMetadata }),
    })

    return { handles: nextHandles }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unable to update wishlist.' }
  }
}
