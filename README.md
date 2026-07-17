# VoteCart

A real-time ecommerce category voting platform. Users select the shopping categories they genuinely shop for, cast a single vote, and watch live percentages update as more people participate — just like a YouTube poll.

![VoteCart](public/logo.svg)

## Features

- **Real-time poll** — live vote percentages update instantly after each submission
- **100+ categories** across 10 sections (Apparel, Electronics, Food, Beauty, and more)
- **1 vote per person** — IP-based deduplication with cookie fallback
- **2-minute undo window** — change your mind right after voting, works across browsers
- **Community suggestions** — users can add their own category options (1 per user)
- **Section quick-jump** — sticky sidebar on desktop, horizontal pill row on mobile
- **Collapse/expand** — each section shows 4 options by default, expandable on demand
- **Search with auto-expand** — search instantly filters and expands matching sections
- **Skeleton loading** — layout-aware skeletons instead of a spinner
- **Light / dark mode** toggle

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animation | Framer Motion |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Server state | TanStack Query v5 |

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (Supabase recommended)

### 1. Clone and install

```bash
git clone <repo-url>
cd e-commerce-servery-landing
npm install
```

### 2. Configure environment

Create a `.env` file in the root:

```env
# Connection Pooler (used by the app)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true"

# Direct connection (used by Prisma migrations)
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
```

### 3. Push the schema and generate the client

```bash
npm run db:push
npm run db:generate
```

The database seeds itself automatically on first request — no separate seed script needed.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database Scripts

| Command | Description |
|---|---|
| `npm run db:push` | Push schema changes to the database |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:migrate` | Create and run a migration |
| `npm run db:reset` | Reset the database (destructive) |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── poll/
│   │       ├── route.ts          # GET poll data
│   │       ├── vote/
│   │       │   ├── route.ts      # POST cast vote
│   │       │   └── undo/
│   │       │       └── route.ts  # POST undo vote (2-min window)
│   │       ├── option/
│   │       │   └── route.ts      # POST add custom option
│   │       └── reset/
│   │           └── route.ts      # POST reset (disabled in prod)
│   └── page.tsx
├── components/
│   └── poll/
│       ├── poll-app.tsx          # Main app shell
│       ├── poll-header.tsx
│       ├── poll-toolbar.tsx
│       ├── poll-footer.tsx
│       ├── hero-stats.tsx
│       ├── section-card.tsx
│       ├── option-row.tsx
│       ├── floating-vote-bar.tsx
│       ├── section-jump-bar.tsx  # Desktop sidebar + mobile pills
│       └── add-option-input.tsx
├── lib/
│   ├── poll-service.ts           # DB queries (castVote, undoVote, etc.)
│   ├── poll-data.ts              # Seed data (10 sections × 10 options)
│   ├── types.ts
│   └── db.ts                     # Prisma client singleton
└── prisma/
    └── schema.prisma
```

## Vote Integrity

- Votes are deduplicated by **hashed IP address** (SHA-256) — raw IPs are never stored
- Cookie fallback handles cases where IP changes between requests
- The **2-minute undo window** is enforced server-side using `Vote.createdAt`, not just localStorage — so it works correctly even when switching browsers
- After the window expires, votes are permanent
