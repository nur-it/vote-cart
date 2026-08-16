## Why

Currently, every GET request to `/api/poll` triggers a sequential database loop updating all 18 options in `ensureSeeded()`, causing severe 2-3 second latency on page refresh. Furthermore, seed data currently points to external Unsplash URLs instead of the pre-packaged local assets located in `public/categories/`. 

This change optimizes poll query performance to sub-100ms by removing runtime backfill loops and maps all seed options to reliable, Vercel-CDN-backed local image paths (`/categories/*.png`).

## What Changes

- **Local Image Paths**: Update `SEED_SECTIONS` in `src/lib/poll-data.ts` to point to `/categories/<image-name>.png` for all 18 options.
- **Poll API Performance Optimization**: Remove the per-request 18-query sequential `updateMany` loop from `ensureSeeded()` in `src/lib/poll-service.ts`.
- **Streamlined Seeding**: Ensure `ensureSeeded()` only runs a fast single-query check (`db.section.count()`) when the database is empty, and keep data migrations/backfills in dedicated seed/sync scripts.
- **Database Backfill / Re-seed**: Update existing database records so all option `imageUrl` fields point to local category image paths.

## Capabilities

### Modified Capabilities
- `poll-data`: Update requirement for image source handling to reference static local assets (`/categories/...`) and remove blocking multi-query runtime backfill loops during poll data retrieval.

## Impact

- **Affected Code**: `src/lib/poll-data.ts`, `src/lib/poll-service.ts`, `prisma/seed.ts`.
- **Database**: Option `imageUrl` records updated from external URLs to local `/categories/` paths.
- **Performance**: Poll fetch latency drops from ~2.5s-3.5s to sub-100ms on page refresh.
