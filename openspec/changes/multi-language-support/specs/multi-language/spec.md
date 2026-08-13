## Purpose

Enables users to switch the UI and poll content between English and Russian, with language preference persisted across sessions and content served from the database in the selected language.

## ADDED Requirements

### Requirement: Language toggle in header
The system SHALL provide a language toggle in the header allowing users to switch between English (EN) and Russian (RU). The default language SHALL be English.

#### Scenario: Default language is English
- **WHEN** a user visits the app for the first time
- **THEN** the UI and content are displayed in English

#### Scenario: User switches to Russian
- **WHEN** user selects RU from the language toggle
- **THEN** all UI strings and poll content switch to Russian immediately

#### Scenario: Language preference persisted
- **WHEN** user selects a language and reloads the page
- **THEN** the previously selected language is applied on load

### Requirement: UI string translation
The system SHALL translate all static UI strings (buttons, labels, banners, toasts, placeholders, error messages) based on the active language.

#### Scenario: Russian UI strings shown
- **WHEN** active language is Russian
- **THEN** all buttons, labels, and messages are displayed in Russian

#### Scenario: English fallback
- **WHEN** a translation key is missing in the active language
- **THEN** the English string is shown as fallback

### Requirement: Server-side content translation
The system SHALL serve section names, section descriptions, option names, and option descriptions in the active language. The API SHALL accept a `lang` query parameter (`en` or `ru`). If the requested language translation is missing, the English value SHALL be returned as fallback.

#### Scenario: Russian content returned
- **WHEN** client requests GET /api/poll?lang=ru
- **THEN** section and option names and descriptions are returned in Russian

#### Scenario: Fallback to English on missing translation
- **WHEN** a section or option has no Russian translation
- **THEN** the English value is returned instead

#### Scenario: Default lang is English
- **WHEN** client requests GET /api/poll without a lang param
- **THEN** content is returned in English

### Requirement: Search works in active language
The system SHALL filter options based on the translated content of the active language.

#### Scenario: Search in Russian
- **WHEN** active language is Russian and user searches in Russian
- **THEN** options are filtered against their Russian names and descriptions
