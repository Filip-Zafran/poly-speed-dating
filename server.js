import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { chromium } from "playwright";
import Database from "better-sqlite3";
import { randomBytes, randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route works!', time: new Date().toISOString() });
});

// Countdown image generator for email embeds
app.get('/countdown', async (req, res) => {
  try {
    const { deadline } = req.query;

    // Validation
    if (!deadline) {
      return res.status(400).json({ error: 'deadline parameter required (ISO 8601 format)' });
    }

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      return res.status(400).json({ error: 'Invalid deadline format. Use ISO 8601: 2026-06-11T15:00:00Z' });
    }

    // Prevent abuse - don't allow deadlines more than 2 years away
    const maxFutureDate = new Date();
    maxFutureDate.setFullYear(maxFutureDate.getFullYear() + 2);
    if (deadlineDate > maxFutureDate) {
      return res.status(400).json({ error: 'Deadline too far in the future' });
    }

    // Calculate remaining time
    const now = new Date();
    const remaining = deadlineDate - now;

    let timeText;
    let textColor = '#000000'; // Black for normal text

    if (remaining <= 0) {
      timeText = 'Registration closed';
      textColor = '#8B0000'; // Dark red for closed
    } else {
      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      if (days > 0) {
        timeText = `${days}d ${hours}h ${minutes}m remaining`;
      } else if (hours > 0) {
        timeText = `${hours}h ${minutes}m remaining`;
      } else {
        timeText = `${minutes}m remaining`;
      }
    }

    // Create SVG with Duck Dating branding (yellow #FFD84D)
    const svg = `
      <svg width="600" height="120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            text { font-family: Arial, sans-serif; }
          </style>
        </defs>
        <!-- Background with border and rounded corners -->
        <rect width="600" height="120" fill="#FFD84D" stroke="#000000" stroke-width="4" rx="15" ry="15"/>
        <!-- Main countdown text -->
        <text x="300" y="65" font-size="52" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="${textColor}">
          ${timeText}
        </text>
      </svg>
    `;

    // Convert SVG to PNG using sharp
    const buffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'no-cache, max-age=60'); // Cache for 1 minute
    res.set('Content-Disposition', 'inline; filename="countdown.png"');
    res.send(buffer);
  } catch (error) {
    console.error('Countdown image error:', error);
    res.status(500).json({ error: 'Failed to generate countdown image' });
  }
});

// Debug endpoint
app.get('/debug', (req, res) => {
  const pollHtmlPath = path.join(__dirname, 'poll-app', 'public', 'poll.html');
  const exists = fs.existsSync(pollHtmlPath);
  res.json({
    __dirname,
    pollHtmlPath,
    fileExists: exists,
    files: fs.existsSync(path.join(__dirname, 'poll-app', 'public')) ?
      fs.readdirSync(path.join(__dirname, 'poll-app', 'public')) : 'poll-app/public does not exist'
  });
});

// Explicit routes for poll pages (BEFORE static middleware so they take priority)
app.get('/poll.html', (req, res) => {
  const filePath = path.join(__dirname, 'poll-app', 'public', 'poll.html');
  console.log(`[poll.html] Attempting to serve from: ${filePath}`);
  console.log(`[poll.html] File exists: ${fs.existsSync(filePath)}`);

  if (!fs.existsSync(filePath)) {
    console.log(`[poll.html] ERROR: File not found!`);
    return res.status(404).json({ error: 'File not found', path: filePath });
  }

  res.sendFile(filePath);
});

app.get('/poll-vote.html', (req, res) => {
  const filePath = path.join(__dirname, 'poll-app', 'public', 'poll-vote.html');
  console.log(`[poll-vote.html] Attempting to serve from: ${filePath}`);
  console.log(`[poll-vote.html] File exists: ${fs.existsSync(filePath)}`);

  if (!fs.existsSync(filePath)) {
    console.log(`[poll-vote.html] ERROR: File not found!`);
    return res.status(404).json({ error: 'File not found', path: filePath });
  }

  res.sendFile(filePath);
});

// Middleware to serve .html files when path doesn't have extension
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }

  // If path has no extension, try .html version
  if (!path.extname(req.path) && req.path !== '/') {
    // Check poll-app/public first
    const pollHtmlPath = path.join(__dirname, 'poll-app', 'public', req.path + '.html');
    if (fs.existsSync(pollHtmlPath)) {
      return res.sendFile(pollHtmlPath);
    }

    // Then check root directory
    const htmlPath = path.join(__dirname, req.path + '.html');
    if (fs.existsSync(htmlPath)) {
      return res.sendFile(htmlPath);
    }
  }

  next();
});

// Serve static files (root first for full style.css, then poll-app for poll-specific overrides)
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "poll-app", "public")));

// Initialize poll database
const db = new Database(path.join(__dirname, "polls.db"));
db.pragma("journal_mode = WAL");

// Create poll tables
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

