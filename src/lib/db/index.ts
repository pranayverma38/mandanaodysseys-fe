import 'server-only'

import { createClient, type Client } from '@libsql/client'
import fs from 'fs'
import path from 'path'

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS custom_itineraries (
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL COLLATE NOCASE,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    duration TEXT NOT NULL,
    travelers INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    valid_until TEXT NOT NULL,
    total_price REAL NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('draft', 'sent', 'accepted', 'expired')),
    document_url TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    notes TEXT,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_custom_itineraries_user_email
    ON custom_itineraries(user_email);
  CREATE INDEX IF NOT EXISTS idx_custom_itineraries_status
    ON custom_itineraries(status);
`

let client: Client | null | undefined

function createTursoClient(): Client | null {
  const url = process.env.TURSO_DATABASE_URL
  if (!url) {
    return null
  }

  return createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
}

function createLocalClient(): Client | null {
  try {
    const dbDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }

    const dbPath = path.join(dbDir, 'custom-itineraries.db')
    return createClient({ url: `file:${dbPath}` })
  } catch {
    return null
  }
}

async function initSchema(db: Client) {
  await db.executeMultiple(SCHEMA_SQL)
}

export async function getDb(): Promise<Client | null> {
  if (client !== undefined) {
    return client
  }

  const db = createTursoClient() ?? createLocalClient()
  if (!db) {
    client = null
    return null
  }

  await initSchema(db)
  client = db
  return db
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.TURSO_DATABASE_URL) || process.env.NODE_ENV !== 'production'
}
