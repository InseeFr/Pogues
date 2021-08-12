export const COMPONENT_TYPE = {
  QUESTION: 'QUESTION',
  SEQUENCE: 'SEQUENCE',
  SUBSEQUENCE: 'SUBSEQUENCE',
  QUESTIONNAIRE: 'QUESTIONNAIRE',
  LOOP: 'LOOP',
  FILTER: 'FILTER',
  NESTEDFILTRE: 'NESTEDFILTRE',
  REDIRECTION: 'REDIRECTION',
  // used as a placeholder to place the generic input within the questionnaire
  GENERIC_INPUT: 'GENERIC_INPUT',
  XPATH: 'XPATH',
  VTL: 'VTL',
};

export const DATEFORMAT = [
  {
    format: '1',
    label: 'jj-mm-aaaa',
  },
  {
    format: '2',
    label: 'mm-aaaa',
  },
  {
    format: '3',
    label: 'aaaa',
  },
];

export const TargetMode = [
  { value: 'CAPI', label: 'CAPI' },
  { value: 'CATI', label: 'CATI' },
  { value: 'CAWI', label: 'CAWI' },
  { value: 'PAPI', label: 'PAPI' },
];

export const DATATYPE_NAME = {
  DATE: 'DATE',
  NUMERIC: 'NUMERIC',
  TEXT: 'TEXT',
  BOOLEAN: 'BOOLEAN',
  DURATION: 'DURATION',
};

export const DURATION_UNIT = ['heures', 'mois', 'jours', 'années'];

// mapping to convert a type to a type when we serialize a
// questionnaire
export const DATATYPE_TYPE_FROM_NAME = {
  DATE: 'DateDatatypeType',
  NUMERIC: 'NumericDatatypeType',
  DURATION: 'DurationDatatypeType',
  TEXT: 'TextDatatypeType',
  BOOLEAN: 'BooleanDatatypeType',
};

export const DATATYPE_VIS_HINT = {
  CHECKBOX: 'CHECKBOX',
  RADIO: 'RADIO',
  DROPDOWN: 'DROPDOWN',
};

export const DIMENSION_TYPE = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  MEASURE: 'MEASURE',
  LIST_MEASURE: 'LIST_MEASURE',
};

export const DECLARATION_TYPE = {
  INSTRUCTION: 'INSTRUCTION',
  COMMENT: 'COMMENT',
  HELP: 'HELP',
  WARNING: 'WARNING',
  CODECARD: 'CODECARD',
};

export const UI_BEHAVIOUR = {
  FIRST_INTENTION: 'FIRST_INTENTION',
  SECOND_INTENTION: 'SECOND_INTENTION',
};

export const DECLARATION_POSITION = {
  AFTER_QUESTION_TEXT: 'AFTER_QUESTION_TEXT',
  AFTER_RESPONSE: 'AFTER_RESPONSE',
  BEFORE_QUESTION_TEXT: 'BEFORE_QUESTION_TEXT',
  DETACHABLE: 'DETACHABLE',
};

export const DIMENSION_FORMATS = {
  LIST: 'LIST',
  CODES_LIST: 'CODES_LIST',
  BOOL: 'BOOL',
};

export const QUESTION_TYPE_ENUM = {
  SIMPLE: 'SIMPLE',
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TABLE: 'TABLE',
};

export const CODES_LIST_INPUT_ENUM = {
  NEW: 'NEW',
  REF: 'REF',
  QUEST: 'QUEST',
};

export const VARIABLES_TYPES = {
  COLLECTED: 'CollectedVariableType',
  CALCULATED: 'CalculatedVariableType',
  EXTERNAL: 'ExternalVariableType',
};

export const TAB_NAMES = {
  RESPONSE_FORMAT: 'responseFormat',
  COLLECTED_VARIABLES: 'collectedVariables',
  REDIRECTIONS: 'redirections',
};

export const TYPES_ITEMS = {
  QUESTIONNAIRE: 'Instrument',
  CODES_LIST: 'CodeList',
};

