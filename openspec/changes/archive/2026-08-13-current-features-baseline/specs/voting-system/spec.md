## Purpose

Handles the full lifecycle of a user's vote — casting, deduplication, undo, and persistence — ensuring one vote per person with a short correction window.

## ADDED Requirements

### Requirement: Cast vote
The system SHALL allow a user to select one or more options and submit a single vote. Each selected option's vote count SHALL be incremented by 1 atomically.

#### Scenario: Successful vote submission
- **WHEN** user selects at least one option and clicks "Cast vote"
- **THEN** system increments vote count for each selected option and returns updated poll results

#### Scenario: Empty selection rejected
- **WHEN** user clicks "Cast vote" with zero options selected
- **THEN** system returns an error and does not record a vote

#### Scenario: Too many options rejected
- **WHEN** user submits more than 100 option IDs
- **THEN** system returns an error and does not record a vote

### Requirement: IP-based deduplication
The system SHALL deduplicate votes by hashed IP address (SHA-256). Raw IP addresses SHALL never be stored.

#### Scenario: Duplicate vote blocked
- **WHEN** a user whose IP hash already exists in the votes table submits a vote
- **THEN** system returns the existing poll result with `alreadyVoted: true` and does not create a new vote record

### Requirement: Cookie fallback
The system SHALL set an httpOnly cookie containing the voted option IDs after a successful vote. On subsequent requests, if no IP match is found, the cookie SHALL be used to restore the user's voted state.

#### Scenario: Cookie synced on different browser same network
- **WHEN** a user votes on one browser and opens the app on another browser on the same IP
- **THEN** the second browser reflects `hasVoted: true` via IP dedup

#### Scenario: Cookie restores state after IP change
- **WHEN** a user's IP changes but the cookie is present
- **THEN** system uses cookie to show the user's previously voted options

### Requirement: 2-minute undo window
The system SHALL allow a user to undo their vote within 2 minutes of casting it. The window SHALL be enforced server-side using `Vote.createdAt`. After the window expires, the vote SHALL be permanent.

#### Scenario: Undo within window
- **WHEN** user clicks "Undo" within 2 minutes of voting
- **THEN** system decrements vote counts, deletes the vote record, clears the cookie, and returns updated poll results

#### Scenario: Undo after window expired
- **WHEN** user attempts to undo after 2 minutes
- **THEN** system returns a 403 error and the vote remains

#### Scenario: Undo countdown shown in UI
- **WHEN** user has voted and the undo window is active
- **THEN** UI shows a live countdown timer (MM:SS format)
