# CLAUDE.md

This file provides guidance to Claude Code when working with this Astro + Svelte 5 project.

## Project Overview

**PSD (Polyamorous Speed Dating)** is a full-stack web application for organizing dating events. Features include:
- Event discovery (from Google, Ticketmaster, Meetup, Eventim)
- Scheduling polls (Doodle-like functionality) with real-time countdown timers
- Admin dashboards for managing participants
- Responsive UI with Svelte 5 components

## Tech Stack

- **Framework**: Astro with Node.js adapter (`@astrojs/node`)
- **UI Components**: Svelte 5 (with TypeScript, strict mode)
- **Database**: SQLite with WAL mode (`better-sqlite3`)
- **Styling**: CSS with custom properties (CSS variables)
- **Build Tool**: Astro (file-based routing, server-side rendering)
- **API**: Astro API routes (`/api/*`)
- **Static Assets**: Playwright for event scraping, Sharp for image generation

## Running the Application

### Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Or build and run production server
npm run build
npm start
```

### Build & Deploy

```bash
# Build for production (creates dist/ directory)
npm run build

# Run production server
node ./dist/server.mjs

# Preview built app locally
npm run preview
```

## Project Structure

```
src/
├── pages/                       # File-based routes (Astro pages + API routes)
│   ├── index.astro             # GET /
│   ├── poll.astro              # GET /poll (admin poll creation)
│   ├── poll-vote.astro         # GET /poll-vote (voter interface)
│   ├── dashboard.astro         # GET /dashboard
│   ├── apply.astro             # GET /apply
│   ├── calendar.astro          # GET /calendar
│   ├── dates.astro             # GET /dates
│   ├── contact.astro           # GET /contact
│   └── api/                     # API routes
│       ├── polls/
│       │   ├── index.ts        # POST /api/polls, GET /api/polls
│       │   ├── [id].ts         # DELETE /api/polls/:id
│       │   └── [adminToken]/
│       │       └── detail.ts   # GET /api/polls/:adminToken/detail
│       ├── vote/
│       │   └── [pollId].ts     # POST /api/vote/:pollId, GET /api/vote/:pollId
│       ├── events.ts           # GET /api/events?keyword=<search>
│       └── countdown.ts        # GET /api/countdown?deadline=<ISO8601>
│
├── layouts/
│   └── Layout.astro            # Base shell (header, footer, styles)
│
├── components/
│   ├── Header.svelte           # Navigation (client:load)
│   ├── Footer.svelte           # Footer
│   ├── PollForm.svelte         # Poll creation form (client:load)
│   ├── VoteInterface.svelte    # Full voting UI (client:load)
│   └── [other components]
│
├── styles/
│   ├── brand-tokens.css        # CSS custom properties (--psd-*)
│   └── global.css              # Global styles & utilities
│
├── lib/
│   ├── db.ts                   # Database initialization & helpers
│   ├── types.ts                # TypeScript interfaces
│   └── events.ts               # Event scraping functions (TODO)
│
├── data/
│   └── [YAML data files]       # Extracted content (optional)
│
└── public/                      # Static assets (auto-served)
    └── images/

astro.config.mjs                # Astro configuration
tsconfig.json                   # TypeScript strict mode
package.json                    # Dependencies & scripts
```

## Key URLs & Routes

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/pages/index.astro` | Landing page |
| `/poll` | `src/pages/poll.astro` | Admin: create & manage polls |
| `/poll-vote` | `src/pages/poll-vote.astro` | Voter: vote on poll dates |
| `/dashboard` | `src/pages/dashboard.astro` | Admin dashboard |
| `/apply` | `src/pages/apply.astro` | Application form |
| `/calendar` | `src/pages/calendar.astro` | Calendar view |
| `/dates` | `src/pages/dates.astro` | Event dates organization |
| `/contact` | `src/pages/contact.astro` | Contact page |

## API Routes

All API routes are in `src/pages/api/` and automatically mounted at `/api/*`.

### Polls API

```
POST   /api/polls                      # Create poll
GET    /api/polls                      # List polls
GET    /api/polls/:adminToken/detail   # Get poll details (admin)
DELETE /api/polls/:id                  # Delete poll
```

