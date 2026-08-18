## Context

See `proposal.md` for motivation and requirements. The application is built on Next.js App Router, Prisma ORM (PostgreSQL), Tailwind CSS v4, Framer Motion, and TanStack React Query. The poll currently renders categories (sections) and items (options) with real-time voting.

## Goals / Non-Goals

**Goals:**
- Provide a clean, modern header button `+ Suggest Product` on every section card with mobile-responsive collapse.
- Provide a feature-rich modal for product title, description, smart hybrid image input (URL paste / WebP compressed file upload with live preview), and emoji.
- Implement bidirectional auto-translation (Russian ↔ English) using LibreTranslate with automatic Cyrillic detection and offline/error fallback.
- Persist creator identity using a persistent guest token (`poll_guest_id`) to enable creator CRUD (editing and deleting their suggestions).
- Replace manual "Show more / Show less" button with a modern YouTube-style progressive chunk loader and skeleton animations on scroll.
- Instantly reflect new/updated products on the UI with automatic selection for voting.

**Non-Goals:**
- Full OAuth account requirement for voting or suggesting (must remain zero-friction guest-friendly).
- Editing or deleting standard seeded options (only custom user-created options can be edited/deleted by their creator).

## Decisions

### 1. Section Header Action Button
- **Decision**: Place a button inside the `SectionCard` header container next to the title and count badge.
- **Rationale**: Elevates product suggestion to a primary action rather than an easily missed footer link.
- **Alternatives considered**: Floating action button (too detached from category context).

### 2. Suggestion Dialog & Smart Hybrid Media Handling
- **Decision**: Build a dedicated `SuggestProductModal` dialog with dual-mode image input:
  - Direct Image URL input with instantaneous image preview.
  - File Upload input that compresses local device images in-browser to crisp, lightweight WebP (max 400x400, ~25-40KB) via HTML5 Canvas before submission.
- **Rationale**: Ultra-fast image loading, zero server storage bloat, zero risk of ephemeral file deletion on serverless platforms.

### 3. YouTube-Style Progressive Chunk Loading
- **Decision**: Implement `IntersectionObserver` / sentinel trigger at the bottom of the section list to reveal products in batches (e.g. 4-8 items per chunk) with fluid skeleton placeholders during expansion.
- **Rationale**: Eliminates jarring layout shifts from manual button clicks and delivers a modern, app-like infinite browsing feel.

### 4. Bi-directional Translation Architecture
- **Decision**: Create `src/lib/translate.ts` service with automatic language detection:
  - If input contains Cyrillic characters (`/[\u0400-\u04FF]/`), target is English (`en`).
  - Otherwise, target is Russian (`ru`).
  - Translate using LibreTranslate API endpoint with robust fallback to retain original text if external service is unreachable.
- **Rationale**: Guarantees seamless bilingual display (`name_i18n` and `desc_i18n`) for all community-added items without requiring the user to type in multiple languages.

### 5. Creator Ownership & CRUD
- **Decision**: Issue a persistent UUID `poll_guest_id` in cookies / local storage. Store `createdById` on `Option` in Prisma schema.
- **Endpoints**:
  - `POST /api/poll/option`: Create option with auto-translation and `createdById`.
  - `PUT /api/poll/option`: Update option (title, description, imageUrl, emoji) if `createdById` matches.
  - `DELETE /api/poll/option`: Delete option if `createdById` matches.
- **Rationale**: Empowers creators to refine or remove their suggestions while preventing unauthorized tampering.

## Risks / Trade-offs

- **[Risk] LibreTranslate service rate limits or temporary downtime** → **Mitigation**: Implement graceful fallback where the translated version defaults to the original text and logs a warning rather than failing the submission.
- **[Risk] Heavy rendering on very large lists** → **Mitigation**: Progressive chunk rendering keeps initial DOM lightweight and performance 60fps smooth.
