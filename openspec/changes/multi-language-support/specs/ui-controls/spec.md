## MODIFIED Requirements

### Requirement: Search with auto-expand
The system SHALL filter options in real time as the user types. Sections with matching options SHALL automatically expand. Sections with no matches SHALL be hidden. Search SHALL operate on the translated content of the currently active language.

#### Scenario: Search filters options
- **WHEN** user types in the search box
- **THEN** only options whose name, description, or section name (in the active language) matches are shown

#### Scenario: Matching sections auto-expand
- **WHEN** search returns results in a collapsed section
- **THEN** that section expands automatically to show matches

#### Scenario: No results state
- **WHEN** search query matches no options
- **THEN** an empty state message is shown with the search term