**POST /api/polls** Payload:
```json
{
  "title": "string",
  "description": "string",
  "duration": "string",
  "expected": "number",
  "open_access": "boolean",
  "date1": "ISO8601",
  "date2": "ISO8601",
  "date3": "ISO8601",
  "timer_minutes": "number (optional)",
  "invite_emails": ["email@example.com"]
}
```

### Voting API

```
GET  /api/vote/:pollId      # Fetch poll (with counts & previews)
POST /api/vote/:pollId      # Submit vote(s)
```

**POST /api/vote/:pollId** Payload:
```json
{
  "voter_name": "string",
  "choice": "date1|date2|date3|none",
  "voter_token": "string",
  "alt_date": "string (optional)"
}
```

Multi-select support: POST multiple times for multiple dates, or send "none" to override.

### Events API

```
GET /api/events?keyword=<search>     # Search for events in Berlin
```

Returns array of Event objects (Google, Ticketmaster, Eventim fallback chain).

### Countdown Image Generator

```
GET /api/countdown?deadline=<ISO8601>   # Generate PNG countdown image
```

Returns PNG image showing time remaining. For email embeds:
```html
<img src="https://poly-speed-dating.onrender.com/countdown?deadline=2026-06-11T15:00:00Z">
```

## Database Schema

SQLite database (`polls.db`) with WAL journaling:

```sql
polls (
  id TEXT PRIMARY KEY,
  admin_token TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  expected INTEGER DEFAULT 0,
  open_access INTEGER DEFAULT 1,
  date1 TEXT NOT NULL,
  date2 TEXT NOT NULL,
  date3 TEXT NOT NULL,
  timer_end TEXT,           -- ISO8601 timestamp (when countdown expires)
  created_at TEXT DEFAULT (datetime('now'))
);

invites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  poll_id TEXT REFERENCES polls(id) ON DELETE CASCADE,
  email TEXT
);

votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  poll_id TEXT REFERENCES polls(id) ON DELETE CASCADE,
  voter_name TEXT NOT NULL,
  choice TEXT NOT NULL,     -- 'date1', 'date2', 'date3', or 'none'
  alt_date TEXT,
  voter_token TEXT,
  submitted_at TEXT DEFAULT (datetime('now')),
  UNIQUE(poll_id, voter_token)
);
```

## Component Hydration Strategy

Svelte components use Astro hydration directives:

- **`client:load`** — Immediately interactive (forms, navigation)
  - `<Header />` (client:load)
  - `<PollForm />` (client:load)
  - `<VoteInterface />` (client:load)

- **`client:visible`** — Hydrate when scrolled into view (galleries, results)
  - Use sparingly for heavier components

- **No directive** — Render as static HTML (headers, footers, cards)
  - `<Footer />` (static)
  - Layout shells

## Styling System

### Brand Tokens (`src/styles/brand-tokens.css`)

All colors, spacing, typography defined as CSS custom properties:

```css
/* Colors */
--psd-blue: #009fe3;
--psd-magenta: #e50051;
--psd-gold: #fcbf00;
--psd-purple: #340c46;

/* Semantic */
--psd-primary: var(--psd-blue);
--psd-accent: var(--psd-gold);
--psd-bg: #ffffff;
--psd-text: #2b004d;

/* Spacing (scale: 4px unit) */
--psd-spacing-2: 0.5rem;
--psd-spacing-4: 1rem;
--psd-spacing-6: 1.5rem;
--psd-spacing-8: 2rem;

/* Typography */
--psd-font-sans: Inter, -apple-system, ...;
--psd-text-base: 1rem;
--psd-text-lg: 1.125rem;
--psd-font-weight-bold: 700;

/* Border Radius */
--psd-radius-md: 0.5rem;
--psd-radius-xl: 1rem;
--psd-radius-2xl: 1.5rem;

/* Shadows */
--psd-shadow-md: 0 4px 6px -1px rgba(...);
--psd-shadow-lg: 0 10px 15px -3px rgba(...);
```

### Component Styles

Svelte components use scoped `<style>` blocks (auto-scoped by Svelte):

