import 'server-only'

import type { CustomItinerary, CustomItineraryStatus } from '@/data/account/types'
import type { Row } from '@libsql/client'
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

function parseRow(row: Row): DbRow {
  return {
    id: String(row.id),
    user_email: String(row.user_email),
    title: String(row.title),
    destination: String(row.destination),
    duration: String(row.duration),
    travelers: Number(row.travelers),
    created_at: String(row.created_at),
    valid_until: String(row.valid_until),
    total_price: Number(row.total_price),
    status: row.status as CustomItineraryStatus,
    document_url: String(row.document_url),
    thumbnail: String(row.thumbnail),
    notes: row.notes == null ? null : String(row.notes),
    updated_at: String(row.updated_at),
  }
}

function isPastDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  return date < today
}

async function resolveEffectiveStatus(row: DbRow): Promise<CustomItineraryStatus> {
  if (row.status === 'sent' && isPastDate(row.valid_until)) {
    const db = await getDb()
    if (db) {
      await db.execute({
        sql: `UPDATE custom_itineraries SET status = 'expired', updated_at = ? WHERE id = ?`,
        args: [new Date().toISOString(), row.id],
      })
    }
    return 'expired'
  }
  return row.status
}

async function rowToItinerary(row: DbRow): Promise<AdminCustomItinerary> {
  const status = await resolveEffectiveStatus(row)
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

async function rowToCustomerItinerary(row: DbRow): Promise<CustomItinerary> {
  const admin = await rowToItinerary(row)
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

export async function getItinerariesForUser(email: string): Promise<CustomItinerary[]> {
  const db = await getDb()
  if (!db) return []

  const result = await db.execute({
    sql: `SELECT * FROM custom_itineraries
          WHERE user_email = ? AND status IN ('sent', 'accepted', 'expired')
          ORDER BY created_at DESC`,
    args: [email.trim().toLowerCase()],
  })

  const rows = await Promise.all(result.rows.map((row) => rowToCustomerItinerary(parseRow(row))))
  return rows
}

export async function getAllItineraries(
  filter?: 'all' | 'active' | 'expired'
): Promise<AdminCustomItinerary[]> {
  const db = await getDb()
  if (!db) return []

  let sql = 'SELECT * FROM custom_itineraries'

  if (filter === 'active') {
    sql += ` WHERE status IN ('draft', 'sent', 'accepted')`
  } else if (filter === 'expired') {
    sql += ` WHERE status = 'expired'`
  }

  sql += ' ORDER BY updated_at DESC'

  const result = await db.execute(sql)
  return Promise.all(result.rows.map((row) => rowToItinerary(parseRow(row))))
}

export async function getItineraryById(id: string): Promise<AdminCustomItinerary | null> {
  const db = await getDb()
  if (!db) return null

  const result = await db.execute({
    sql: 'SELECT * FROM custom_itineraries WHERE id = ?',
    args: [id],
  })

  const row = result.rows[0]
  return row ? rowToItinerary(parseRow(row)) : null
}

export async function createItinerary(input: CreateItineraryInput): Promise<AdminCustomItinerary> {
  const db = await getDb()
  if (!db) {
    throw new Error('Database is not available. Configure TURSO_DATABASE_URL for production.')
  }

  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const createdAt = now.slice(0, 10)
  const status = input.status ?? 'draft'

  await db.execute({
    sql: `INSERT INTO custom_itineraries (
      id, user_email, title, destination, duration, travelers,
      created_at, valid_until, total_price, status, document_url, thumbnail, notes, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
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
      now,
    ],
  })

  const created = await getItineraryById(id)
  if (!created) {
    throw new Error('Failed to create itinerary.')
  }
  return created
}

export async function updateItinerary(
  id: string,
  input: UpdateItineraryInput
): Promise<AdminCustomItinerary | null> {
  const db = await getDb()
  if (!db) {
    throw new Error('Database is not available. Configure TURSO_DATABASE_URL for production.')
  }

  const existing = await getItineraryById(id)
  if (!existing) return null

  const now = new Date().toISOString()

  await db.execute({
    sql: `UPDATE custom_itineraries SET
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
    WHERE id = ?`,
    args: [
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
      id,
    ],
  })

  return getItineraryById(id)
}

export async function updateItineraryStatus(
  id: string,
  status: CustomItineraryStatus
): Promise<AdminCustomItinerary | null> {
  return updateItinerary(id, { status })
}

export async function deleteItinerary(id: string): Promise<boolean> {
  const db = await getDb()
  if (!db) {
    throw new Error('Database is not available. Configure TURSO_DATABASE_URL for production.')
  }

  const result = await db.execute({
    sql: 'DELETE FROM custom_itineraries WHERE id = ?',
    args: [id],
  })

  return result.rowsAffected > 0
}

export async function getItineraryStats() {
  const db = await getDb()
  const counts = { draft: 0, sent: 0, accepted: 0, expired: 0, total: 0 }

  if (!db) return counts

  const result = await db.execute(
    `SELECT status, COUNT(*) as count FROM custom_itineraries GROUP BY status`
  )

  for (const row of result.rows) {
    const status = row.status as CustomItineraryStatus
    const count = Number(row.count)
    counts[status] = count
    counts.total += count
  }

  return counts
}
