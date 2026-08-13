# ui-controls Specification

## Purpose
Provides toolbar controls that let users filter, sort, and view poll content in the way that suits them best.
## Requirements
### Requirement: Search with auto-expand
The system SHALL filter options in real time as the user types. Sections with matching options SHALL automatically expand. Sections with no matches SHALL be hidden.

#### Scenario: Search filters options
- **WHEN** user types in the search box
- **THEN** only options whose name, description, or section name matches are shown

#### Scenario: Matching sections auto-expand
- **WHEN** search returns results in a collapsed section
- **THEN** that section expands automatically to show matches

#### Scenario: No results state
- **WHEN** search query matches no options
- **THEN** an empty state message is shown with the search term

### Requirement: Sort options
The system SHALL allow sorting by: most popular (by vote count), alphabetical (A→Z), or by section order.

#### Scenario: Sort by popularity
- **WHEN** user selects "Most popular"
- **THEN** sections and options within sections are ordered by descending vote count

#### Scenario: Sort alphabetically
- **WHEN** user selects "A → Z"
- **THEN** sections and options are ordered alphabetically by name

### Requirement: Grid and list view toggle
The system SHALL provide a toggle to switch between a 2-column grid layout and a single-column list layout.

#### Scenario: Grid view
- **WHEN** user selects grid view
- **THEN** section cards are displayed in a 2-column grid and the sidebar is hidden

#### Scenario: List view
- **WHEN** user selects list view
- **THEN** section cards are displayed in a single centered column with the sidebar visible

### Requirement: Collapse and expand sections
Each section SHALL show 4 options by default. A "Show N more" button SHALL reveal all options. Selected options SHALL always remain visible even when collapsed.

#### Scenario: Default collapsed state
- **WHEN** section is loaded without search
- **THEN** only the first 4 options are visible

#### Scenario: Selected options always visible
- **WHEN** user has selected options beyond the first 4 and section is collapsed
- **THEN** selected options remain visible regardless of collapse state

### Requirement: Skeleton loading state
The system SHALL display layout-aware skeleton placeholders while poll data is loading, instead of a spinner.

#### Scenario: Loading state shown
- **WHEN** poll data fetch is in progress
- **THEN** skeleton cards matching the expected layout are displayed

