# Pogues

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.14.0](https://github.com/InseeFr/Pogues/releases/tag/1.14.0) - 2026-02-13

### Added

- Pairwise component now allows to set a name source variable (previously known as source variable) and a gender source variable. It will allow Lunatic to compute global variables that can be used in the form. The pairwise form has been slightly changed to better reflect this.

## [1.13.0](https://github.com/InseeFr/Pogues/releases/tag/1.13.0) - 2026-01-19

### Added

- Handle external variables' `isDeletedOnReset` property.
- Added nomenclatures: "L_PRODUITS_LAITIERS2026", "L_NATIONETR-1-1-0", "L_SPE_NON_FORMELLES-1-0-0".

### Changed

- Updated nomenclatures:
  - "L_AUTRE_TAB_2025" -> "L_AUTRE_TAB_2025-1"
  - "L_COMMUNES-2025" -> "L_COMMUNES-2025-1"
  - "L_ELEC_TAB_2025" -> "L_ELEC_TAB_2025-1"
  - "L_NEGOCE_TAB_2025" -> "L_NEGOCE_TAB_2025-1"
  - "L_PI_TAB_2025" -> "L_PI_TAB_2025-1"

### Removed

- Questions no longer allow access to external and calculated variables tab (which allowed to create, update and delete from within a question), since it's now handled by next.

### Fixed

- Hyphens `-` are now handled when searching for a nomenclature.

## [1.12.0](https://github.com/InseeFr/Pogues/releases/tag/1.12.0) - 2025-11-25

### Added

- QCM can be set as mandatory.

### Changed

- Disable questionnaire duplication when the user has unsaved changes to prevent user mistake.

## [1.11.6](https://github.com/InseeFr/Pogues/releases/tag/1.11.6) - 2025-11-06

### Added

- Added nomenclatures: "L_AUTRE_TAB_2025", "L_DECHET_TAB_2025", "L_EAU_TAB_2025", "L_ELEC_TAB_2025", "L_GAZ_TAB_2025", "L_INST_REPAR_TAB_2025", "L_NEGOCE_TAB_2025", "L_PI_TAB_2025" and "L_VAPEUR_TAB_2025".

### Fixed

- Added double quotes to default precision label.

## [1.11.5](https://github.com/InseeFr/Pogues/releases/tag/1.11.5) - 2025-10-14

### Changed

- Updated Dockerfile image.

## [1.11.4](https://github.com/InseeFr/Pogues/releases/tag/1.11.4) - 2025-10-09

### Added

- Added nomenclatures: "L_COMMUNES-2025", "L_NAF2008-1-0-0" and "L_NAF2025-1-0-0".

### Changed

- Updated nomenclature: "L_DIPLOMES-2-0-0" -> "L_DIPLOMES-2-1-0".

## [1.11.3](https://github.com/InseeFr/Pogues/releases/tag/1.11.3) - 2025-09-05

### Changed

- Handle questionnaire's new articulation and multimode props to prevent removing them on form update.

### Fixed

- Fixed some issues with form validation.

## [1.11.2](https://github.com/InseeFr/Pogues/releases/tag/1.11.2) - 2025-08-21

### Fixed

- Visualization of referenced questionnaires no longer crash.

## [1.11.1](https://github.com/InseeFr/Pogues/releases/tag/1.11.1) - 2025-08-19

### Removed

- Static tables can no longer be set as readonly.
- Personalization link button, since it's now handled by next.
- Home redirection button in questionnaire page, since it's now displayed by next.

### Fixed

- Loop details could not be accessed when the questionnaire had a module.
- Modal overlap with next.

## [1.11.0](https://github.com/InseeFr/Pogues/releases/tag/1.11.0) - 2025-07-17

### Changed

- Loops' length can be set as fixed or dynamic (with a min and a max) if they are not based on another loop.
- Loops with a fixed length can be displayed as one page per iteration.

### Removed

- Save button since it is now handled by next.

## [1.10.0](https://github.com/InseeFr/Pogues/releases/tag/1.10.0) - 2025-07-09

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

## [1.8.15](https://github.com/InseeFr/Pogues/releases/tag/1.8.15) - 2025-06-17

### Added

- The questionnaire can be browsed in "read only". It will eventually be used to replace the "previous saves" feature but is not accessible to users right now.

### Removed

- Clarification can no longer be specified for UCQ > dropdown (they were not processed by Lunatic for methodology reasons).

## [1.8.14](https://github.com/InseeFr/Pogues/releases/tag/1.8.14) - 2025-05-28

### Added

- In dynamic tables, cells can be specified as "read only". They can be read (but not edited) by the respondent to provide information to answer the survey.

## [1.8.13](https://github.com/InseeFr/Pogues/releases/tag/1.8.13) - 2025-05-20

### Fixed

- Required inputs could not be of value '0'.

## [1.8.12](https://github.com/InseeFr/Pogues/releases/tag/1.8.12) - 2025-05-14

### Changed

- The "blocking" error label no longer is "working soon" (now it's working!).

## [1.8.11](https://github.com/InseeFr/Pogues/releases/tag/1.8.11) - 2025-05-07

### Changed

- The explanation about how saves work and when they are deleted should be clearer.

## [1.8.10](https://github.com/InseeFr/Pogues/releases/tag/1.8.10) - 2025-04-24

### Removed

- Suggesters cannot be specified as mandatory.

## [1.8.9](https://github.com/InseeFr/Pogues/releases/tag/1.8.9) - 2025-04-15

### Added

- Dynamic table measures can be filtered.

### Removed

- Info criticity.

## [1.8.8](https://github.com/InseeFr/Pogues/releases/tag/1.8.8) - 2025-04-01

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

## [1.8.6](https://github.com/InseeFr/Pogues/releases/tag/1.8.6) - 2025-03-04

### Added

- Pogues metadata download link.

## [1.8.5](https://github.com/InseeFr/Pogues/releases/tag/1.8.5) - 2025-02-19

### Fixed

- Removed an arbitrary and incorrect maximum value for year durations.

## [1.8.4](https://github.com/InseeFr/Pogues/releases/tag/1.8.4) - 2025-02-18

### Added

- An arbitrary response can be specified for suggesters.

## [1.8.3](https://github.com/InseeFr/Pogues/releases/tag/1.8.3) - 2025-02-14

### Changed

- A minimum and a maximum must be specified for duration and date questions.
- The label of the "versions" button is now "save history" to better reflect the feature. Versions (specified by the user) will be used at a lated date and must not be mistaken with saves (automatically created on questionnaire update).
- Updated nomenclatures.

### Fixed

- Display an error when the questionnaire cannot be found.

## [1.8.2](https://github.com/InseeFr/Pogues/releases/tag/1.8.2) - 2025-01-24

### Changed

- Filters can be specified in VTL.
- Improved modals responsiveness.

## [1.8.1](https://github.com/InseeFr/Pogues/releases/tag/1.8.1) - 2025-01-21

### Changed

- Declarations types (help, instruction, code cards) can only be specified if they are available in the scecified gathering mode (CAPI, CATI, CAWI, PAPI).

### Removed

- Unit for numeric calculated and external variables.

### Fixed

- Checkbox values are correctly updated.

## [1.8.0](https://github.com/InseeFr/Pogues/releases/tag/1.8.0) - 2025-01-08

### Added

- The versions modal allows to load data from the previous saves. It put the questionnaire in dirty state with the previous data and allow to rollback to this previous version.

## [1.7.7](https://github.com/InseeFr/Pogues/releases/tag/1.7.7) - 2025-01-06

### Added

- A "versions" modal allows to see previous saves. In an incoming update, it will allow to load the save's data and thus rollback to a previous questionnaire state.

### Changed

- Updated nomenclatures.
- External and Calculated variable scope label should be clearer.

## [1.3.0](https://github.com/InseeFr/Pogues/releases/tag/1.3.0) - 2022-05-11

- **[Features]** : Integration of the VTL Editor
- **[Features]** : All fields are now mandatory for the creation of a questionnaire
- **[Fixes][merge]** : Fixing another bug where the owner part part of a questionnaire disappears after merging two questionnaires
- **[Fixes]** : Fixing a bug where it was imposssible to validate a element of the questionnaire after making two declarations in a row
- **[Fixes]** : Fixing a bug where the questionnaire appears as a filter target
- **[Techs]** Sonar fixes
- **[Techs]** Fixing units tests after integration of VTL Editor
- **[Techs]** Upgrading dependancies : moment, async et cross-fetch

## [1.2.0](https://github.com/InseeFr/Pogues/releases/tag/1.2.0) - 2022-03-31

- **[Features]** : A spinner is displayed on the screen when waiting for a visualization and an information box appears if an error occured
- **[Features]** : Stamps are sorted alphabetically on Home page
- **[Features]** : The stamp of the user is pre-selected on Home page
- **[Features]** : In the declaration tab, the label is modified when card code is selected
- **[Techs]** Upgrading dependancies.

## [1.1.0](https://github.com/InseeFr/Pogues/releases/tag/1.1.0) - 2022-02-02

- **[Features]** : Update measurement unit list
- **[Fixes][input]** : Fixing a bug making the validation of a question impossible when the user wants to collect dates in a table.
- **[Fixes][merge]** : Fixing bug where merging two duplicated questionnaires doesn't work if sequences are renamed
- **[Fixes][merge]** : Fixing bug where merging two questionnaires delete the owner part of the resulting questionnaire
- **[Techs]** : Use a feature flag for referential code lists
- **[Techs]** Upgrading dependancies.
