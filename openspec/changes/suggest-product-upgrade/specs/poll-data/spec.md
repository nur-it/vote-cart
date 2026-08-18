## MODIFIED Requirements

### Requirement: Custom option suggestion
The system SHALL allow a user to suggest rich custom products per section with description, image, and creator attribution. A suggested option SHALL be immediately visible to all users and bilingual across English and Russian.

#### Scenario: New custom option added
- **WHEN** user submits a new product with title, description, and optional image
- **THEN** system creates the option with `isCustom: true`, bilingual translations (`name_i18n`, `desc_i18n`), and creator token (`createdById`)

#### Scenario: Duplicate name returns existing option
- **WHEN** user submits a name that already exists in the section (case-insensitive)
- **THEN** system returns the existing option without creating a duplicate

#### Scenario: Custom option auto-selected after creation
- **WHEN** user adds a custom option before voting
- **THEN** the new option is automatically added to the user's current selection
