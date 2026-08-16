## MODIFIED Requirements

### Requirement: Auto-seed on first request
The system SHALL automatically seed sections and options on the first request if the database is empty. The system SHALL NOT execute recurring multi-query update loops during standard poll data retrieval when the database is already populated.

#### Scenario: Empty database on first request
- **WHEN** GET /api/poll is called and no sections exist in the database
- **THEN** system seeds all sections and options with local image references before returning results

#### Scenario: Populated database on request
- **WHEN** GET /api/poll is called and sections already exist in the database
- **THEN** system retrieves poll results in a single read operation without executing data mutation loops

## ADDED Requirements

### Requirement: Local static category assets
The system SHALL use local static image paths under `/categories/` for all default seed options.

#### Scenario: Seed option images served locally
- **WHEN** poll options are returned to the client
- **THEN** each default option provides an `imageUrl` pointing to its corresponding `/categories/*.png` static asset
