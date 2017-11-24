import {
  required,
  requiredSelect,
  name,
  minValue,
  maxValue,
  validCodesList,
  emptyMeasures,
} from 'forms/validation-rules';
import {
  QUESTION_TYPE_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { NUMERIC, TEXT } = DATATYPE_NAME;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;

export const questionnaireRules = {
  serie: { rules: [requiredSelect] },
  operation: { rules: [requiredSelect] },
  campaigns: { rules: [required] },
  name: { rules: [required, name] },
  label: { rules: [required] },
};

export const sequenceRules = {
  name: { rules: [required, name] },
  label: { rules: [required] },
};

export const questionRules = {
  name: { rules: [required, name] },
  label: { rules: [required] },
  'responseFormat.type': { rules: [requiredSelect] },
  [`responseFormat.${SIMPLE}.${NUMERIC}.minimum`]: { rules: [value => minValue(0)(value)] },
  [`responseFormat.${SIMPLE}.${NUMERIC}.maximum`]: { rules: [value => minValue(1)(value)] },
  [`responseFormat.${SIMPLE}.${TEXT}.maxLength`]: { rules: [required, value => minValue(1)(value)] },
  [`responseFormat.${SINGLE_CHOICE}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`responseFormat.${MULTIPLE_CHOICE}.${PRIMARY}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`responseFormat.${MULTIPLE_CHOICE}.${MEASURE}.${CODES_LIST}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`responseFormat.${TABLE}.${PRIMARY}.totalLabel`]: { rules: [required] },
  [`responseFormat.${TABLE}.${PRIMARY}.${LIST}.numLinesMin`]: {
    rules: [value => minValue(1)(value), value => maxValue(100)(value)],
  },
  [`responseFormat.${TABLE}.${PRIMARY}.${LIST}.numLinesMax`]: {
    rules: [value => minValue(1)(value), value => maxValue(100)(value)],
  },
  [`responseFormat.${TABLE}.${PRIMARY}.${CODES_LIST}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`responseFormat.${TABLE}.${SECONDARY}.totalLabel`]: { rules: [required] },
  [`responseFormat.${TABLE}.${SECONDARY}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`responseFormat.${TABLE}.${MEASURE}.label`]: { rules: [required] },
  [`responseFormat.${TABLE}.${MEASURE}.${SINGLE_CHOICE}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`responseFormat.${TABLE}.${MEASURE}.${SIMPLE}.${NUMERIC}.minimum`]: { rules: [value => minValue(0)(value)] },
  [`responseFormat.${TABLE}.${MEASURE}.${SIMPLE}.${NUMERIC}.maximum`]: { rules: [value => minValue(1)(value)] },
  [`responseFormat.${TABLE}.${MEASURE}.${SIMPLE}.${TEXT}.maxLength`]: {
    rules: [required, value => minValue(1)(value)],
  },
  [`responseFormat.${TABLE}.${LIST_MEASURE}`]: {
    errorsInPanel: true,
    rules: [emptyMeasures],
  },
  [`collectedVariables.${TABLE}.${LIST_MEASURE}`]: {
    errorsInPanel: true,
    rules: [],
  },
};
