# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PSD Website** (Duck Dating Apps) is a full-stack Node.js application for coordinating relationship/dating events. It features:
- Static HTML pages for event information and registration (dashboard, dates, apply, connectors, etc.)
- Express.js backend with REST API routes
- Embedded poll system (Doodle-like) for scheduling coordination
- Dynamic countdown image generation for email embeds
- SQLite database for persistence

## Tech Stack

- **Runtime**: Node.js (ES modules)
- **Framework**: Astro 4.x with Svelte 5 integration
- **UI Framework**: Svelte 5 (for interactive components)
- **Database**: better-sqlite3 (SQLite with WAL mode)
- **Package Manager**: pnpm
- **TypeScript**: Strict mode throughout

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm run dev          # Start Astro dev server (http://localhost:3000)
pnpm run build        # Build for production
pnpm run preview      # Preview production build
```

### API & Database

The application uses Astro API routes for backend functionality:
- Poll management endpoints: `src/pages/api/polls/`
- Vote handling: `src/pages/api/vote/`
- Countdown image generation: `src/pages/api/countdown.ts`

Database operations use better-sqlite3 with WAL mode (see `src/lib/db.ts`)

## Project Structure

```
src/
├── pages/                           # File-based routing (one .astro per route)
│   ├── index.astro                 # Home (/)
│   ├── calendar.astro              # Calendar
│   ├── identity.astro              # Identity
│   ├── polyfest.astro              # Polyfest event
│   ├── faq.astro                   # FAQ
│   ├── merch.astro                 # Merchandise shop
│   ├── contact.astro               # Contact page
│   ├── apply.astro                 # Application form
│   ├── dashboard.astro             # Applicant dashboard
│   ├── dates.astro                 # Event coordination
│   ├── connectors.astro            # Connector management
│   ├── interests.astro             # User interests
│   ├── matches.astro               # Match results
│   ├── profile.astro               # User profile
│   ├── rounds.astro                # Event rounds
│   ├── organiser.astro             # Organizer tools
│   ├── order.astro                 # Merch ordering
│   ├── privacy.astro               # Privacy policy
│   ├── imprint.astro               # Legal imprint
│   ├── test-connectors.astro       # Testing page
│   ├── poll.astro                  # Poll creation/admin
│   ├── poll-vote.astro             # Poll voting
│   └── api/                        # API routes
│       ├── countdown.ts            # GET /api/countdown (countdown images)
│       ├── polls/
│       │   ├── index.ts            # GET/POST /api/polls
│       │   ├── [id].ts             # DELETE /api/polls/:id
│       │   └── [id]/detail.ts      # GET /api/polls/:id/detail
│       └── vote/
│           └── [pollId].ts         # GET/POST /api/vote/:pollId
│
├── layouts/
│   └── Layout.astro                # Shared page template
│
├── components/                      # Svelte components (interactive UI)
│   ├── Header.svelte               # Navigation header
│   ├── Footer.svelte               # Footer
│   └── [other components TBD]      # Interactive components as needed
│
├── data/                           # YAML data files (extracted content)
│   ├── config.yaml                 # Site configuration
│   ├── navigation.yaml             # Navigation structure
│   └── [other data files TBD]
│
├── styles/
│   └── brand-tokens.css            # CSS custom properties (--psd-* prefix)
│
├── lib/
│   ├── db.ts                       # Database initialization & helpers
│   └── [utility files TBD]
│
└── types/
    └── index.ts                    # Shared TypeScript types

public/
├── images/                         # Static images
├── style.css                       # Main stylesheet (legacy)
└── [other assets]                  # Fonts, etc.