```svelte
<style>
  .button {
    background: var(--psd-primary);
    padding: var(--psd-spacing-4) var(--psd-spacing-6);
    border-radius: var(--psd-radius-md);
    transition: all var(--psd-transition-base);
  }

  .button:hover {
    background: var(--psd-primary-dark);
    transform: translateY(-2px);
  }
</style>
```

## Development Tips

### Adding a New Page

1. Create `src/pages/my-page.astro`
2. Import Layout: `import Layout from '@/layouts/Layout.astro'`
3. Wrap content in `<Layout>` component
4. Auto-mounted at `/my-page`

### Adding a New API Route

1. Create `src/pages/api/my-route.ts`
2. Export `APIRoute` functions: `export const GET: APIRoute` or `export const POST: APIRoute`
3. Return `new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })`
4. Auto-mounted at `/api/my-route`

### Creating a Svelte Component

```svelte
<script lang="ts">
  interface Props {
    title: string;
    disabled?: boolean;
  }

  let { title, disabled = false }: Props = $props();
</script>

<button {disabled}>{title}</button>

<style>
  button {
    padding: var(--psd-spacing-4);
    background: var(--psd-primary);
  }
</style>
```

Import and use with hydration:
```astro
import MyButton from '@/components/MyButton.svelte';

<MyButton client:load title="Click me" />
```

### Database Operations

```ts
import { initDb, getDb } from '@/lib/db';

// In API routes (server-side only)
const db = getDb();

// Prepared statements
const polls = db.prepare('SELECT * FROM polls WHERE id = ?').all(pollId);
db.prepare('INSERT INTO polls (...) VALUES (...)').run(...);

// Always use parameterized queries
```

### Environment Variables

Create `.env` file with:
```
TICKETMASTER_API_KEY=your_key
MEETUP_API_KEY=your_key
EVENTIM_API_KEY=your_key
LUMA_API_KEY=your_key
GOOGLE_API_KEY=your_key
OPENAI_API_KEY=your_key
```

Load in API routes with `process.env.TICKETMASTER_API_KEY`.

## What Changed From Express.js

| Old (Express) | New (Astro) |
|---------------|-------------|
| `server.js` with routes | `src/pages/` with file-based routing |
| HTML templates | Layout.astro + components |
| Vanilla JS | Svelte 5 components |
| Manual static serving | Astro public/ + CSS tokens |
| `app.get('/api/...')` | `src/pages/api/route.ts` |
| Build step required | No build step for dev; `npm run build` for production |

### Preserved

✅ SQLite database (same schema, same queries)  
✅ All API endpoints (`/api/polls`, `/api/vote`, `/api/events`, `/api/countdown`)  
✅ Event scraping (Playwright) — moved to `src/lib/events.ts`  
✅ Countdown timer feature  
✅ All routes and URLs (same paths)  

### To Complete

⏳ **Event scraping functions** — migrate `fetchGoogleEvents()`, `fetchTicketmasterEvents()`, etc. from original `server.js` to `src/lib/events.ts`  
⏳ **Dashboard page** — implement admin dashboard component  
⏳ **Apply form** — implement application form component  
⏳ **Secondary pages** — populate calendar.astro, dates.astro, contact.astro  

## TypeScript

Strict mode enforced in `tsconfig.json`:
- `strictNullChecks: true`
- `strict: true` (from Astro preset)

All components and API routes must be typed. Use `@/lib/types.ts` for shared types.

## Deployment

### On Render (as Web Service)

1. Build: `npm run build` → creates `dist/` with compiled app
2. Start: `node ./dist/server.mjs` (configured in `start` script)
3. Render runs `npm install` (with dependencies) then `npm start`

### Local Production Preview

```bash
npm run build
npm run preview
# Opens http://localhost:3000
```

## Notes for Future Work

- **Event scraping**: Migrate Playwright functions from `server.js` to `src/lib/events.ts` and call from `/api/events`
- **Dashboard**: Create rich admin dashboard component with filtering, export
- **Forms**: Add validation library (optional)
- **Testing**: No tests yet; add vitest or playwright tests as needed
- **Database migrations**: Still using auto-create on startup; consider migration system for scale

