export const REMOTE_EVENT = {
  FAILED: 'FAILED',
  LOADED: 'LOADED',
  PENDING: 'PENDING',
};

export const COMPONENT_TYPE = {
  QUESTION: 'QUESTION',
  SEQUENCE: 'SEQUENCE',
  SUBSEQUENCE: 'SUBSEQUENCE',
  QUESTIONNAIRE: 'QUESTIONNAIRE',
  // used as a placeholder to place the generic input within the questionnaire
  GENERIC_INPUT: 'GENERIC_INPUT',
};

export const COMPONENT_UTIL = {
  CREATE: 'CREATE',
  REMOVE: 'REMOVE',
};

export const GENERAL = {
  ENTER_KEY_CODE: 13,
};

export const VIEW_TYPE = {
  PICKER: 'PICKER',
  QUESTIONNAIRE: 'QUESTIONNAIRE',
  EDITION: 'EDITION',
  CONFIG: 'CONFIG',
};

export const GOTO_CONSISTENCY = {
  NON_EXISTING: 'NON_EXISTING',
  AFTER: 'AFTER',
  BEFORE: 'BEFORE',
  EMPTY: 'EMPTY',
};

// types for sequences
export const SEQUENCE_GENERIC_NAME = {
  QUESTIONNAIRE: 'QUESTIONNAIRE',
  MODULE: 'MODULE',
  SUBMODULE: 'SUBMODULE',
  PARAGRAPH: 'PARAGRAPH',
  SEQUENCE: 'SEQUENCE',
};

export const DATATYPE_NAME = {
  DATE: 'DATE',
  NUMERIC: 'NUMERIC',
  TEXT: 'TEXT',
  BOOLEAN: 'BOOLEAN',
};

// mapping to convert a type to a type when we serialize a
// questionnaire
export const DATATYPE_TYPE_FROM_NAME = {
  DATE: 'DateDatatypeType',
  NUMERIC: 'NumericDatatypeType',
  TEXT: 'TextDatatypeType',
  BOOLEAN: 'BooleanDatatypeType',
};

export const DATATYPE_VIS_HINT = {
  CHECKBOX: 'CHECKBOX',
  RADIO: 'RADIO',
  DROPDOWN: 'DROPDOWN',
};
/**
 * Generic constants to represent a dimension for MULTIPLE and TABLE reponse
 * formats. They can be used within an action payload to designate which
 * dimension the action is related to.
 */
export const AXIS = {
  INFO: 'INFO',
  FIRST_INFO: 'FIRST_INFO',
  SCND_INFO: 'SCND_INFO',
  MEASURE: 'MEASURE',
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
};

export const CONTROL_CRITICITY = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
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

export const DEFAULT_LANG = 'fr';

export const ENV_TEST = 'test';

export const SEQUENCE_TYPE_NAME = 'SequenceType';
export const QUESTION_TYPE_NAME = 'QuestionType';

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
  QUESTIONNAIRE: 'QUESTIONNAIRE',
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

export const DEFAULT_FORM_NAME = 'component';
export const STATISTICAL_CONTEXT_FORM_NAME = 'statistical-context';
export const QUESTIONNAIRE_NEW_FORM_NAME = 'questionnaire-new';

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
    {
      remoteName: 'studyUnitId',
      localName: 'operation',
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
    {
      dictionary: 'searchResultOperation',
      key: 'studyUnitId',
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
