## Why

VoteCart sells Russian and Asian imported goods, and a significant portion of the target users are Russian speakers. With the UI and content available only in English, these users cannot engage with the platform effectively. Adding English + Russian support will improve accessibility and user engagement.

## What Changes

- **BREAKING**: `sections` and `options` DB tables get two new Json columns: `name_i18n` and `desc_i18n`
- `poll-data.ts` updated — every section and option gets `en` and `ru` translations
- `prisma/seed.ts` updated — populates the new JSON columns
- `GET /api/poll` accepts a `?lang=` query param (default: `en`)
- Server resolves and returns translated strings — client receives plain strings, no translation logic on the client
- Static `locales/en.ts` and `locales/ru.ts` files for UI strings
- `LanguageContext` + `useT()` hook for UI string translation
- Language toggle (🇬🇧 EN / 🇷🇺 RU) added to the header
- Language preference persisted in `localStorage`

## Capabilities

### New Capabilities

- `multi-language`: Language selection toggle, UI string translation via static locale files, DB-backed content translation via JSON columns, language preference persistence

### Modified Capabilities

- `poll-data`: Section and option content is now language-aware — `name_i18n` and `desc_i18n` JSON columns store translations, resolved server-side via `?lang=` param
- `ui-controls`: Search now filters against translated content of the active language

## Impact

- **Database**: 2 new Json columns on `sections` and `options` tables — migration required, `db:seed` must be re-run
- **API**: `GET /api/poll` gains `?lang=ru` param support
- **poll-service.ts**: `computeResults()` accepts a lang param and resolves translated content
- **poll-data.ts**: All sections and options include `name_en`, `name_ru`, `desc_en`, `desc_ru` fields
- **New files**: `src/locales/en.ts`, `src/locales/ru.ts`, `src/lib/i18n.ts`, `src/components/poll/language-toggle.tsx`
- **Updated components**: `poll-header`, `poll-toolbar`, `floating-vote-bar`, `section-card`, `option-row`, `add-option-input`, `hero-stats`, `poll-app`, `providers`
