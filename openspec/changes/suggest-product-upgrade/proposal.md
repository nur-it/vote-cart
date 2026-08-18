## Why

The current "Suggest a category" feature is located at the bottom of the section cards as a basic inline text input with limited functionality (text and optional image URL only). Users need a more visible, intuitive, and feature-rich way to suggest products directly from the category header, with support for product titles, rich descriptions, smart hybrid image upload (URL + client-compressed WebP file upload with instant preview), bi-directional English-Russian translations stored in the database, and creator-specific CRUD capabilities (editing and deleting their own suggestions). Additionally, the category product browsing experience needs to replace the manual "Show more/Show less" button with a smooth YouTube-style infinite scroll that loads products chunk-by-chunk with skeleton animations.

## What Changes

- **Header Quick-Action Button**: Add a responsive, prominent "+ Suggest Product" button to the top-right of section card headers, adapting smoothly for both mobile and desktop.
- **Rich Suggestion Modal**: Introduce a dedicated interactive modal supporting:
  - Product title input
  - Detailed product description
  - Smart Hybrid Image handling: direct image URL paste OR local file upload with instant in-browser WebP compression and live thumbnail preview
  - Optional emoji badge picker
- **Bilingual Translation Engine (EN ↔ RU)**:
  - Automatic language detection (Russian / English).
  - Integration with LibreTranslate / translation pipeline with fallback support.
  - Automatically translates entered title & description so both `en` and `ru` versions are saved into `name_i18n` and `desc_i18n` JSON columns.
- **Guest-Tracked CRUD Operations**:
  - Assign persistent guest token / cookie for voters/creators.
  - Record creator identity (`createdById`) on custom options.
  - Enable creators to edit (update title, description, image) or delete their own suggested products.
- **YouTube-Style Progressive Infinite Scroll**:
  - Remove manual "Show more / Show less" button.
  - Progressively render/load options in chunks (e.g. 4-8 items at a time) with smooth skeleton animations when scrolling near the bottom of a section or page.
- **Instant UI Feedback & Auto-Selection**:
  - Upon submission, the new product is dynamically injected into the active section view.
  - Auto-selects (checks) the newly suggested product in the voter's active selection.

## Capabilities

### New Capabilities
- `product-suggestion`: Covers the rich product suggestion modal dialog, header trigger buttons, smart hybrid image upload (URL + WebP compression), automatic bidirectional translation (EN ↔ RU), guest-based creator CRUD operations, and progressive YouTube-style chunk loading with skeletons.

### Modified Capabilities
- `poll-data`: Extends the Option data model and poll service API to store `createdById`, maintain rich translated text for `name_i18n` and `desc_i18n`, and support update/delete endpoints.

## Impact

- `prisma/schema.prisma`: Add `createdById` field and index to `Option` model.
- `src/lib/poll-service.ts` & `src/lib/types.ts`: Update option creation, translation resolution, update, and deletion helpers.
- `src/app/api/poll/option/`: Update POST handler to perform auto-translation and capture guest token, and add PUT/DELETE routes for creator editing/deletion.
- `src/components/poll/section-card.tsx`: Replace "Show more" with IntersectionObserver / YouTube-style progressive chunk loader with skeleton states, and add header "+ Suggest Product" button.
- `src/components/poll/suggest-product-modal.tsx`: New comprehensive suggestion dialog with file upload, WebP compression, and image URL preview.
- `src/locales/en.ts` & `src/locales/ru.ts`: Add localized strings for the new modal, translations, chunk loader, and CRUD actions.