// ===== POLL HELPERS =====
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

// ===== POLL API ROUTES =====

app.get('/api/polls', (req, res) => {
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

app.post('/api/polls', (req, res) => {
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
      timer_minutes = 0,
      invite_emails = []
    } = req.body;

    const pollId = randomUUID();
    const adminToken = randomBytes(16).toString('hex');

    let timerEnd = null;
    if (timer_minutes > 0) {
      const endTime = new Date(Date.now() + timer_minutes * 60000);
      timerEnd = endTime.toISOString();
    }

    db.prepare(`
      INSERT INTO polls (id, admin_token, title, description, duration, expected, open_access, date1, date2, date3, timer_end)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(pollId, adminToken, title, description, duration, expected, open_access, date1, date2, date3, timerEnd);

    if (!open_access && invite_emails.length > 0) {
      const insertInvite = db.prepare('INSERT INTO invites (poll_id, email) VALUES (?, ?)');
      invite_emails.forEach(email => {
        insertInvite.run(pollId, email.toLowerCase().trim());
      });
    }

    res.status(201).json({
      id: pollId,
      admin_token: adminToken,
      vote_url: `/poll-vote.html?token=${pollId}`,
      admin_url: `/poll.html?admin=${adminToken}`
    });
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/polls/:adminToken/detail', (req, res) => {
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

app.delete('/api/polls/:id', (req, res) => {
  try {
    const { id } = req.params;

    db.prepare('DELETE FROM polls WHERE id = ?').run(id);

    res.json({ ok: true });
  } catch (error) {
    console.error('Error deleting poll:', error);
    res.status(500).json({ error: error.message });
  }
});

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
      timer_end: poll.timer_end,
      counts,
      votes_preview: votesPreviews
    });
  } catch (error) {
    console.error('Error fetching poll:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/vote/:pollId', (req, res) => {
  try {
    const { pollId } = req.params;
    const { voter_name, choice, alt_date, voter_token } = req.body;

    const poll = db.prepare('SELECT id FROM polls WHERE id = ?').get(pollId);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    db.prepare(`
      INSERT INTO votes (poll_id, voter_name, choice, alt_date, voter_token)
      VALUES (?, ?, ?, ?, ?)
    `).run(pollId, voter_name, choice, alt_date || null, voter_token);

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

// ===== EVENT API ROUTES =====
async function fetchTicketmasterEvents(keyword) {
  try {
    const apiKey = process.env.TICKETMASTER_API_KEY;
    if (!apiKey || apiKey === "your_ticketmaster_api_key_here") return null;

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?q=${encodeURIComponent(keyword)}&city=berlin&size=2&apikey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) return null;

    const data = await response.json();

    if (data._embedded && data._embedded.events && data._embedded.events.length > 0) {
      return data._embedded.events.slice(0, 2).map((event) => ({
        title: event.name,
        description: event.description || `Event related to ${keyword} in Berlin`,
        url: event.url,
        image: event.images?.[0]?.url || "",
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        source: "Ticketmaster"
      }));
    }
    return null;
  } catch (error) {
    console.log(`Ticketmaster error for "${keyword}":`, error.message);
    return null;
  }
}

async function fetchMeetupEvents(keyword) {
  try {
    const apiKey = process.env.MEETUP_API_KEY;
    if (!apiKey || apiKey === "your_meetup_api_key_here") return null;

    // Meetup GraphQL API
    const query = `
      query {
        eventsByTopic(topic: "${keyword}", first: 2, lat: 52.52, lon: 13.405) {
          edges {
            node {
              id
              title
              description
              eventUrl
              dateTime
              endTime
            }
          }
        }
      }
    `;

    const response = await fetch("https://api.meetup.com/gql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) return null;

    const data = await response.json();

    if (data.data?.eventsByTopic?.edges && data.data.eventsByTopic.edges.length > 0) {
      return data.data.eventsByTopic.edges.slice(0, 2).map((edge) => ({
        title: edge.node.title,
        description: edge.node.description || `Meetup event related to ${keyword}`,
        url: edge.node.eventUrl,
        image: "",
        start: edge.node.dateTime || new Date().toISOString(),
        end: edge.node.endTime || new Date().toISOString(),
        source: "Meetup"
      }));
    }
    return null;
  } catch (error) {
    console.log(`Meetup error for "${keyword}":`, error.message);
    return null;
  }
}

async function fetchEventimEvents(keyword) {
  try {
    const apiKey = process.env.EVENTIM_API_KEY;
    if (!apiKey || apiKey === "your_eventim_api_key_here") return null;

    // Eventim API endpoint for event search
    const url = `https://api.eventim.com/search?q=${encodeURIComponent(keyword + " berlin")}&limit=2&apikey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) return null;

    const data = await response.json();

    if (data.events && Array.isArray(data.events) && data.events.length > 0) {
      return data.events.slice(0, 2).map((event) => ({
        title: event.title || event.name,
        description: event.description || `Event related to ${keyword} in Berlin`,
        url: event.url || event.link || `https://www.eventim.de/search?q=${encodeURIComponent(keyword)}`,
        image: event.image || event.imageUrl || "",
        start: event.dateTime || event.date || new Date().toISOString(),
        end: event.endTime || new Date().toISOString(),
        source: "Eventim"
      }));
    }
    return null;
  } catch (error) {
    console.log(`Eventim error for "${keyword}":`, error.message);
    return null;
  }
}

async function fetchGoogleEvents(keyword) {
  let browser;
  try {
    console.log(`[Google] Launching browser for "${keyword}"...`);

    browser = await chromium.launch({
      headless: true,
      args: ["--disable-blink-features=AutomationControlled"]
    });

    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    });
    const page = await context.newPage();

    const searchQuery = `${keyword} berlin events`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&hl=en&gl=de`;

    console.log(`[Google] Navigating to: ${googleUrl}`);
    await page.goto(googleUrl, { waitUntil: "domcontentloaded", timeout: 15000 });

    // Wait for search results to load
    console.log(`[Google] Waiting for results...`);
    await page.waitForSelector('div[data-sokoban-container], h3', { timeout: 10000 }).catch(() => {
      console.log(`[Google] Selector timeout - proceeding anyway`);
    });

    // Debug: Check page content
    const pageContent = await page.content();
    const hasResults = pageContent.includes('href') && pageContent.includes('http');
    const contentLength = pageContent.length;
    console.log(`[Google] Page loaded: ${contentLength} bytes, has links: ${hasResults}`);

    // Extract search results - simpler approach: get all links with titles
    console.log(`[Google] Evaluating page...`);
    const evaluationResult = await page.evaluate(() => {
      const items = [];
      const seen = new Set();

      // Get all links on the page
      document.querySelectorAll("a[href]").forEach((link) => {
        let url = link.getAttribute("href");
        const title = link.textContent.trim();

        if (!url || !title || title.length < 5) return;

        // Extract real URL from Google redirect
        if (url.includes("/url?q=")) {
          const match = url.match(/\/url\?q=([^&]+)/);
          if (match) {
            try {
              url = decodeURIComponent(match[1]);
            } catch (e) {
              return; // Skip if decode fails
            }
          }
        }

        // Only include valid HTTP/HTTPS URLs that aren't Google's own, and no duplicates
        if (url.startsWith("http") && !url.includes("google.com") && !url.includes("youtube.com") && !seen.has(url)) {
          items.push({ title, url });
          seen.add(url);
        }
      });

      return { items: items.slice(0, 2), totalLinks: document.querySelectorAll("a[href]").length, resultsFound: items.length };
    });

    console.log(`[Google] Total links on page: ${evaluationResult.totalLinks}, Qualified results: ${evaluationResult.resultsFound}`);

    if (evaluationResult.items.length > 0) {
      console.log(`[Google] ✅ Found ${evaluationResult.items.length} results`);
      return evaluationResult.items.map((item) => ({
        title: item.title,
        description: `Event related to ${keyword} in Berlin`,
        url: item.url,
        image: "",
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        source: "Google Search"
      }));
    }

    return null;

  } catch (error) {
    console.log(`[Google] Error for "${keyword}":`, error.message);
    return null;
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        // Ignore close errors
      }
    }
  }
}

app.get("/api/events", async (req, res) => {
  try {
    const keyword = req.query.keyword || "Berlin";

    // Try Google Search first (flexible web search)
    console.log(`\n🔍 Searching for "${keyword}"...`);
    console.log(`1️⃣  Trying Google Search...`);
    let events = await fetchGoogleEvents(keyword);
    if (events && events.length > 0) {
      console.log(`✅ Found ${events.length} Google Search results for "${keyword}"`);
      return res.json(events);
    }

    // Fallback to Ticketmaster (for concerts, theatre, sports)
    console.log(`2️⃣  Trying Ticketmaster...`);
    events = await fetchTicketmasterEvents(keyword);
    if (events && events.length > 0) {
      console.log(`✅ Found ${events.length} Ticketmaster results for "${keyword}"`);
      return res.json(events);
    }

    // Fallback to Eventim
    console.log(`3️⃣  Trying Eventim...`);
    events = await fetchEventimEvents(keyword);
    if (events && events.length > 0) {
      console.log(`✅ Found ${events.length} Eventim results for "${keyword}"`);
      return res.json(events);
    }

    // No results from any source
    console.log(`❌ No events found for "${keyword}"`);
    res.json([]);

  } catch (error) {
    console.error("🚨 API Error:", error.message);
    res.status(500).json({
      error: "Failed to fetch events",
      details: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("✅ [2026-06-10-cbc05ef] Server running on http://localhost:3000");
  console.log("Polling feature available at http://localhost:3000/poll.html");
});