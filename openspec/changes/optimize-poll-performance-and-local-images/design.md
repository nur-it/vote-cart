## Context

Currently, `ensureSeeded()` in `src/lib/poll-service.ts` is invoked on every `computeResults()` call (which powers `GET /api/poll`). When the database is already seeded, an `else` branch runs a loop executing `await db.option.updateMany` 18 sequential times to backfill `imageUrl`. On remote Postgres databases (Supabase/Neon), this introduces 2-3 seconds of network roundtrip latency.

Additionally, image assets are stored in `public/categories/*.png`, but `src/lib/poll-data.ts` and the database contain Unsplash URLs.

## Goals / Non-Goals

**Goals:**
- Eliminate the 18-query update loop from request-time execution in `src/lib/poll-service.ts`.
- Map all 18 options in `src/lib/poll-data.ts` to their corresponding static `/categories/*.png` URLs.
- Provide a safe database migration script or backfill query to update existing database records.
- Achieve sub-100ms response time for `GET /api/poll`.

**Non-Goals:**
- Uploading images to external cloud storage (S3/Cloudinary) - local `public/` files served through Vercel Edge CDN are optimal.
- Altering the Prisma schema or data types.

## Decisions

### 1. Fast Seeding Check
- **Decision**: In `ensureSeeded()`, only check `db.section.count() === 0`. If false, return immediately without any updates or loops.
- **Rationale**: Seed checks during user requests must be a single lightweight count query (or guarded by an in-memory boolean after warm-up).
- **Alternative considered**: Removing `ensureSeeded()` completely. Kept the count check for zero-config auto-seeding on fresh empty databases.

### 2. Static Asset Mapping
- **Decision**: Map all 18 option definitions in `src/lib/poll-data.ts` directly to `/categories/<file>.png`.
- **Rationale**: Next.js automatically bundles and distributes files in `public/` across Vercel Edge CDN with immutable cache headers.

### 3. One-time Migration Script / DB Sync
- **Decision**: Provide a one-time script (or sync step) using Prisma to update existing records in the database where `slug` matches the seed options.
- **Rationale**: Ensures existing votes and sections remain intact while updating the image paths.

## Risks / Trade-offs

- **[Risk] Existing user votes lost if full re-seed is run** → **Mitigation**: Use targeted `update` or `updateMany` by `slug` rather than clearing votes, preserving existing votes.
