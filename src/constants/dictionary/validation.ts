import type { Dictionary } from '../dictionary';

/**
 * Translations used when we display a validation rule.
 *
 * It shows errors about the questionnaire to the user.
 */
export const validationDictionary: Dictionary = {
  validation_declaration_label: {
    fr: 'Libellé de la déclaration obligatoire',
    en: 'Statement label required',
  },
  validation_card_code: {
    fr: "La modalité carte-code n'a de sens que pour les modes de collecte CAPI et/ou CATI.",
    en: 'The codecard modality is meanful only for CAPI and/or CATI mode.',
  },
  validation_control_description: {
    fr: 'Description du contrôle obligatoire',
    en: 'Control description required',
  },
  validation_expression: {
    fr: 'Condition obligatoire',
    en: 'Condition required',
  },
  validation_control_message: {
    fr: "Message d'erreur obligatoire",
    en: 'Fail message required',
  },
  validation_goTo_description: {
    fr: 'Description de la redirection obligatoire',
    en: 'Goto description required',
  },
  validation_condition: {
    fr: 'Condition obligatoire',
    en: 'Condition required',
  },
  validation_target: {
    fr: 'Cible obligatoire',
    en: 'Target required',
  },
  validation_calculatedvariable_label: {
    fr: 'Libellé de la variable calculée obligatoire',
    en: 'Calculated variable label required',
  },
  validation_calculatedvariable_name: {
    fr: 'Nom de la variable calculée obligatoire',
    en: 'Calculated variable name required',
  },
  validation_calculatedvariable_formula: {
    fr: 'Formule de la variable calculée obligatoire',
    en: 'Calculated variable formula required',
  },
  validation_calculatedvariable_existing: {
    fr: 'Il existe une variable calculée avec le même nom',
    en: 'It already exists a calculated variable with this name',
  },
  validation_format: {
    fr: 'Format obligatoire',
    en: 'Format required',
  },
  validation_minimum: {
    fr: 'Minimum obligatoire',
    en: 'Minimum required',
  },
  validation_maximum: {
    fr: 'Maximum obligatoire',
    en: 'Maximum required',
  },
  validation_externalvariable_label: {
    fr: 'Libellé de la variable externe obligatoire',
    en: 'External variable label required',
  },
  validation_externalvariable_name: {
    fr: 'Nom de la variable externe obligatoire',
    en: 'External variable name required',
  },
  validation_externalvariable_existing: {
    fr: 'Il existe une variable externe avec le même nom',
    en: 'It already exists an external variable with this name',
  },
  validation_collectedvariable_label: {
    fr: 'Libellé de la variable collectée obligatoire',
    en: 'Collected variable label required',
  },
  validation_collectedvariable_name: {
    fr: 'Identifiant de la variable collectée obligatoire',
    en: 'Collected variable id required',
  },
  validation_collectedvariable_existing: {
    fr: 'Il existe une variable collectée avec le même nom',
    en: 'It already exists an collected variable with this name',
  },
  validation_collectedvariable_need_reset: {
    fr: 'Veuillez regénérer les variables collectées',
    en: 'Renew your collected variables',
  },
  validation_collectedvariable_need_creation: {
    fr: 'Veuillez spécifier une variable collectée',
    en: 'Specify a collected variable',
  },
  validationCodeListCode: {
    fr: 'Code de la modalité obligatoire.',
    en: 'Code required.',
  },
  validationCodeListLabel: {
    fr: 'Libellé obligatoire.',
    en: 'Label required.',
  },
  validationDurationMinutesMustBeBetween0And59: {
    fr: 'Les minutes doivent être un nombre entre 0 et 59.',
    en: 'Minutes must be a number between 0 and 59.',
  },
  validationDurationMonthsMustBeBetween0And11: {
    fr: 'Les mois doivent être un nombre entre 0 et 11.',
    en: 'Months must be a number between 0 and 11.',
  },
  validationMeasureLabel: {
    fr: "Libellé de l'information mesurée obligatoire",
    en: 'Measure label required',
  },
  validationNumber: {
    fr: 'Vous devez introduire un chiffre',
    en: 'Must be a number',
  },
  validationRequired: {
    fr: 'Champ obligatoire',
    en: 'Mandatory field',
  },
  validationRequiredMultiple: {
    fr: 'Sélectionner au moins une option',
    en: 'Select at least one option',
  },
  validationInvalidName: {
    fr: "L'identifiant peut uniquement contenir des lettres non accentuées, chiffres, tirets et underscore",
    en: 'The Id can only contain non-accented letters, numbers, dashes and underscore',
  },
  validationInvalidNameSize: {
    fr: "L'identifiant ne peux pas dépasser 32 caractères",
    en: 'The Id can not exceed 32 characters',
  },
  validationMinNumber: {
    fr: 'Veuillez saisir au minimum',
    en: 'Must be at least',
  },
  validationMaxNumber: {
    fr: 'Veuillez saisir au maximum',
    en: 'Must be at most',
  },
  codeUnicity: {
    fr: 'Tous les codes doivent être uniques',
    en: 'All codes should be unique',
  },
  errorGoToNonExistingTgt: {
    fr: 'Le filtre comporte une cible invalide. Le champ « Cible » doit faire référence à un élément connu du questionnaire.',
    en: 'The target defined in the filter question is not avalaible. Please fill in the target with an existing element of the questionnaire.',
  },
  notExistingTarget: {
    fr: "Les cibles de redirections suivantes n'existent pas au sein du questionnaire :",
    en: "The following targets of redirections don't exist for the questionnaire :",
  },
  errorGoToEarlierTgt: {
    fr: 'Le filtre comporte une cible invalide. Le champ « Cible » doit faire référence à un élément postérieur du questionnaire.',
    en: 'The target defined in the filter question is not avalaible. Please fill in the target with a further element of the questionnaire.',
  },
  errorQuestionnaireTooShort: {
    fr: 'Votre questionnaire doit comporter au moins une séquence et une question.',
    en: 'Your questionnaire must contain at least one sequence and one question.',
  },
  errorUniqueVariableName: {
    fr: 'Les noms de variable doivent être uniques :',
    en: 'Variable names should be unique:',
  },
  errorUniqueComponentName: {
    fr: 'Les noms de composant (séquence, sous-séquence, boucle et question) doivent être uniques :',
    en: 'Component names (sequence, subsequence, loop and question) should be unique:',
  },
  errorQuestionnaireTargetMode: {
    fr: "Le mode de collecte d'un composant (séquence sous-séquence ou question) doit être inclus dans les modes de collecte du questionnaire :",
    en: 'The component collection mode (sequence, subsequence or question) must be included in the questionnaire collection mode:',
  },
};
