# Pogues

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- A history page can be accessed to browse a questionnaire in "read only" and restore an older save. It will eventually replace the "previous saves" feature of legacy.

### Changed

- Navigation bar has been improved to account for currently displayed version and make navigation clearer.

### Fixed

- Handle network errors instead of crashing.
- Translation in breadcrumbs.
- Improved accessibility in navigation bar and breadcrumb.

## [1.9.5] - 2025-05-28

### Added

- A nomenclature page allows to see every nomenclatures used in our questionnaire.

### Fixed

- Improved VTL editor responsiveness.

## [1.9.3] - 2025-05-14

### Added

- Codes lists can be filtered by question usage.

### Changed

- The navigation bar follows the screen on scroll.

### Fixed

- Correctly display code list values after an update.

## [1.9.1] - 2025-04-10

### Added

- Codes lists can be filtered by name and question usage.

### Changed

- In the codes list page, display the total number of codes list and the number of codes list currenctly displayed through filters.

### Fixed

- Correctly display codes lists after a code list has been deleted or duplicated.
- Improved accessibility in codes list page.

## [1.9.0] - 2025-04-01

### Added

- Subproject initialization
- A questionnaires list page allows to access every questionnaire and can be filtered by name and stamp.
- A questionnaire page allows to access legacy Pogues.
- A codes list page allows to see every codes list used in our questionnaire. It also allows to create new ones, or update and delete them.
- Codes lists can be filtered by name and question usage.
