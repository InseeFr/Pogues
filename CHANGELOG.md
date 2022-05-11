# Pogues Change Log

## 1.3.0 - 11/05/22

- **[Features]** : Integration of the VTL Editor
- **[Features]** : All fields are now mandatory for the creation of a questionnaire
- **[Fixes][merge]** : Fixing another bug where the owner part part of a questionnaire disappears after merging two questionnaires
- **[Fixes]** : Fixing a bug where it was imposssible to validate a element of the questionnaire after making two declarations in a row
- **[Fixes]** : Fixing a bug where the questionnaire appears as a filter target
- **[Techs]** Sonar fixes
- **[Techs]** Fixing units tests after integration of VTL Editor
- **[Techs]** Upgrading dependancies : moment, async et cross-fetch

## 1.2.0 - 31/03/22

- **[Features]** : A spinner is displayed on the screen when waiting for a visualization and an information box appears if an error occured
- **[Features]** : Stamps are sorted alphabetically on Home page
- **[Features]** : The stamp of the user is pre-selected on Home page
- **[Features]** : In the declaration tab, the label is modified when card code is selected
- **[Techs]** Upgrading dependancies.

## 1.1.0 - 02/02/22

- **[Features]** : Update measurement unit list
- **[Fixes][input]** : Fixing a bug making the validation of a question impossible when the user wants to collect dates in a table.
- **[Fixes][merge]** : Fixing bug where merging two duplicated questionnaires doesn't work if sequences are renamed
- **[Fixes][merge]** : Fixing bug where merging two questionnaires delete the owner part of the resulting questionnaire
- **[Techs]** : Use a feature flag for referential code lists
- **[Techs]** Upgrading dependancies.
