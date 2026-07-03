import 'server-only'

import type { CustomItinerary, CustomItineraryStatus } from '@/data/account/types'
import { getDb } from './index'

export type AdminCustomItinerary = CustomItinerary & {
  userEmail: string
  updatedAt: string
}

type DbRow = {
  id: string
  user_email: string
  title: string
  destination: string
  duration: string
  travelers: number
  created_at: string
  valid_until: string
  total_price: number
  status: CustomItineraryStatus
  document_url: string
  thumbnail: string
  notes: string | null
  updated_at: string
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

function isPastDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  return date < today
}

function resolveEffectiveStatus(row: DbRow): CustomItineraryStatus {
  if (row.status === 'sent' && isPastDate(row.valid_until)) {
    getDb()
      .prepare(`UPDATE custom_itineraries SET status = 'expired', updated_at = ? WHERE id = ?`)
      .run(new Date().toISOString(), row.id)
    return 'expired'
  }
  return row.status
}

function rowToItinerary(row: DbRow): AdminCustomItinerary {
  const status = resolveEffectiveStatus(row)
  return {
    id: row.id,
    userEmail: row.user_email,
    title: row.title,
    destination: row.destination,
    duration: row.duration,
    travelers: row.travelers,
    createdAt: row.created_at,
    validUntil: row.valid_until,
    totalPrice: row.total_price,
    status,
    documentUrl: row.document_url,
    thumbnail: row.thumbnail,
    notes: row.notes ?? undefined,
    updatedAt: row.updated_at,
  }
}

function rowToCustomerItinerary(row: DbRow): CustomItinerary {
  const admin = rowToItinerary(row)
  return {
    id: admin.id,
    title: admin.title,
    destination: admin.destination,
    duration: admin.duration,
    travelers: admin.travelers,
    createdAt: admin.createdAt,
    validUntil: admin.validUntil,
    totalPrice: admin.totalPrice,
    status: admin.status,
    documentUrl: admin.documentUrl,
    thumbnail: admin.thumbnail,
    notes: admin.notes,
  }
}

export function getItinerariesForUser(email: string): CustomItinerary[] {
  const rows = getDb()
    .prepare(
      `SELECT * FROM custom_itineraries
       WHERE user_email = ? AND status IN ('sent', 'accepted', 'expired')
       ORDER BY created_at DESC`
    )
    .all(email.trim().toLowerCase()) as DbRow[]

  return rows.map(rowToCustomerItinerary)
}

export function getAllItineraries(filter?: 'all' | 'active' | 'expired'): AdminCustomItinerary[] {
  let query = 'SELECT * FROM custom_itineraries'
  const params: string[] = []

  if (filter === 'active') {
    query += ` WHERE status IN ('draft', 'sent', 'accepted')`
  } else if (filter === 'expired') {
    query += ` WHERE status = 'expired'`
  }

  query += ' ORDER BY updated_at DESC'

  const rows = getDb().prepare(query).all(...params) as DbRow[]
  return rows.map(rowToItinerary)
}

export function getItineraryById(id: string): AdminCustomItinerary | null {
  const row = getDb().prepare('SELECT * FROM custom_itineraries WHERE id = ?').get(id) as DbRow | undefined
  return row ? rowToItinerary(row) : null
}

export function createItinerary(input: CreateItineraryInput): AdminCustomItinerary {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const createdAt = now.slice(0, 10)
  const status = input.status ?? 'draft'

  getDb()
    .prepare(
      `INSERT INTO custom_itineraries (
        id, user_email, title, destination, duration, travelers,
        created_at, valid_until, total_price, status, document_url, thumbnail, notes, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      id,
      input.userEmail.trim().toLowerCase(),
      input.title.trim(),
      input.destination.trim(),
      input.duration.trim(),
      input.travelers,
      createdAt,
      input.validUntil,
      input.totalPrice,
      status,
      input.documentUrl.trim(),
      input.thumbnail.trim(),
      input.notes?.trim() || null,
      now
    )

  return getItineraryById(id)!
}

export function updateItinerary(id: string, input: UpdateItineraryInput): AdminCustomItinerary | null {
  const existing = getItineraryById(id)
  if (!existing) return null

  const now = new Date().toISOString()

  getDb()
    .prepare(
      `UPDATE custom_itineraries SET
        user_email = ?,
        title = ?,
        destination = ?,
        duration = ?,
        travelers = ?,
        valid_until = ?,
        total_price = ?,
        status = ?,
        document_url = ?,
        thumbnail = ?,
        notes = ?,
        updated_at = ?
      WHERE id = ?`
    )
    .run(
      (input.userEmail ?? existing.userEmail).trim().toLowerCase(),
      (input.title ?? existing.title).trim(),
      (input.destination ?? existing.destination).trim(),
      (input.duration ?? existing.duration).trim(),
      input.travelers ?? existing.travelers,
      input.validUntil ?? existing.validUntil,
      input.totalPrice ?? existing.totalPrice,
      input.status ?? existing.status,
      (input.documentUrl ?? existing.documentUrl).trim(),
      (input.thumbnail ?? existing.thumbnail).trim(),
      input.notes !== undefined ? input.notes.trim() || null : existing.notes ?? null,
      now,
      id
    )

  return getItineraryById(id)
}

export function updateItineraryStatus(
  id: string,
  status: CustomItineraryStatus
): AdminCustomItinerary | null {
  return updateItinerary(id, { status })
}

export function deleteItinerary(id: string): boolean {
  const result = getDb().prepare('DELETE FROM custom_itineraries WHERE id = ?').run(id)
  return result.changes > 0
}

export function getItineraryStats() {
  const rows = getDb()
    .prepare(
      `SELECT status, COUNT(*) as count FROM custom_itineraries GROUP BY status`
    )
    .all() as { status: CustomItineraryStatus; count: number }[]

  const counts = { draft: 0, sent: 0, accepted: 0, expired: 0, total: 0 }
  for (const row of rows) {
    counts[row.status] = row.count
    counts.total += row.count
  }
  return counts
}
