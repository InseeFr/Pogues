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

export const MAIN_DIMENSION_FORMATS = {
  LIST: 'LIST',
  CODES_LIST: 'CODES_LIST',
};
