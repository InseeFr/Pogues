# Pogues

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.1.3](https://github.com/InseeFr/Pogues/releases/tag/2.1.3) - 2025-08-25

### Changed

- Logout functionality is now always enabled, env var `VITE_ENABLE_LOGOUT` has been removed.

### Fixed

- Correctly download JSON data in personalization.
- Improved messages in personalization.

## [2.1.2](https://github.com/InseeFr/Pogues/releases/tag/2.1.2) - 2025-08-21

### Fixed

- Button to download CSV schema is correctly enabled.

## [2.1.1](https://github.com/InseeFr/Pogues/releases/tag/2.1.1) - 2025-08-19

### Fixed

- Modal overlap.

## [2.1.0](https://github.com/InseeFr/Pogues/releases/tag/2.1.0) - 2025-08-19

### Added

- A variables page that display every variables defined by the questionnaire.
- A personalization page that allow to test the latest version of the questionnaire with external variables.
- Logout button in the header (that can be disabled thanks to `VITE_ENABLE_LOGOUT`).
- A variable form page that can only be accessed with `VITE_ENABLE_VARIABLES_PAGE_FORM`. It is still a work in progress.

### Changed

- New variable definition fetched from API, accessible from pogues-back-office 4.21.0.
- Filters' design has been changed a bit.

### Removed

- Button to delete all saves in history page.

### Fixed

- Breadcrumb now correctly redirects to clicked crumb.

## [2.0.1](https://github.com/InseeFr/Pogues/releases/tag/2.0.1) - 2025-07-10

### Fixed

- Fixed an issue where composition could not be accessed anymore.

## [2.0.0](https://github.com/InseeFr/Pogues/releases/tag/2.0.0) - 2025-07-09

### Added

- A history page can be accessed to browse a questionnaire in "read only" and restore an older save. It will eventually replace the "previous saves" feature of legacy.

### Changed

- Navigation bar has been improved to account for currently displayed version and make navigation clearer.
- Highlight all active filters.

### Removed

- Total number of codes lists and nomenclatures in title since the information is redundant with filters results.

### Fixed

- Handle network errors instead of crashing.
- Improved translations in breadcrumb and titles.
- Improved accessibility in navigation bar and breadcrumb.

## [1.9.5](https://github.com/InseeFr/Pogues/releases/tag/1.9.5) - 2025-05-28

### Added

- A nomenclature page allows to see every nomenclatures used in our questionnaire.

### Fixed

- Improved VTL editor responsiveness.

## [1.9.3](https://github.com/InseeFr/Pogues/releases/tag/1.9.3) - 2025-05-14

### Added

- Codes lists can be filtered by question usage.

### Changed

- The navigation bar follows the screen on scroll.

### Fixed

- Correctly display code list values after an update.

## [1.9.1](https://github.com/InseeFr/Pogues/releases/tag/1.9.1) - 2025-04-10

### Added

- Codes lists can be filtered by name and question usage.

### Changed

- In the codes list page, display the total number of codes list and the number of codes list currenctly displayed through filters.

### Fixed

- Correctly display codes lists after a code list has been deleted or duplicated.
- Improved accessibility in codes list page.

## [1.9.0](https://github.com/InseeFr/Pogues/releases/tag/1.9.0) - 2025-04-01

### Added

- Subproject initialization
- A questionnaires list page allows to access every questionnaire and can be filtered by name and stamp.
- A questionnaire page allows to access legacy Pogues.
- A codes list page allows to see every codes list used in our questionnaire. It also allows to create new ones, or update and delete them.
- Codes lists can be filtered by name and question usage.
