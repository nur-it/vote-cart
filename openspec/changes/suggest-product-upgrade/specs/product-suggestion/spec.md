## Purpose

Provides a rich modal and header quick-actions allowing voters to suggest custom products with image previews, auto-translation between English and Russian, manage their own suggestions, and enjoy a YouTube-style progressive scroll loading experience.

## ADDED Requirements

### Requirement: Section header suggest product button
The system SHALL display an interactive "+ Suggest Product" button in the right side of each section header that is optimized for both desktop and mobile viewports.

#### Scenario: Header button clicked on desktop or mobile
- **WHEN** user clicks "+ Suggest Product" button on a section header
- **THEN** the system opens the Suggest Product modal pre-targeted to that section

### Requirement: Smart hybrid image input & media
The system SHALL provide a modal dialog allowing users to enter a product title, description, select an optional emoji, and provide an image either by pasting an image URL with instant preview or uploading a file that is compressed on the client into an optimized WebP format.

#### Scenario: User enters product details with image URL
- **WHEN** user types a title, description, and enters a valid image URL
- **THEN** modal shows an instant preview of the image and enables the submit button

#### Scenario: User uploads an image file
- **WHEN** user selects or drops an image file in the modal
- **THEN** system compresses the image to a lightweight WebP data format, displays an instant thumbnail preview, and prepares it for submission

### Requirement: Automatic bidirectional translation (EN ↔ RU)
The system SHALL detect whether the submitted text is in Russian or English and automatically translate the title and description to the other language so both languages are saved in `name_i18n` and `desc_i18n`.

#### Scenario: User submits title and description in Russian
- **WHEN** user submits text containing Cyrillic characters
- **THEN** system stores the Russian text in `ru` field and translates it to English for the `en` field

#### Scenario: User submits title and description in English
- **WHEN** user submits text in Latin characters
- **THEN** system stores the English text in `en` field and translates it to Russian for the `ru` field

### Requirement: Guest tracking and creator CRUD operations
The system SHALL associate suggested custom options with a guest token / identifier and allow the creator to edit (title, description, image) or delete their own suggested products.

#### Scenario: Creator views their custom option
- **WHEN** a user visits the poll matching the guest token that created a custom option
- **THEN** UI displays edit and delete controls on that option card

#### Scenario: Creator edits their custom option
- **WHEN** creator submits updated title or image for their custom option
- **THEN** system re-translates if needed, updates the database record, and refreshes the live poll view

#### Scenario: Creator deletes their custom option
- **WHEN** creator confirms deletion of their custom option
- **THEN** system removes the option from the database and updates the active poll list

### Requirement: YouTube-style progressive chunk loading
The system SHALL remove the manual "Show more / Show less" button and instead load products chunk-by-chunk with skeleton animations as the user scrolls.

#### Scenario: User scrolls down section
- **WHEN** user scrolls near the end of the currently rendered product list
- **THEN** system shows animated skeleton placeholder cards and smoothly renders the next chunk of products
