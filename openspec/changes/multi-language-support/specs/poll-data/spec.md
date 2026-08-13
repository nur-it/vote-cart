## MODIFIED Requirements

### Requirement: Section and option structure
The system SHALL organize voting options into sections. Each section SHALL have a name, description, icon, color, and ordered list of options. Each option SHALL have a name, emoji, description, slug, and vote count. Section and option names and descriptions SHALL be stored as JSON columns (`name_i18n`, `desc_i18n`) supporting multiple locales. The API SHALL resolve and return the correct locale string based on the requested language.

#### Scenario: Poll data loaded
- **WHEN** client requests GET /api/poll
- **THEN** system returns all sections with their options, vote counts, and percentages with names and descriptions resolved in English (default)

#### Scenario: Poll data loaded in Russian
- **WHEN** client requests GET /api/poll?lang=ru
- **THEN** system returns all sections and options with names and descriptions resolved in Russian

### Requirement: Manual seed script
The system SHALL provide a `npm run db:seed` command that clears all existing data (votes, options, sections) and re-inserts the seed data from `poll-data.ts`, including all language translations in the `name_i18n` and `desc_i18n` JSON columns.

#### Scenario: Seed script run
- **WHEN** developer runs `npm run db:seed`
- **THEN** all existing votes, options, and sections are deleted and fresh seed data is inserted with both English and Russian translations populated
