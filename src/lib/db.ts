import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../polls.db');

let db: Database.Database;

export function initDb() {
  if (db) return db;

  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  // Create tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS polls (
      id          TEXT PRIMARY KEY,
      admin_token TEXT NOT NULL UNIQUE,
      title       TEXT NOT NULL,
      description TEXT,
      duration    TEXT,
      expected    INTEGER DEFAULT 0,
      open_access INTEGER DEFAULT 1,
      date1       TEXT NOT NULL,
      date2       TEXT NOT NULL,
      date3       TEXT NOT NULL,
      timer_end   TEXT,
      created_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS invites (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      poll_id  TEXT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
      email    TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS votes (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      poll_id      TEXT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
      voter_name   TEXT NOT NULL,
      choice       TEXT NOT NULL,
      alt_date     TEXT,
      voter_token  TEXT,
      submitted_at TEXT DEFAULT (datetime('now')),
      UNIQUE(poll_id, voter_token)
    );
  `);

  return db;
}

export function getDb() {
  if (!db) initDb();
  return db;
}

export function closeDb() {
  if (db) {
    db.close();
  }
}
