## Purpose

Defines the structure and lifecycle of poll content — sections, options, seeding, and user-contributed custom options.

## ADDED Requirements

### Requirement: Section and option structure
The system SHALL organize voting options into sections. Each section SHALL have a name, description, icon, color, and ordered list of options. Each option SHALL have a name, emoji, description, slug, and vote count.

#### Scenario: Poll data loaded
- **WHEN** client requests GET /api/poll
- **THEN** system returns all sections with their options, vote counts, and percentages

### Requirement: Auto-seed on first request
The system SHALL automatically seed sections and options on the first request if the database is empty. No manual seed step SHALL be required for the app to function.

#### Scenario: Empty database on first request
- **WHEN** GET /api/poll is called and no sections exist in the database
- **THEN** system seeds all sections and options before returning results

### Requirement: Manual seed script
The system SHALL provide a `npm run db:seed` command that clears all existing data (votes, options, sections) and re-inserts the seed data from `poll-data.ts`.

#### Scenario: Seed script run
- **WHEN** developer runs `npm run db:seed`
- **THEN** all existing votes, options, and sections are deleted and fresh seed data is inserted

### Requirement: Custom option suggestion
The system SHALL allow a user to suggest one custom option per section per user (tracked via localStorage). A suggested option SHALL be immediately visible to all users.

#### Scenario: New custom option added
- **WHEN** user submits a new option name for a section
- **THEN** system creates the option with `isCustom: true` and returns updated poll data

#### Scenario: Duplicate name returns existing option
- **WHEN** user submits a name that already exists in the section (case-insensitive)
- **THEN** system returns the existing option without creating a duplicate

#### Scenario: One suggestion per user enforced client-side
- **WHEN** user has already suggested a custom option (localStorage flag set)
- **THEN** UI hides the suggestion form and shows a confirmation message

#### Scenario: Custom option auto-selected after creation
- **WHEN** user adds a custom option before voting
- **THEN** the new option is automatically added to the user's current selection
