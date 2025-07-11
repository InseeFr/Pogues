# Pogues

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.10.0] - 2025-07-09

### Added

- Metadata download link that includes both Pogues metadata and DDI documentation.

### Changed

- Improved table form.
- Dynamic table size can now be specified with either number or VTL.

### Removed

- Pogues metadata and DDI documentation download (they've been replaced with the zip one that download both of them).
- The readonly warning banner displayed on "version" pages, since it's now entirely handled by next.

### Fixed

- Fixed an issue in UCQ where switching from nomenclature to code list deleted the code list.
- Removed redundant API calls.
- Improved assets compression.

## [1.8.15] - 2025-06-17

### Added

- The questionnaire can be browsed in "read only". It will eventually be used to replace the "previous saves" feature but is not accessible to users right now.

### Removed

- Clarification can no longer be specified for UCQ > dropdown (they were not processed by Lunatic for methodology reasons).

## [1.8.14] - 2025-05-28

### Added

- In dynamic tables, cells can be specified as "read only". They can be read (but not edited) by the respondent to provide information to answer the survey.

## [1.8.13] - 2025-05-20

### Fixed

- Required inputs could not be of value '0'.

## [1.8.12] - 2025-05-14

### Changed

- The "blocking" error label no longer is "working soon" (now it's working!).

## [1.8.11] - 2025-05-07

### Changed

- The explanation about how saves work and when they are deleted should be clearer.

## [1.8.10] - 2025-04-24

### Removed

- Suggesters cannot be specified as mandatory.

## [1.8.9] - 2025-04-15

### Added

- Dynamic table measures can be filtered.

### Removed

- Info criticity.

## [1.8.8] - 2025-04-01

### Changed

- Warning is the default criticity in controls.
- The "blocking" error label indicates that it will be "working soon".
- Improved compression of the Docker image.
- Display a reminder in loop form that min and max must be equal in business surveys.

### Removed

- Pairwise questions cannot be specified as mandatory.
- Code cards declarations cannot be specified in VTL.
- Pattern can no longer be specified.

### Fixed

- Controls' scope is correctly saved.

### Security

- Updated OIDC SPA version.

## [1.8.6] - 2025-03-04

### Added

- Pogues metadata download link.

## [1.8.5] - 2025-02-19

### Fixed

- Removed an arbitrary and incorrect maximum value for year durations.

## [1.8.4] - 2025-02-18

### Added

- An arbitrary response can be specified for suggesters.

## [1.8.3] - 2025-02-14

### Changed

- A minimum and a maximum must be specified for duration and date questions.
- The label of the "versions" button is now "save history" to better reflect the feature. Versions (specified by the user) will be used at a lated date and must not be mistaken with saves (automatically created on questionnaire update).
- Updated nomenclatures.

### Fixed

- Display an error when the questionnaire cannot be found.

## [1.8.2] - 2025-01-24

### Changed

- Filters can be specified in VTL.
- Improved modals responsiveness.

## [1.8.1] - 2025-01-21

### Changed

- Declarations types (help, instruction, code cards) can only be specified if they are available in the scecified gathering mode (CAPI, CATI, CAWI, PAPI).

### Removed

- Unit for numeric calculated and external variables.

### Fixed

- Checkbox values are correctly updated.

## [1.8.0] - 2025-01-08

### Added

- The versions modal allows to load data from the previous saves. It put the questionnaire in dirty state with the previous data and allow to rollback to this previous version.

## [1.7.7] - 2025-01-06

### Added

- A "versions" modal allows to see previous saves. In an incoming update, it will allow to load the save's data and thus rollback to a previous questionnaire state.

### Changed

- Updated nomenclatures.
- External and Calculated variable scope label should be clearer.

## [1.3.0] - 2022-05-11

- **[Features]** : Integration of the VTL Editor
- **[Features]** : All fields are now mandatory for the creation of a questionnaire
- **[Fixes][merge]** : Fixing another bug where the owner part part of a questionnaire disappears after merging two questionnaires
- **[Fixes]** : Fixing a bug where it was imposssible to validate a element of the questionnaire after making two declarations in a row
- **[Fixes]** : Fixing a bug where the questionnaire appears as a filter target
- **[Techs]** Sonar fixes
- **[Techs]** Fixing units tests after integration of VTL Editor
- **[Techs]** Upgrading dependancies : moment, async et cross-fetch

## [1.2.0] - 2022-03-31

- **[Features]** : A spinner is displayed on the screen when waiting for a visualization and an information box appears if an error occured
- **[Features]** : Stamps are sorted alphabetically on Home page
- **[Features]** : The stamp of the user is pre-selected on Home page
- **[Features]** : In the declaration tab, the label is modified when card code is selected
- **[Techs]** Upgrading dependancies.

## [1.1.0] - 2022-02-02

- **[Features]** : Update measurement unit list
- **[Fixes][input]** : Fixing a bug making the validation of a question impossible when the user wants to collect dates in a table.
- **[Fixes][merge]** : Fixing bug where merging two duplicated questionnaires doesn't work if sequences are renamed
- **[Fixes][merge]** : Fixing bug where merging two questionnaires delete the owner part of the resulting questionnaire
- **[Techs]** : Use a feature flag for referential code lists
- **[Techs]** Upgrading dependancies.
