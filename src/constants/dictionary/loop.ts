import type { Dictionary } from '../dictionary';

/** Translations used when we create or edit a loop. */
export const loopDictionary: Dictionary = {
  InitialMembre: {
    en: 'Start',
    fr: 'Début',
  },
  FinalMembre: {
    en: 'End',
    fr: 'Fin',
  },
  selectInitialMembre: {
    fr: 'Spécifier Membre initial',
    en: 'Specify Initial member',
  },
  selectFinalMembre: {
    fr: 'Spécifier Membre final',
    en: 'Specify Final member',
  },
  BasedOn: {
    en: 'Based on',
    fr: 'Basé sur',
  },
  loopSameMinMax: {
    en: 'Number of maximum occurrences identical to min',
    fr: "Nombre d'occurrences max identique à min",
  },
  loopSize: {
    en: 'Occurrences number',
    fr: 'Nombre d’occurrences',
  },
  loopSinglePage: {
    en: 'Display all occurrences on a single page',
    fr: 'Afficher toutes les occurrences sur une seule page',
  },
  loopSinglePageBusinessContextWarning: {
    en: 'Reminder: for business surveys, all occurrences must be displayed on a single page.',
    fr: 'Rappel : pour les enquêtes en contexte entreprises, toutes les occurrences doivent être affichées sur une seule page.',
  },
  loopMinMaxBusinessContextWarning: {
    en: 'Reminder: for business surveys, the min and max number of occurrences of a loop must be equal.',
    fr: "Rappel : pour les enquêtes en contexte entreprises, le nombre d'occurrences minimum et maximum d'une boucle doivent être égaux.",
  },
  loopMinOccurrencesNb: {
    en: 'Minimum number of occurrences',
    fr: "Nombre d'occurrences minimum",
  },
  loopMaxOccurrencesNb: {
    en: 'Maximum number of occurrences',
    fr: "Nombre d'occurrences maximum",
  },
  AddButton: {
    en: 'Add button label',
    fr: "Libellé du bouton d'ajout",
  },
  occurrenceLabel: {
    en: 'Occurrence identifier label',
    fr: 'Libellé identifiant une occurrence',
  },
  occurrenceDescription: {
    en: 'Occurrence description',
    fr: "Description d'une occurrence",
  },
  isRoundaboutLocked: {
    en: 'Forbid modifying ended occurrence',
    fr: 'Interdire de modifier une occurrence terminée',
  },
};
