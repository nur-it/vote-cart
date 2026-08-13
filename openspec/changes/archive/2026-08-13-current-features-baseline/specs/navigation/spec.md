## Purpose

Provides quick-jump navigation between sections so users can move through the poll without excessive scrolling, adapted for both desktop and mobile viewports.

## ADDED Requirements

### Requirement: Desktop sticky sidebar
The system SHALL display a sticky sidebar on xl+ screens listing all visible sections. The currently visible section SHALL be highlighted as the user scrolls.

#### Scenario: Active section highlighted on scroll
- **WHEN** user scrolls and a section enters the viewport
- **THEN** the corresponding sidebar item is highlighted

#### Scenario: Sidebar hidden in grid view
- **WHEN** user switches to grid view
- **THEN** the sidebar is hidden

#### Scenario: Jump to section on click
- **WHEN** user clicks a sidebar item
- **THEN** page scrolls smoothly to that section with offset for sticky headers

### Requirement: Mobile horizontal pill row
The system SHALL display a horizontally scrollable pill row on screens smaller than xl. The active section pill SHALL auto-scroll to center as the user scrolls the page.

#### Scenario: Active pill auto-centered
- **WHEN** user scrolls and a new section becomes active
- **THEN** the corresponding pill smoothly scrolls to the center of the pill row

#### Scenario: Jump to section on pill click
- **WHEN** user taps a pill
- **THEN** page scrolls smoothly to that section
