# Pogues

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- In a unique choice question with modalities computed from a variable, you can now add a VTL expression for filtering modalities.

### Fixed

- Questionnaire loading no longer crash when a question uses a code list (or nomenclature) that does not exist anymore. It could happen when an existing question used a previous version of a nomenclature.
- nginx.conf: disable cache on remote-entry (to ensure keeping last legacy version)

### Changed

- Updated nomenclatures:
  - `L_NATIONETR-1-1-0` -> `L_NATIONETR-1-1-1`
- the token was not retrieved correctly for duplicate & remove action

## [3.0.0](https://github.com/InseeFr/Pogues/releases/tag/3.0.0) - 2026-03-25

### Changed

- move code-source from root to `./legacy` folder
- Change build to have only one Docker image and version
- adapt configuration of loading _legacy_ scripts (mfe plugin)
