## 1. Database Schema & Guest Tracking

- [x] 1.1 Add `createdById` field and index to Option model in `prisma/schema.prisma` and update database schema.
- [x] 1.2 Implement guest token utility to manage persistent creator identification across browser sessions.

## 2. Translation Service & API Endpoints

- [x] 2.1 Implement `src/lib/translate.ts` with Cyrillic detection and LibreTranslate integration with fallback.
- [x] 2.2 Update `src/lib/poll-service.ts` and `src/app/api/poll/option/route.ts` to support auto-translated title, description, and creator attribution.
- [x] 2.3 Add edit (PUT) and delete (DELETE) endpoints in `/api/poll/option` verifying creator authorization.

## 3. Suggest Product Modal & Smart Hybrid Media UI

- [x] 3.1 Build `src/components/poll/suggest-product-modal.tsx` with title, rich description, emoji selector, and smart hybrid image upload (in-browser WebP compression / direct URL with live preview).
- [x] 3.2 Add all necessary localization keys to `src/locales/en.ts` and `src/locales/ru.ts`.

## 4. Header Button & Section Progressive Scroll

- [x] 4.1 Update `src/components/poll/section-card.tsx` to integrate the responsive "+ Suggest Product" header button.
- [x] 4.2 Replace the "Show more / Show less" button in `SectionCard` with YouTube-style progressive chunk loading and skeleton card placeholders on scroll.
- [x] 4.3 Update `src/components/poll/option-row.tsx` to render Edit/Delete action buttons for items created by current guest.
- [x] 4.4 Wire modal state, submission, auto-selection, edit dialog, and deletion in `src/components/poll/poll-app.tsx`.

## 5. Verification & Testing

- [x] 5.1 Test product creation with both file upload (WebP compression) and direct image URL on mobile and desktop viewports.
- [x] 5.2 Validate bidirectional Russian ↔ English translation and verify dynamic switching in UI.
- [x] 5.3 Test YouTube-style progressive scrolling and skeleton transitions on long category sections.
- [x] 5.4 Test creator CRUD actions (updating title/image, deleting option, and auto-selection).
