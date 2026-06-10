import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../polls.db');

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');

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
  }

  return db;
}

export interface VoteCounts {
  date1: number;
  date2: number;
  date3: number;
  none: number;
}

export function getVoteCounts(pollId: string): VoteCounts {
  const db = getDatabase();
  const result = db.prepare(`
    SELECT choice, COUNT(*) as count
    FROM votes
    WHERE poll_id = ?
    GROUP BY choice
  `).all(pollId) as Array<{ choice: string; count: number }>;

  const counts: VoteCounts = { date1: 0, date2: 0, date3: 0, none: 0 };
  result.forEach(row => {
    if (row.choice in counts) {
      counts[row.choice as keyof VoteCounts] = row.count;
    }
  });
  return counts;
}

export interface VotePreview {
  initials: string;
  choice: string;
}

export function getVotePreviews(pollId: string): VotePreview[] {
  const db = getDatabase();
  const votes = db.prepare(`
    SELECT voter_name, choice
    FROM votes
    WHERE poll_id = ?
    ORDER BY submitted_at DESC
    LIMIT 20
  `).all(pollId) as Array<{ voter_name: string; choice: string }>;

  return votes.map(v => ({
    initials: (v.voter_name || '?').slice(0, 2).toUpperCase(),
    choice: v.choice
  }));
}
