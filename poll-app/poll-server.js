import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import { randomBytes } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database
const db = new Database(path.join(__dirname, 'polls.db'));
db.pragma('journal_mode = WAL');

// Create tables
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

// Admin password middleware
function requireAdmin(req, res, next) {
  const pass = req.headers['x-admin-password'];
  if (pass !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Helper: Get vote counts for a poll
function getVoteCounts(pollId) {
  const result = db.prepare(`
    SELECT choice, COUNT(*) as count
    FROM votes
    WHERE poll_id = ?
    GROUP BY choice
  `).all(pollId);

  const counts = { date1: 0, date2: 0, date3: 0, none: 0 };
  result.forEach(row => {
    counts[row.choice] = row.count;
  });
  return counts;
}

// Helper: Get anonymized vote previews
function getVotePreviews(pollId) {
  const votes = db.prepare(`
    SELECT voter_name, choice
    FROM votes
    WHERE poll_id = ?
    ORDER BY submitted_at DESC
    LIMIT 20
  `).all(pollId);

  return votes.map(v => ({
    initials: (v.voter_name || '?').slice(0, 2).toUpperCase(),
    choice: v.choice
  }));
}

// ===== ADMIN ROUTES =====

// List all polls
app.get('/api/polls', requireAdmin, (req, res) => {
  try {
    const polls = db.prepare(`
      SELECT id, title, expected, created_at, admin_token
      FROM polls
      ORDER BY created_at DESC
    `).all();

    const pollsWithCounts = polls.map(poll => {
      const counts = getVoteCounts(poll.id);
      const totalVotes = counts.date1 + counts.date2 + counts.date3 + counts.none;
      return {
        ...poll,
        vote_count: totalVotes
      };
    });

    res.json(pollsWithCounts);
  } catch (error) {
    console.error('Error listing polls:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new poll
app.post('/api/polls', requireAdmin, (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      expected,
      open_access,
      date1,
      date2,
      date3,
      invite_emails = []
    } = req.body;

    const pollId = crypto.randomUUID();
    const adminToken = randomBytes(16).toString('hex');

    db.prepare(`
      INSERT INTO polls (id, admin_token, title, description, duration, expected, open_access, date1, date2, date3)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(pollId, adminToken, title, description, duration, expected, open_access, date1, date2, date3);

    // Add invites if provided and not open_access
    if (!open_access && invite_emails.length > 0) {
      const insertInvite = db.prepare('INSERT INTO invites (poll_id, email) VALUES (?, ?)');
      invite_emails.forEach(email => {
        insertInvite.run(pollId, email.toLowerCase().trim());
      });
    }

    res.status(201).json({
      id: pollId,
      admin_token: adminToken,
      vote_url: `http://localhost:${PORT}/poll-vote.html?token=${pollId}`,
      admin_url: `http://localhost:${PORT}/poll-admin.html?admin=${adminToken}`
    });
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get poll detail (admin view with all votes)
app.get('/api/polls/:adminToken/detail', requireAdmin, (req, res) => {
  try {
    const { adminToken } = req.params;

    const poll = db.prepare('SELECT * FROM polls WHERE admin_token = ?').get(adminToken);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const votes = db.prepare('SELECT voter_name, choice, alt_date, submitted_at FROM votes WHERE poll_id = ? ORDER BY submitted_at DESC').all(poll.id);
    const invites = db.prepare('SELECT email FROM invites WHERE poll_id = ?').all(poll.id);
    const counts = getVoteCounts(poll.id);

    res.json({
      poll,
      votes,
      invites: invites.map(i => i.email),
      counts
    });
  } catch (error) {
    console.error('Error fetching poll detail:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a poll
app.delete('/api/polls/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;

    db.prepare('DELETE FROM polls WHERE id = ?').run(id);

    res.json({ ok: true });
  } catch (error) {
    console.error('Error deleting poll:', error);
    res.status(500).json({ error: error.message });
  }
});

// ===== PUBLIC ROUTES =====

// Get poll info (public, with anonymized votes)
app.get('/api/vote/:pollId', (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = db.prepare('SELECT * FROM polls WHERE id = ?').get(pollId);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const counts = getVoteCounts(pollId);
    const votesPreviews = getVotePreviews(pollId);

    res.json({
      title: poll.title,
      description: poll.description,
      duration: poll.duration,
      date1: poll.date1,
      date2: poll.date2,
      date3: poll.date3,
      expected: poll.expected,
      counts,
      votes_preview: votesPreviews
    });
  } catch (error) {
    console.error('Error fetching poll:', error);
    res.status(500).json({ error: error.message });
  }
});

// Submit a vote
app.post('/api/vote/:pollId', (req, res) => {
  try {
    const { pollId } = req.params;
    const { voter_name, choice, alt_date, voter_token } = req.body;

    const poll = db.prepare('SELECT id FROM polls WHERE id = ?').get(pollId);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Insert vote
    db.prepare(`
      INSERT INTO votes (poll_id, voter_name, choice, alt_date, voter_token)
      VALUES (?, ?, ?, ?, ?)
    `).run(pollId, voter_name, choice, alt_date || null, voter_token);

    // Return updated counts and previews
    const counts = getVoteCounts(pollId);
    const votesPreviews = getVotePreviews(pollId);

    res.status(201).json({
      ok: true,
      counts,
      votes_preview: votesPreviews
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Vote already submitted from this device' });
    }
    console.error('Error submitting vote:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Poll server running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/poll.html`);
});
