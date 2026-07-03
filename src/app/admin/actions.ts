'use server'

import { isAdminAuthenticated, loginAdmin, logoutAdmin } from '@/lib/admin/auth'
import {
  createItinerary,
  deleteItinerary,
  getAllItineraries,
  getItineraryStats,
  updateItinerary,
  updateItineraryStatus,
  type CreateItineraryInput,
} from '@/lib/db/custom-itineraries'
import type { CustomItineraryStatus } from '@/data/account/types'
import { revalidatePath } from 'next/cache'

export type AdminActionState = {
  error?: string
  success?: string
}

async function requireAdmin() {
  const authed = await isAdminAuthenticated()
  if (!authed) {
    throw new Error('Unauthorized')
  }
}

export async function adminLoginAction(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const password = String(formData.get('password') ?? '')
  const result = await loginAdmin(password)

  if (!result.success) {
    return { error: result.error }
  }

  revalidatePath('/admin')
  return { success: 'Logged in' }
}

export async function adminLogoutAction() {
  await logoutAdmin()
  revalidatePath('/admin')
}

export async function getAdminDashboardData(filter: 'all' | 'active' | 'expired' = 'all') {
  const authed = await isAdminAuthenticated()
  if (!authed) return null

  return {
    itineraries: getAllItineraries(filter),
    stats: getItineraryStats(),
  }
}

export async function createItineraryAction(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await requireAdmin()

    const input: CreateItineraryInput = {
      userEmail: String(formData.get('userEmail') ?? ''),
      title: String(formData.get('title') ?? ''),
      destination: String(formData.get('destination') ?? ''),
      duration: String(formData.get('duration') ?? ''),
      travelers: Number(formData.get('travelers') ?? 1),
      validUntil: String(formData.get('validUntil') ?? ''),
      totalPrice: Number(formData.get('totalPrice') ?? 0),
      documentUrl: String(formData.get('documentUrl') ?? ''),
      thumbnail: String(formData.get('thumbnail') ?? ''),
      notes: String(formData.get('notes') ?? '') || undefined,
      status: (formData.get('status') as CustomItineraryStatus) || 'draft',
    }

    if (!input.userEmail || !input.title || !input.destination) {
      return { error: 'Email, title, and destination are required.' }
    }

    if (!input.documentUrl) {
      return { error: 'PDF link is required.' }
    }

    createItinerary(input)
    revalidatePath('/admin')
    revalidatePath('/account')
    return { success: 'Itinerary created.' }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to create itinerary.' }
  }
}

export async function updateItineraryAction(
  id: string,
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await requireAdmin()

    const updated = updateItinerary(id, {
      userEmail: String(formData.get('userEmail') ?? ''),
      title: String(formData.get('title') ?? ''),
      destination: String(formData.get('destination') ?? ''),
      duration: String(formData.get('duration') ?? ''),
      travelers: Number(formData.get('travelers') ?? 1),
      validUntil: String(formData.get('validUntil') ?? ''),
      totalPrice: Number(formData.get('totalPrice') ?? 0),
      documentUrl: String(formData.get('documentUrl') ?? ''),
      thumbnail: String(formData.get('thumbnail') ?? ''),
      notes: String(formData.get('notes') ?? '') || undefined,
    })

    if (!updated) {
      return { error: 'Itinerary not found.' }
    }

    revalidatePath('/admin')
    revalidatePath('/account')
    return { success: 'Itinerary updated.' }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to update itinerary.' }
  }
}

export async function setItineraryStatusAction(
  id: string,
  status: CustomItineraryStatus
): Promise<AdminActionState> {
  try {
    await requireAdmin()

    const updated = updateItineraryStatus(id, status)
    if (!updated) {
      return { error: 'Itinerary not found.' }
    }

    revalidatePath('/admin')
    revalidatePath('/account')
    return { success: `Status updated to ${status}.` }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to update status.' }
  }
}

export async function deleteItineraryAction(id: string): Promise<AdminActionState> {
  try {
    await requireAdmin()

    const deleted = deleteItinerary(id)
    if (!deleted) {
      return { error: 'Itinerary not found.' }
    }

    revalidatePath('/admin')
    revalidatePath('/account')
    return { success: 'Itinerary deleted.' }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to delete itinerary.' }
  }
}