polls.db                            # SQLite database (auto-created)
polls.db-shm                        # WAL mode shm file
polls.db-wal                        # WAL mode wal file
astro.config.mjs                    # Astro configuration
tsconfig.json                       # TypeScript strict mode config
package.json                        # pnpm dependencies & scripts
```

## Key Architecture Patterns

### 1. File-Based Routing

Astro uses file-based routing from `src/pages/`:
- `src/pages/index.astro` → `/`
- `src/pages/calendar.astro` → `/calendar`
- `src/pages/api/polls/index.ts` → `/api/polls`
- `src/pages/api/polls/[id].ts` → `/api/polls/:id`

Each page is an Astro component (`.astro`); interactive UI uses Svelte components (`.svelte`).

### 2. Hydration Strategy

Components use minimal, purposeful hydration:

```astro
<Header client:load />      <!-- Immediately interactive -->
<PollForm client:visible /> <!-- Interactive when visible -->
<Card />                    <!-- Static HTML only -->
```

No directive = rendered to HTML at build time (no JavaScript overhead).

### 3. CSS Architecture

- **Token System**: `src/styles/brand-tokens.css` defines all design values (`--psd-primary`, `--psd-fg`, `--psd-space-md`, etc.)
- **Component Styles**: Svelte components use scoped CSS; reference tokens via CSS custom properties
- **Global Styles**: `Layout.astro` includes global reset and token definitions
- **Legacy Support**: `public/style.css` preserved for existing styles; gradual migration to tokens

### 4. Database & API Routes

- **Database**: `src/lib/db.ts` exports `getDatabase()` and helper functions; initializes WAL mode
- **API Routes**: Astro API routes in `src/pages/api/` handle all backend logic
- **No Express**: Astro replaces Express for all routing; better-sqlite3 works directly

**Poll System**:
- **Tables**: `polls`, `invites`, `votes` (same schema as Express version)
- **Endpoints**: Migrated from Express routes to Astro API routes
  - `GET /api/polls` → `src/pages/api/polls/index.ts`
  - `POST /api/vote/:pollId` → `src/pages/api/vote/[pollId].ts`
  - etc.

### 5. Component Design

- **One Responsibility**: Each Svelte component does one thing well
- **Typed Props**: Use TypeScript interfaces for all component props
- **No Business Logic**: Components receive data via props; load data in `.astro` parents
- **Reusable**: Extract repeated markup into components (cards, forms, lists)

## Development Workflow

### Making Changes

1. **Pages**: Create `.astro` files in `src/pages/`; Astro dev server auto-reloads
2. **Components**: Create `.svelte` files in `src/components/`; hydration added per component
3. **Styles**: Update `src/styles/brand-tokens.css` for design changes; use CSS custom properties in component styles
4. **API Routes**: Add TypeScript files to `src/pages/api/`; endpoints are created automatically
5. **Data**: Extract hardcoded content to YAML in `src/data/` and load at build time

### Database Operations

The SQLite database uses WAL mode for better concurrency:
```typescript
const db = getDatabase(); // From src/lib/db.ts
db.pragma("journal_mode = WAL");
```

This creates `polls.db-shm` and `polls.db-wal` files—don't delete these; they're part of WAL mode.

**Migrations**: To modify the database schema, edit the `db.exec()` call in `src/lib/db.ts`. For existing databases, create a migration script or drop the database to recreate with new schema.

## Common Tasks

### Add a New Page

1. Create `src/pages/your-page.astro`
2. Import `Layout` from `src/layouts/Layout.astro`
3. Wrap content in `<Layout title="...">` component
4. Access at `/your-page` automatically

Example:
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="My Page">
  <h1>Welcome</h1>
</Layout>
```

### Add an Interactive Component

1. Create `src/components/MyComponent.svelte` with TypeScript props
2. In your `.astro` page, import and use with hydration directive:

```astro
---
import MyComponent from '../components/MyComponent.svelte';
---

<Layout title="...">
  <MyComponent client:load />
</Layout>
```

### Modify API Routes

All API routes are in `src/pages/api/`:
- File-based routing applies (e.g., `[id].ts` becomes `:id` in the URL)
- Use `APIRoute` type from `astro` for proper typing
- Import database helpers from `src/lib/db.ts`

Example GET route:
```typescript
import { getDatabase } from '../../lib/db';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const db = getDatabase();
  // ... handle request ...
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
};
```

## Known Issues & Quirks

1. **Legacy CSS**: `public/style.css` coexists with new token system; gradual migration to CSS variables recommended
2. **Admin Password**: `ADMIN_PASSWORD` env var is referenced but may not be fully integrated
3. **Poll Database**: Located at root level (`polls.db`); ensure write permissions
4. **Database Initialization**: Schema in `src/lib/db.ts` only applies on first run; migrations needed for schema changes

## Migration Notes from Express

The original Express server used:
- Static HTML files in the root directory (now moved to `src/pages/`)
- `server.js` with Express middleware (now replaced with Astro routing)
- `poll-app/` as a separate server (poll routes migrated to Astro API routes)

Express functionality preserved:
- Poll database operations (now in `src/lib/db.ts`)
- REST API endpoints (now in `src/pages/api/`)
- Countdown image generation (now in `src/pages/api/countdown.ts`)
- Static file serving (now handled by Astro's `public/` directory)

## Deployment Notes

- Build with `pnpm run build` to create production artifacts
- Server entry point: The built Astro site (static or with server-side rendering)
- PORT defaults to 3000; can be set via env var
- Ensure `polls.db` and WAL files (`polls.db-shm`, `polls.db-wal`) are writable
- DATABASE_PATH env var can override the default database location

## Testing the Application

```bash
# Development
pnpm run dev          # Starts on http://localhost:3000

# In another terminal, test key routes
curl http://localhost:3000/api/polls
curl http://localhost:3000/api/countdown?deadline=2026-06-11T15:00:00Z

# Manual testing
# - Visit http://localhost:3000 (home page)
# - Check http://localhost:3000/calendar, /identity, /polyfest
# - Try application form at http://localhost:3000/apply
# - Test poll at http://localhost:3000/poll
```

## References

- `PROJECT_AGENDA.md` — High-level project goals and feature priorities
- `CONNECTORS_HELP.md` — Documentation for connector functionality
