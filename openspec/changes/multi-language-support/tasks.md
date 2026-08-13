## 1. Database Schema

- [x] 1.1 Add `name_i18n` and `desc_i18n` Json columns to `Section` model in `prisma/schema.prisma`
- [x] 1.2 Add `name_i18n` and `desc_i18n` Json columns to `Option` model in `prisma/schema.prisma`
- [ ] 1.3 Run `npm run db:push` to apply schema changes

## 2. Seed Data

- [x] 2.1 Update `SeedSection` and `SeedOption` interfaces in `poll-data.ts` to include `name_en`, `name_ru`, `desc_en`, `desc_ru` fields
- [x] 2.2 Add English and Russian translations for the 1 section in `poll-data.ts`
- [x] 2.3 Add English and Russian translations for all 18 options in `poll-data.ts`
- [x] 2.4 Update `prisma/seed.ts` to populate `name_i18n` and `desc_i18n` JSON columns
- [ ] 2.5 Run `npm run db:seed` to re-seed with translations

## 3. API & Service

- [x] 3.1 Update `computeResults()` in `poll-service.ts` to accept `lang` param and resolve `name_i18n`/`desc_i18n`
- [x] 3.2 Add `resolveI18n(json, lang)` helper for safe JSON column resolution with English fallback
- [x] 3.3 Update `GET /api/poll` route to read `?lang=` query param and pass to `computeResults()`
- [x] 3.4 Update `ensureSeeded()` in `poll-service.ts` to populate `name_i18n` and `desc_i18n` on auto-seed

## 4. i18n Infrastructure

- [x] 4.1 Create `src/locales/en.ts` with all ~45 English UI strings
- [x] 4.2 Create `src/locales/ru.ts` with all ~45 Russian UI strings
- [x] 4.3 Create `src/lib/i18n.ts` — `LanguageContext`, `LanguageProvider`, `useT()` hook
- [x] 4.4 Create `src/components/poll/language-toggle.tsx` — EN/RU toggle button for header

## 5. UI Components

- [x] 5.1 Wrap app in `LanguageProvider` in `providers.tsx` and pass `lang` to poll query
- [x] 5.2 Update `poll-header.tsx` — add `LanguageToggle`, translate "LIVE" badge
- [x] 5.3 Update `poll-toolbar.tsx` — translate search placeholder, sort labels, "Live" toggle
- [x] 5.4 Update `floating-vote-bar.tsx` — translate all button labels and messages
- [x] 5.5 Update `section-card.tsx` — translate "votes", "Leading", "options", expand/collapse button
- [x] 5.6 Update `option-row.tsx` — translate "Picked", "Your pick", "Custom" badges and vote count
- [x] 5.7 Update `add-option-input.tsx` — translate all labels, placeholder, button text
- [x] 5.8 Update `hero-stats.tsx` — translate heading, "Voters", "Total Votes", "Categories", "Top pick"
- [x] 5.9 Update `poll-app.tsx` — translate banners, toasts, error state, empty state
