## Context

See proposal.md for motivation. Current state: all section/option content is stored as plain `name` and `description` string columns. UI strings are hardcoded in components. No language switching exists.

## Goals / Non-Goals

**Goals:**
- EN + RU language support for UI strings and DB content
- Server-side content resolution — client receives plain strings
- Language preference persisted in localStorage
- Fallback to English when Russian translation is missing

**Non-Goals:**
- Runtime/API-based translation (no Google Translate or DeepL)
- Language support beyond EN and RU in this change
- Translation of user-submitted custom options

## Decisions

**1. JSON columns for content translation**
`name_i18n: Json` and `desc_i18n: Json` on both `sections` and `options` tables store `{ "en": "...", "ru": "..." }`. Chosen over separate translation table (too complex for 2 languages) and extra string columns (not scalable). Adding a 3rd language later requires only seed data changes, no schema migration.

**2. Server-side resolution**
`computeResults(lang)` resolves `name_i18n[lang] ?? name_i18n["en"]` before returning. Client receives plain `name` and `description` strings — no translation logic on the client side. This keeps the API contract unchanged for consumers.

**3. Static locale files for UI strings**
`src/locales/en.ts` and `src/locales/ru.ts` export typed string maps. A `useT()` hook reads the active language from `LanguageContext` and returns the correct string. Chosen over a library (next-intl is already installed but adds complexity for only 2 languages and ~45 strings).

**4. Language stored in localStorage**
`localStorage.setItem("lang", "ru")` persists the preference. On mount, `LanguageProvider` reads it and sets context. TanStack Query refetches `/api/poll?lang=ru` when language changes.

## Risks / Trade-offs

- **Custom options not translated** → User-typed text stays as-is. Russian users see English custom option names. Acceptable for now.
- **JSON column type safety** → Prisma returns `Json` as `unknown`. A small helper `resolveI18n(json, lang)` casts and resolves safely.
- **db:seed required after migration** → Existing rows will have `null` in new columns until re-seeded. Document clearly in migration steps.

## Migration Plan

1. Update `prisma/schema.prisma` — add `name_i18n` and `desc_i18n` Json columns to `Section` and `Option`
2. Run `npm run db:push` — applies schema to DB
3. Update `poll-data.ts` — add `name_en`, `name_ru`, `desc_en`, `desc_ru` to all 19 items
4. Update `prisma/seed.ts` — populate JSON columns
5. Run `npm run db:seed` — re-seeds with translations
6. Implement API, service, UI changes
