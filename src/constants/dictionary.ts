import { codesDictionary } from './dictionary/codes';
import { declarationsDictionary } from './dictionary/declarations';
import { loopDictionary } from './dictionary/loop';
import { questionnaireDictionary } from './dictionary/questionnaire';
import { tableDictionary } from './dictionary/table';
import { validationDictionary } from './dictionary/validation';
import { COMPONENT_TYPE } from './pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE, LOOP, ROUNDABOUT, FILTER } =
  COMPONENT_TYPE;

export type Dictionary = { [key: string]: { en: string; fr: string } };

const dictionary: Dictionary = {
  ...codesDictionary,
  ...declarationsDictionary,
  ...loopDictionary,
  ...questionnaireDictionary,
  ...tableDictionary,
  ...validationDictionary,
  title: {
    en: 'Title',
    fr: 'Titre',
  },
  label: {
    en: 'Label',
    fr: 'Libellé',
  },
  name: {
    en: 'Id',
    fr: 'Identifiant',
  },
  formula: {
    en: 'Formula',
    fr: 'Formule',
  },
  add: {
    en: 'Add',
    fr: 'Ajouter',
  },
  merge: {
    en: 'Merge',
    fr: 'Fusionner',
  },
  noCommonMode: {
    en: 'No common collect mode',
    fr: 'Aucun mode commun',
  },
  incompatibleDynamic: {
    en: 'Different dynamics (goto or filter)',
    fr: 'Dynamisme différent (redirection ou filtre)',
  },
  incompatibleFormulaLanguage: {
    en: 'Different languages (<ref language, XPath or VTL>)',
    fr: 'Langage différents (<langage ref, XPath ou VTL>)',
  },
  errorMessageQuest: {
    en: 'Could not retrieve the questionnaire',
    fr: 'Impossible de récupérer le questionnaire',
  },
  search: {
    en: 'Search',
    fr: 'Chercher',
  },
  sequence: {
    en: 'Sequence',
    fr: 'Séquence',
  },
  subSequence: {
    en: 'Sub-sequence',
    fr: 'Sous-séquence',
  },
  loop: {
    en: 'Loop',
    fr: 'Boucle',
  },
  roundabout: {
    en: 'Roundabout',
    fr: 'Rond-point',
  },
  filtre: {
    en: 'Filter',
    fr: 'Filtre',
  },
  Scope: {
    en: 'Scope',
    fr: 'Niveau de calcul',
  },
  question: {
    en: 'Question',
    fr: 'Question',
  },
  externalElement: {
    en: 'External element',
    fr: 'Élément externe',
  },
  tcmReference: {
    en: 'TCM reference',
    fr: 'Référence au TCM',
  },
  questionnaireReference: {
    en: 'Questionnaire reference',
    fr: 'Référence à un questionnaire',
  },
  questionnaireMerge: {
    en: 'Questionnaire merging',
    fr: 'Fusion avec un questionnaire',
  },
  visualise: {
    en: 'Visualise',
    fr: 'Visualiser',
  },
  duplicate: {
    en: 'Duplicate',
    fr: 'Dupliquer',
  },
  copy: {
    en: 'Copy',
    fr: 'Copie',
  },
  remove: {
    en: 'Remove',
    fr: 'Supprimer',
  },
  save: {
    en: 'Save',
    fr: 'Sauvegarder',
  },
  publish: {
    en: 'Generate',
    fr: 'Générer',
  },
  create: {
    en: 'Create',
    fr: 'Créer',
  },
  load: {
    en: 'Load',
    fr: 'Charger',
  },
  generateCollectedVariables: {
    en: 'Generate collected variables',
    fr: 'Générer variables collectées',
  },
  import: {
    en: 'Import',
    fr: 'Importer',
  },
  declaration_tabTitle: {
    en: 'Statements',
    fr: 'Déclarations',
  },
  type: {
    en: 'Type',
    fr: 'Type',
  },
  date_format: {
    en: 'Format',
    fr: 'Format',
  },
  declarations: {
    en: 'Statements',
    fr: 'Déclarations',
  },
  controls: {
    en: 'Controls',
    fr: 'Contrôles',
  },
  QUESTIONNAIRE: {
    en: 'Questionnaire',
    fr: 'Questionnaire',
  },
  MODULE: {
    en: 'Module',
    fr: 'Module',
  },
  PARAGRAPH: {
    en: 'Paragraph',
    fr: 'Paragraphe',
  },
  SEQUENCE: {
    en: 'Module',
    fr: 'Module',
  },
  DATE: {
    en: 'Date',
    fr: 'Date',
  },
  DURATION: {
    en: 'Duration',
    fr: 'Durée',
  },
  NUMERIC: {
    en: 'Number',
    fr: 'Nombre',
  },
  TEXT: {
    en: 'Text',
    fr: 'Texte',
  },
  BOOLEAN: {
    en: 'Boolean',
    fr: 'Booléen',
  },
  COMMENT: {
    en: 'Comment',
    fr: 'Commentaire',
  },
  HELP: {
    en: 'Help',
    fr: 'Aide',
  },
  helpUrl: {
    en: 'https://inseefr-github-io.translate.goog/Bowie/1._Pogues/?_x_tr_sl=fr&_x_tr_tl=en&_x_tr_hl=fr&_x_tr_pto=wapp',
    fr: 'https://inseefr.github.io/Bowie/1._Pogues/',
  },
  WARNING: {
    en: 'Warning',
    fr: 'Avertissement',
  },
  maxLength: {
    en: 'Length',
    fr: 'Taille',
  },
  pattern: {
    en: 'Pattern',
    fr: 'Motif',
  },
  collected: {
    en: 'Collected',
    fr: 'Collectée',
  },
  goTo: {
    en: 'Goto',
    fr: 'Redirections',
  },
  goTo_description: {
    en: 'GoTo description',
    fr: 'Description de la redirection',
  },
  calculatedVariables: {
    en: 'Calculated variables',
    fr: 'Variables calculées',
  },
  externalVariables: {
    en: 'External variables',
    fr: 'Variables externes',
  },
  collectedVariables: {
    en: 'Collected variables',
    fr: 'Variables collectées',
  },
  maximum: {
    en: 'Maximum',
    fr: 'Maximum',
  },
  minimum: {
    en: 'Minimum',
    fr: 'Minimum',
  },
  decimals: {
    en: 'Precision',
    fr: 'Précision',
  },
  Filter: {
    en: 'Excepted',
    fr: 'Sauf',
  },
  selectBasedOn: {
    fr: 'Spécifier Basé sur',
    en: 'Specify Based on',
  },
  selectScope: {
    fr: 'Portée Questionnaire',
    en: 'Scope Questionnaire',
  },
  specify: {
    en: 'Specify',
    fr: 'Préciser',
  },
  hours: {
    en: 'hours',
    fr: 'heures',
  },
  minutes: {
    en: 'minutes',
    fr: 'minutes',
  },
  years: {
    en: 'years',
    fr: 'années',
  },
  months: {
    en: 'months',
    fr: 'mois',
  },
  dateinitial: {
    en: 'Date format',
    fr: 'Format de la date',
  },
  durationinitial: {
    en: 'Duration format',
    fr: 'Format de la durée',
  },
  formatDate: {
    en: 'Please respect the date format',
    fr: 'Merci de respecter le format de la date',
  },
  dynamicUnit: {
    en: 'Custom unit of measure',
    fr: 'Unité de mesure personnalisée',
  },
  unit: {
    en: 'Unit of measure',
    fr: 'Unité de mesure',
  },
  dynamicUnitFormula: {
    en: 'Formula of the unit of measure',
    fr: "Formule de l'unité de mesure",
  },
  unitEmptySelect: {
    en: 'Select an unit of measure',
    fr: 'Sélectionnez une unité de mesure',
  },
  description: {
    en: 'Description',
    fr: 'Description',
  },
  expression: {
    en: 'Display condition',
    fr: "Condition d'affichage",
  },
  target: {
    en: 'Target',
    fr: 'Cible',
  },
  responsesEdition: {
    en: 'Response format',
    fr: 'Format des réponses',
  },
  responseType: {
    en: 'Response type',
    fr: 'Type de réponse',
  },
  visHint: {
    en: 'Visualization hint',
    fr: 'Type de saisie',
  },
  newCode: {
    en: 'New code',
    fr: 'Nouvelle catégorie',
  },
  placeholderDeclarationText: {
    en: 'Here, your statement',
    fr: 'Ici, votre déclaration',
  },
  description_label: {
    en: 'Control description',
    fr: 'Description du contrôle',
  },
  control_message: {
    en: 'Fail message',
    fr: "Message d'erreur",
  },
  questionnaireValid: {
    en: 'Your questionnaire is valid',
    fr: 'Votre questionnaire ne comporte aucune erreur',
  },
  duplicateVariablesComment: {
    fr: 'Certaines variables de votre questionnaire sont présentes plusieurs fois.',
    en: 'Some variables in your questionnaire appear more than once.',
  },
  showErrorDuplicateVariables: {
    fr: 'Voir les variables en doublon',
    en: 'Show duplicate variables',
  },
  duplicateVariables: {
    fr: 'Variables en doublon',
    en: 'Duplicate variables',
  },
  duplicateVariablesHeader: {
    fr: 'Variables',
    en: 'Variables',
  },
  duplicateVariablesSource: {
    fr: 'Origine',
    en: 'Origin',
  },
  currentQuestionnaire: {
    fr: 'Questionnaire courant',
    en: 'Current questionnaire',
  },
  CollectedVariableType: {
    fr: 'Collectée',
    en: 'Collected',
  },
  CalculatedVariableType: {
    fr: 'Calculée',
    en: 'Calculated',
  },
  ExternalVariableType: {
    fr: 'Externe',
    en: 'External',
  },
  failMessage: {
    en: 'Error message',
    fr: "Message d'erreur",
  },
  criticity: {
    en: 'Criticity',
    fr: 'Criticité',
  },
  INFO: {
    en: 'Information',
    fr: 'Information',
  },
  WARN: {
    en: 'Warning (Non-blocking)',
    fr: 'Avertissement (Non bloquant)',
  },
  ERROR: {
    en: 'Error (Blocking)',
    fr: 'Erreur (Bloquant)',
  },
  control_scope: {
    en: 'Level',
    fr: 'Niveau',
  },
  LINE: {
    en: 'Line',
    fr: 'Ligne',
  },
  DYNAMIC_ARRAY: {
    en: 'Array',
    fr: 'Tableau',
  },
  ROUNDABOUT: {
    en: 'Roundabout',
    fr: 'Rond-point',
  },
  OCCURRENCE: {
    en: 'Occurrence',
    fr: 'Occurrence',
  },
  responseFormatSimple: {
    fr: 'Réponse simple',
    en: 'Simple response',
  },
  responseFormatSingle: {
    fr: 'Réponse à choix unique',
    en: 'Single choice response',
  },
  responseFormatMultiple: {
    fr: 'Réponse à choix multiples',
    en: 'Multiple choice response',
  },
  responseFormatTable: {
    fr: 'Tableau',
    en: 'Table',
  },
  responseFormatPairing: {
    fr: 'Liens deux à deux',
    en: 'Household members pairing',
  },
  pairingSourceVariable: {
    fr: 'Variable source',
    en: 'Source variable',
  },
  primaryAxis: {
    fr: "Axe d'information",
    en: 'Information axis',
  },
  allowArbitraryResponse: {
    fr: 'Autoriser une réponse libre',
    en: 'Allow an arbitrary response',
  },
  list: {
    fr: 'Liste',
    en: 'List',
  },
  modification: {
    en: "You didn't save your changes. Are you sure you want to leave?",
    fr: "Vous n'avez pas enregistré vos modifications. Êtes-vous sûr de vouloir quitter ?",
  },
  modificationsNotSaved: {
    en: 'Your modifications are not saved!',
    fr: 'Vos modifications ne sont pas sauvegardées !',
  },
  saveLower: {
    en: 'Thank you to validate all the actions on the page',
    fr: "Merci de valider toutes les actions sur l'élément",
  },
  saveLowerTitle: {
    en: 'Modifications not validated',
    fr: 'Modifications non validées',
  },
  notSaved: {
    en: 'An error occurs, your modification can not be saved',
    fr: "Une erreur s'est produite, votre modification ne peut pas être sauvegardée",
  },
  loopNotSaved: {
    en: 'Your questionnaire has at least one loop, the last change made may generate inconsistencies (addition or change of order of a sequence or sub-sequence, modification of a question within a loop), please consult the loops concerned of your questionnaire, modify them if necessary and revalidate them.',
    fr: "Votre questionnaire comporte au moins une boucle, le dernier changement opéré peut générer des incohérences (ajout ou changement d'ordre d'une séquence ou sous-séquence, modification d'une question au sein d'une boucle), merci de consulter les boucles concernées de votre questionnaire, les modifier si nécessaire et les revalider.",
  },
  visualizationError: {
    en: 'An error occurred while visualizing the questionnaire:',
    fr: 'Une erreur a été rencontrée lors de la visualisation du questionnaire :',
  },
  close: {
    fr: 'Fermer',
    en: 'Close',
  },
  yes: {
    fr: 'Oui',
    en: 'Yes',
  },
  no: {
    fr: 'Non',
    en: 'No',
  },
  alternativeLabel: {
    fr: 'Valeur alternative',
    en: 'Alternative value',
  },
  unCollected: {
    fr: 'Case non collectée',
    en: 'uncollected cell',
  },
  boolean: {
    fr: 'Booléen',
    en: 'Boolean',
  },
  measureInfo: {
    fr: 'Représentation des réponses',
    en: 'Responses representation',
  },
  measureLabel: {
    fr: "Libellé de l'information mesurée",
    en: 'Measure label',
  },
  responseFormats: {
    fr: 'Type de question',
    en: 'Question type',
  },
  noMeasureYet: {
    en: 'No measure yet',
    fr: 'Aucune information mesurée définie',
  },
  typeMeasure: {
    fr: 'Type de mesure',
    en: 'Measure type',
  },
  condition: {
    fr: 'Condition',
    en: 'Condition',
  },
  dupliquate: {
    fr: 'dupliquer un questionnaire',
    en: 'duplicate a question',
  },
  mandatory: {
    fr: 'Obligatoire',
    en: 'Mandatory',
  },
  by: {
    fr: 'par',
    en: 'by',
  },
  durationformat1: {
    fr: 'heures/minutes',
    en: 'hours/minutes',
  },
  durationformat2: {
    fr: 'années/mois',
    en: 'years/months',
  },
  dateyyyy: {
    fr: 'AAAA',
    en: 'YYYY',
  },
  datemmyyyy: {
    fr: 'AAAA-MM',
    en: 'YYYY-MM',
  },
  dateddmmyyyy: {
    fr: 'AAAA-MM-JJ',
    en: 'YYYY-MM-DD',
  },
  dropdown: {
    fr: 'Liste déroulante',
    en: 'Dropdown',
  },
  radio: {
    fr: 'Bouton radio',
    en: 'Radio',
  },
  checkbox: {
    fr: 'Case à cocher',
    en: 'Checkbox',
  },
  suggester: {
    fr: 'Recherche sur liste',
    en: 'Suggester',
  },
  logout: {
    fr: 'Se déconnecter',
    en: 'Logout',
  },
  headerSubtitle: {
    fr: 'Conception et test de questionnaires',
    en: 'Design and testing of questionnaires',
  },
  homepage: {
    fr: 'Accueil',
    en: 'Homepage',
  },
  stamp: {
    fr: 'Habilitation :',
    en: 'Authorisation:',
  },
  welcome: {
    fr: 'Bienvenue dans POGUES',
    en: 'Welcome to POGUES',
  },
  homeQuestionnairesInProgress: {
    fr: 'Questionnaires en cours de conception par votre équipe',
    en: 'Questionnaires in progress by your team',
  },
  homeStampChoice: {
    fr: 'Choisissez le timbre associé à votre questionnaire : ',
    en: 'Choose the stamp associated with your questionnaire : ',
  },
  searchQuestionnaire: {
    fr: 'Rechercher un questionnaire',
    en: 'Search a questionnaire',
  },
  fromRepository: {
    fr: 'Du référentiel',
    en: 'From the repository',
  },
  publishedByInsee: {
    fr: "Publiés par l'Insee",
    en: 'Published by Insee',
  },
  collectionMode: {
    fr: 'Mode de collecte',
    en: 'Collection mode',
  },
  lastUpdate: {
    fr: 'Dernière mise à jour',
    en: 'Last update',
  },
  state: {
    fr: 'État',
    en: 'State',
  },
  stateValidated: {
    fr: 'Validé',
    en: 'Validated',
  },
  stateProvisional: {
    fr: 'Provisoire',
    en: 'Provisional',
  },
  loading: {
    fr: 'En cours de chargement',
    en: 'Loading',
  },
  validate: {
    fr: 'Valider',
    en: 'Validate',
  },
  cancel: {
    fr: 'Annuler',
    en: 'Cancel',
  },
  dropHere: {
    fr: 'Déposer ici !',
    en: 'Drop here !',
  },
  backToHomePage: {
    fr: "Retour à l'accueil",
    en: 'Back to the Home',
  },
  back: {
    fr: 'Retour',
    en: 'Back',
  },
  confirmBodyTitle: {
    fr: 'Confirmation',
    en: 'Confirmation',
  },
  confirmBodyMessage: {
    fr: 'Vous allez supprimer le questionnaire et perdre toutes les informations saisies.',
    en: 'You are deleting the questionnaire. You are going to lose all information entered.',
  },
  confirmQuestionMessage: {
    fr: 'Êtes-vous sûr ?',
    en: 'Are you sure?',
  },
  serie: {
    fr: 'Série',
    en: 'Series',
  },
  operation: {
    fr: 'Opération statistique',
    en: 'Statistical operation',
  },
  campaigns: {
    fr: 'Campagnes',
    en: 'Campaigns',
  },
  campaign: {
    fr: 'Campagne',
    en: 'Campaign',
  },
  selectSerie: {
    fr: 'Sélectionner une série',
    en: 'Select a series',
  },
  selectOperation: {
    fr: 'Sélectionner une opération',
    en: 'Select an operation',
  },
  selectCampaign: {
    fr: 'Sélectionner une campagne',
    en: 'Select a campaign',
  },
  selectType: {
    fr: 'Sélectionner un type',
    en: 'Select a type',
  },
  noValuesCampaigns: {
    fr: 'Sélectionner une opération pour afficher la liste des campagnes',
    en: 'Select an operation to show a list of campaigns',
  },
  customize: {
    fr: 'Personnaliser',
    en: 'Customize',
  },
  displaySaveHistory: {
    fr: 'Sauvegardes',
    en: 'Save history',
  },
  searchInputQuestionnaireLabel: {
    en: 'Questionnaire title',
    fr: 'Titre du questionnaire',
  },
  searchInputButton: {
    en: 'Search',
    fr: 'Rechercher',
  },
  pageSearchNoResults: {
    en: 'No questionnaire found',
    fr: 'Aucun questionnaire trouvé',
  },
  pageSearchNoResultsForId: {
    en: 'No questionnaire found for identifier',
    fr: "Aucun questionnaire trouvé pour l'identifiant",
  },
  reset: {
    en: 'Reset',
    fr: 'Réinitialiser',
  },
  searchResultSaveHistory: {
    fr: 'Sauvegarde',
    en: 'Save history',
  },
  searchResultId: {
    fr: 'Identifiant',
    en: 'Id',
  },
  searchResultTitle: {
    fr: 'Titre',
    en: 'Title',
  },
  searchResultLabel: {
    fr: 'Libellé',
    en: 'Label',
  },
  searchResultSerie: {
    fr: 'Série',
    en: 'Series',
  },
  searchResultOperation: {
    fr: 'Opération statistique',
    en: 'Statistical operation',
  },
  searchResultCampaign: {
    fr: 'Campagne',
    en: 'Campaign',
  },
  searchResultAction: {
    fr: 'Action',
    en: 'Action',
  },
  searchResultActionReuse: {
    fr: 'Réutiliser',
    en: 'Reuse',
  },
  actions: {
    fr: 'Actions',
    en: 'Actions',
  },
  level: {
    fr: 'Niveau',
    en: 'Level',
  },
  VISUALIZE_WEB: {
    fr: 'Web V1',
    en: 'Web V1',
  },
  VISUALIZE_WEB_HOUSEHOLD: {
    fr: 'Web ménage',
    en: 'Web household',
  },
  VISUALIZE_WEB_BUSINESS: {
    fr: 'Web entreprise',
    en: 'Web business',
  },
  VISUALIZE_QUEEN_CAPI: {
    fr: 'Enquêteur face à face',
    en: 'Questioner face to face',
  },
  VISUALIZE_QUEEN_CATI: {
    fr: 'Enquêteur téléphone',
    en: 'Questioner phone',
  },
  VISUALIZE_PDF: {
    fr: 'Papier',
    en: 'Paper',
  },
  VISUALIZE_SPECIFICATION: {
    fr: 'Spécification',
    en: 'Specification',
  },
  VISUALIZE_POGUES_MODEL: {
    fr: 'Métadonnées (Pogues)',
    en: 'Metadata (Pogues)',
  },
  VISUALIZE_DDI: {
    fr: 'Documentation (DDI)',
    en: 'Documentation (DDI)',
  },
  NEW: {
    fr: 'Nouveau',
    en: 'New',
  },
  If: {
    fr: 'Si',
    en: 'If',
  },
  EndIf: {
    fr: 'Fin si',
    en: 'End if',
  },
  IsNotLetter: {
    en: 'Id should begin with a letter',
    fr: "L'identifiant de la variable doit commencer par une lettre",
  },
  duplicateQuestion: {
    fr: 'Vous avez demandé à dupliquer le questionnaire "',
    en: 'You asked to duplicate the questionnaire "',
  },
  duplicateQuestionConfirmation: {
    fr: '". Confirmez-vous votre demande ?',
    en: '". Are you sure ?',
  },
  openQuestionnaire: {
    fr: 'Ouvrir',
    en: 'Open',
  },
  saveHistoryInfo: {
    fr: 'Pour afficher une précédente sauvegarde, choisissez "Charger" puis valider. Cette sauvegarde peut ensuite être modifiée et sauvegardée.',
    en: 'To load a previous backup, click "Load" and validate. That backup can then be edited and saved as a new one.',
  },
  saveHistoryLimitInfo: {
    fr: 'Attention, seulement les 10 dernières sauvegardes de la journée la plus récente sont conservées, et la dernière des journées précédentes.',
    en: 'Caution: only the latest 10 backup of the most recent day are stored, and the last one for the days before.',
  },
  documentationInfoLink: {
    fr: 'Pour plus de précision, se référer à la documentation.',
    en: 'For more information check the documentation.',
  },
  loopMinMaxHouseholdContextWarning: {
    fr: "Rappel : pour les enquêtes en contexte entreprises, le nombre d'occurrences minimum et maximum d'une boucle doivent être égaux.",
    en: 'Reminder: for business surveys, the min and max number of occurences of a loop must be equal.',
  },
};