export const SEARCH_CRITERIAS = {
  QUESTIONNAIRE: [
    {
      remoteName: 'subgroupId',
      localName: 'serie',
    },
    {
      remoteName: 'studyUnitId',
      localName: 'operation',
    },
    {
      remoteName: 'dataCollectionId',
      localName: 'campaigns',
    },
  ],
  CODES_LIST: [
    {
      remoteName: 'subgroupId',
      localName: 'serie',
    },
  ],
};

export const SEARCH_RESULTS_COLUMNS = {
  QUESTIONNAIRE: [
    {
      dictionary: 'searchResultVersion',
      key: 'version',
    },
    {
      dictionary: 'searchResultId',
      key: 'id',
    },
    {
      dictionary: 'searchResultTitle',
      key: 'title',
    },
    {
      dictionary: 'searchResultSerie',
      key: 'subgroupId',
    },
    {
      dictionary: 'searchResultOperation',
      key: 'studyUnitId',
    },
    {
      dictionary: 'searchResultCampaign',
      key: 'dataCollectionId',
    },
  ],
  CODES_LIST: [
    {
      dictionary: 'searchResultVersion',
      key: 'version',
    },
    {
      dictionary: 'searchResultLabel',
      key: 'title',
    },
    {
      dictionary: 'searchResultSerie',
      key: 'subgroupId',
    },
  ],
};

export const CODES_LISTS_PANELS = [
  {
    dictionary: 'newCodesList',
    value: CODES_LIST_INPUT_ENUM.NEW,
  },
  {
    dictionary: 'refCodesList',
    value: CODES_LIST_INPUT_ENUM.REF,
  },
  {
    dictionary: 'questionnaireCodesList',
    value: CODES_LIST_INPUT_ENUM.QUEST,
  },
];

export const INTEGRITY_TYPES = {
  QUESTIONNAIRE_LENGTH: 'QUESTIONNAIRE_LENGTH',
  UNIQUE_COMPONENT_NAME: 'UNIQUE_COMPONENT_NAME',
  UNIQUE_VARIABLE_NAME: 'UNIQUE_VARIABLE_NAME',
  TARGET_NOT_FOUND: 'TARGET_NOT_FOUND',
  TARGET_EARLIER: 'TARGET_EARLIER',
  DECLARATION_MODE: 'DECLARATION_MODE',
  NOT_EXISTING_TARGET: 'NOT_EXISTING_TARGET',
};

export const TABS_PATHS = {
  RESPONSE_FORMAT: 'responseFormat',
  DECLARATIONS: 'declarations',
  CONTROLS: 'controls',
  REDIRECTIONS: 'redirections',
  EXTERNAL_VARIABLES: 'externalVariables',
  CALCULATED_VARIABLES: 'calculatedVariables',
  COLLECTED_VARIABLES: 'collectedVariables',
};

export const ERROR_TYPES = {
  INTEGRITY: 'INTEGRITY',
  SUBMIT: 'SUBMIT',
};

export const DEFAULT_CODES_LIST_SELECTOR_PATH = 'CodesList';
export const DEFAULT_FORM_NAME = 'component';
export const STATISTICAL_CONTEXT_FORM_NAME = 'statistical-context';
export const QUESTIONNAIRE_NEW_FORM_NAME = 'questionnaire-new';
export const DEFAULT_LANG = 'fr';
export const ENV_TEST = 'test';
export const SEQUENCE_TYPE_NAME = 'SequenceType';
export const QUESTION_TYPE_NAME = 'QuestionType';

export const QUESTION_END = 'QUESTIONNAIRE_END';
export const QUESTION_END_CHILD = {
  id: 'idendquest',
  depth: 1,
  Name: 'QUESTIONNAIRE_END',
  Label: ['QUESTIONNAIRE_END'],
  Declaration: [],
  genericName: 'MODULE',
  Control: [],
  FlowControl: [],
  type: 'SequenceType',
  Child: [],
};

export const QUESTIONNAIRE_TYPE = {
  Filtres: 'Filtres',
  Redirections: 'Redirections',
};

export const FORMULA_LANGUAGE = {
  XPATH: 'XPATH',
  VTL: 'VTL',
};
