import 'server-only'

import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

const DB_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'custom-itineraries.db')

let db: Database.Database | null = null

function initSchema(database: Database.Database) {
  database.exec(`
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
  `)
}

export function getDb(): Database.Database {
  if (db) {
    return db
  }

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true })
  }

  db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  initSchema(db)
  return db
}