// Dynamic translations

dictionary[`componentNew${QUESTION}`] = {
  fr: 'Nouvelle question',
  en: 'New question',
};

dictionary[`componentNew${SEQUENCE}`] = {
  fr: 'Nouvelle sequence',
  en: 'New sequence',
};

dictionary[`componentNew${LOOP}`] = {
  fr: 'Nouvelle boucle',
  en: 'New loop',
};

dictionary[`componentNew${ROUNDABOUT}`] = {
  fr: 'Nouveau rond-point',
  en: 'New roundabout',
};

dictionary[`componentNew${FILTER}`] = {
  fr: 'Nouveau filtre',
  en: 'New filter',
};

dictionary[`componentNew${SUBSEQUENCE}`] = {
  fr: 'Nouvelle sous-séquence',
  en: 'New sub-sequence',
};

dictionary[`componentEdit${QUESTION}`] = {
  fr: 'Modifier la question',
  en: 'Edit question',
};

dictionary[`componentEdit${SEQUENCE}`] = {
  fr: 'Modifier la sequence',
  en: 'Edit sequence',
};

dictionary[`componentEdit${SUBSEQUENCE}`] = {
  fr: 'Modifier la sous-séquence',
  en: 'Edit sub-sequence',
};

dictionary[`componentEdit${LOOP}`] = {
  fr: 'Modifier la boucle',
  en: 'Edit loop',
};

dictionary[`componentEdit${ROUNDABOUT}`] = {
  fr: 'Modifier le rond-point',
  en: 'Edit roundabout',
};

dictionary[`componentEdit${FILTER}`] = {
  fr: 'Modifier le filtre',
  en: 'Edit filter',
};

export default dictionary;
