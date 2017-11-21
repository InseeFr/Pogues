import {
  required,
  requiredSelect,
  name,
  minValue,
  maxValue,
  validCodesList,
  notEmptyMeasures,
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
  'response.format.type': { rules: [requiredSelect] },
  [`response.format.type.${SIMPLE}.${NUMERIC}.minimum`]: { rules: [value => minValue(0)(value)] },
  [`response.format.type.${SIMPLE}.${NUMERIC}.maximum`]: { rules: [value => minValue(1)(value)] },
  [`response.format.type.${SIMPLE}.${TEXT}.maxLength`]: { rules: [required, value => minValue(1)(value)] },
  [`response.format.type.${SINGLE_CHOICE}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`response.format.type.${MULTIPLE_CHOICE}.${PRIMARY}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`response.format.type.${MULTIPLE_CHOICE}.${MEASURE}.${CODES_LIST}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`response.format.type.${TABLE}.${PRIMARY}.totalLabel`]: { rules: [required] },
  [`response.format.type.${TABLE}.${PRIMARY}.${LIST}.numLinesMin`]: {
    rules: [value => minValue(1)(value), value => maxValue(100)(value)],
  },
  [`response.format.type.${TABLE}.${PRIMARY}.${LIST}.numLinesMax`]: {
    rules: [value => minValue(1)(value), value => maxValue(100)(value)],
  },
  [`response.format.type.${TABLE}.${PRIMARY}.${CODES_LIST}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`response.format.type.${TABLE}.${SECONDARY}.totalLabel`]: { rules: [required] },
  [`response.format.type.${TABLE}.${SECONDARY}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`response.format.type.${TABLE}.${MEASURE}.label`]: { rules: [required] },
  [`response.format.type.${TABLE}.${MEASURE}.${SINGLE_CHOICE}.${DEFAULT_CODES_LIST_SELECTOR_PATH}`]: {
    errorsInPanel: true,
    rules: [validCodesList],
  },
  [`response.format.type.${TABLE}.${MEASURE}.${SIMPLE}.${NUMERIC}.minimum`]: { rules: [value => minValue(0)(value)] },
  [`response.format.type.${TABLE}.${MEASURE}.${SIMPLE}.${NUMERIC}.maximum`]: { rules: [value => minValue(1)(value)] },
  [`response.format.type.${TABLE}.${MEASURE}.${SIMPLE}.${TEXT}.maxLength`]: {
    rules: [required, value => minValue(1)(value)],
  },
  [`response.format.type.${TABLE}.${LIST_MEASURE}`]: {
    errorsInPanel: true,
    rules: [notEmptyMeasures],
  },
  [`collectedVariables.${TABLE}.${LIST_MEASURE}`]: {
    errorsInPanel: true,
    rules: [],
  },
};
