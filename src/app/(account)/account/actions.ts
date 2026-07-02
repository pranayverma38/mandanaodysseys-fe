'use server'

import { buildCustomerUpdatePayload } from '@/lib/account/map-customer'
import { changePasswordAction, requestPasswordResetAction } from '@/lib/auth/actions'
import { getAuthToken } from '@/lib/auth/session'
import { medusaFetch } from '@/lib/medusa/server-client'
import { parseWishlistHandles } from '@/lib/wishlist/metadata'
import { revalidatePath } from 'next/cache'

export type ActionState = {
  error?: string
  success?: string
}

export async function updateProfile(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const token = await getAuthToken()

  if (!token) {
    return { error: 'You must be signed in to update your profile.' }
  }

  try {
    const { customer } = await medusaFetch<{ customer: { metadata: Record<string, unknown> | null } }>(
      '/store/customers/me',
      { token }
    )

    const payload = buildCustomerUpdatePayload(formData)
    const wishlistMetadata = parseWishlistHandles(customer.metadata)
    const nextMetadata = {
      ...(customer.metadata ?? {}),
      ...payload.metadata,
      wishlist_handles: JSON.stringify(wishlistMetadata),
    }

    await medusaFetch('/store/customers/me', {
      method: 'POST',
      token,
      body: JSON.stringify({
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone: payload.phone,
        metadata: nextMetadata,
      }),
    })

    revalidatePath('/account')
    return { success: 'Profile updated successfully.' }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unable to update profile.' }
  }
}

export async function updatePassword(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  return changePasswordAction(_prevState, formData)
}

export { requestPasswordResetAction }
