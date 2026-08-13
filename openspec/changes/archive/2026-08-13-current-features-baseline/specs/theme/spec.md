## Purpose

Allows users to switch between light and dark color schemes, with the preference persisted across sessions.

## ADDED Requirements

### Requirement: Light and dark mode toggle
The system SHALL provide a toggle in the header that switches between light and dark mode. The selected theme SHALL persist across page reloads.

#### Scenario: Toggle switches theme
- **WHEN** user clicks the theme toggle
- **THEN** the UI switches between light and dark mode immediately

#### Scenario: Theme persists on reload
- **WHEN** user selects a theme and reloads the page
- **THEN** the previously selected theme is applied on load
