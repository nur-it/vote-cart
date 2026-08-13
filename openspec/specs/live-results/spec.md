# live-results Specification

## Purpose
Displays real-time voting percentages, rankings, and aggregate statistics so users can see how the community is voting.
## Requirements
### Requirement: Per-option percentage bars
The system SHALL display each option's vote share as a percentage of its section's total votes, rendered as an animated progress bar.

#### Scenario: Percentage calculated per section
- **WHEN** results are displayed
- **THEN** each option shows its share of that section's total votes (not global total), rounded to 1 decimal place

#### Scenario: Leading option highlighted
- **WHEN** an option has the highest vote count in its section
- **THEN** it is marked as leading with a Crown icon and a gradient progress bar

### Requirement: Hero stats
The system SHALL display aggregate statistics: total unique voters, total votes cast across all options, total option count, and the single top-voted option globally.

#### Scenario: Stats displayed
- **WHEN** poll data is loaded
- **THEN** voter count, total votes, option count, and top pick (with percentage) are shown

### Requirement: Results gated until vote or preview toggle
The system SHALL hide vote percentages until the user has voted. A "Live results" toggle SHALL allow previewing results before voting.

#### Scenario: Results hidden before vote
- **WHEN** user has not voted and live results toggle is off
- **THEN** options are shown in select mode without percentages

#### Scenario: Results visible after vote
- **WHEN** user has voted
- **THEN** all options switch to result mode showing percentages and vote counts

#### Scenario: Preview via toggle
- **WHEN** user enables the live results toggle without voting
- **THEN** results are shown with a banner indicating it is a preview

### Requirement: User's picks highlighted in results
The system SHALL visually distinguish the options a user voted for in the results view.

#### Scenario: Voted options marked
- **WHEN** user views results after voting
- **THEN** their chosen options show a "Your pick" badge and a colored ring

