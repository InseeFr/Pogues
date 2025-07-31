/*
List of business rules to be applied to each questionnaire's components.
*/
import get from 'lodash.get';

import {
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DEFAULT_NOMENCLATURE_SELECTOR_PATH,
  DIMENSION_CALCULATION,
  DIMENSION_FORMATS,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '../../constants/pogues-constants';
import Dictionary from '../dictionary/dictionary';
import {
  cartCodeModeCollecte,
  emptyMeasures,
  letterStart,
  maxValue,
  minValue,
  name,
  nameLoop,
  nameSize,
  required,
  requiredSelect,
  typeCalculated,
  typeExternal,
  validateDuplicatesCalculated,
  validateDuplicatesCollected,
  validateDuplicatesExternal,
  validateEarlyTarget,
  validateExistingTarget,
} from './validate-rules';
import { validCollectedVariables } from './validate-variables';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { NUMERIC, TEXT, DATE, DURATION } = DATATYPE_NAME;
const { PRIMARY, SECONDARY, LIST_MEASURE, MEASURE } = DIMENSION_TYPE;
const { NUMBER, FORMULA } = DIMENSION_CALCULATION;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const {
  RESPONSE_FORMAT,
  DECLARATIONS,
  CONTROLS,
  REDIRECTIONS,
  CALCULATED_VARIABLES,
  EXTERNAL_VARIABLES,
  COLLECTED_VARIABLES,
} = TABS_PATHS;

//Disabled validation rules for series to implement specific validation rules for series
export const questionnaireRules = {
  serie: [],
  operation: [],
  campaigns: [],
  name: [required, name],
  label: [required],
  TargetMode: [required],
  dynamiqueSpecified: [required],
  formulaSpecified: [required],
};

export const sequenceRules = {
  name: [required, name],
  label: [required],
};

export const loopRules = {
  nameLoop: [required, nameLoop],
  initialMember: [required],
  finalMember: [required],
  // we need a minimum only if the loop has a dynamic length
  minimum: [
    (value, { form }) => {
      const basedOn = get(form, 'basedOn');
      const isFixedLength = get(form, 'isFixedLength');
      return !basedOn && !isFixedLength ? required(value) : undefined;
    },
  ],
  // we need a maximum only if the loop has a dynamic length
  maximum: [
    (value, { form }) => {
      const basedOn = get(form, 'basedOn');
      const isFixedLength = get(form, 'isFixedLength');
      return !basedOn && !isFixedLength ? required(value) : undefined;
    },
  ],
  // we need a minimum only if the loop has a fixed length
  size: [
    (value, { form }) => {
      const basedOn = get(form, 'basedOn');
      const isFixedLength = get(form, 'isFixedLength');
      return !basedOn && isFixedLength ? required(value) : undefined;
    },
  ],
};

export const filterRules = {
  initialMember: [required],
  finalMember: [required],
  filter: [required],
};

export const durationRulesPTnHnM = {
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.maminutes`]: [
    (value) => required(value),
    (value) => minValue(0)(value),
    (value) => maxValue(59)(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.miminutes`]: [
    (value) => required(value),
    (value) => minValue(0)(value),
    (value) => maxValue(59)(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mahours`]: [
    (value) => required(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mihours`]: [
    (value) => required(value),
  ],
};

export const durationRulesPnYnM = {
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mamonths`]: [
    (value) => required(value),
    (value) => minValue(0)(value),
    (value) => maxValue(11)(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mimonths`]: [
    (value) => required(value),
    (value) => minValue(0)(value),
    (value) => maxValue(11)(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mayears`]: [
    (value) => required(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.miyears`]: [
    (value) => required(value),
  ],
};

export const questionRules = {
  name: [required, name, letterStart],
  label: [required],
  [`${RESPONSE_FORMAT}.type`]: [requiredSelect],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${TEXT}.maxLength`]: [
    required,
    (value) => minValue(1)(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${NUMERIC}.minimum`]: [required],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${NUMERIC}.maximum`]: [required],

  [`${RESPONSE_FORMAT}.${SIMPLE}.${DATE}.format`]: [requiredSelect],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DATE}.minimum`]: [required],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DATE}.maximum`]: [required],

  // for single response suggester, we need to select a nomenclature
  [`${RESPONSE_FORMAT}.${SINGLE_CHOICE}.${DEFAULT_NOMENCLATURE_SELECTOR_PATH}.id`]:
    [
      (value, { form }) => {
        const visHint = get(
          form,
          `${RESPONSE_FORMAT}.${SINGLE_CHOICE}.visHint`,
        );
        return visHint === 'SUGGESTER' ? required(value) : undefined;
      },
    ],

  // for single response other than suggester, we need to select a codes list
  [`${RESPONSE_FORMAT}.${SINGLE_CHOICE}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]:
    [
      (value, { form }) => {
        const visHint = get(
          form,
          `${RESPONSE_FORMAT}.${SINGLE_CHOICE}.visHint`,
        );
        return visHint !== 'SUGGESTER' ? required(value) : undefined;
      },
    ],

  [`${RESPONSE_FORMAT}.${MULTIPLE_CHOICE}.${PRIMARY}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]:
    [required],
  [`${RESPONSE_FORMAT}.${MULTIPLE_CHOICE}.${MEASURE}.${CODES_LIST}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]:
    [required],
  [`${RESPONSE_FORMAT}.${TABLE}.${PRIMARY}.${LIST}.type`]: [required],
  [`${RESPONSE_FORMAT}.${TABLE}.${PRIMARY}.${LIST}.${NUMBER}.type`]: [required],
  [`${RESPONSE_FORMAT}.${TABLE}.${PRIMARY}.${LIST}.${FORMULA}.type`]: [
    required,
  ],
  [`${RESPONSE_FORMAT}.${TABLE}.${PRIMARY}.${CODES_LIST}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]:
    [required],
  [`${RESPONSE_FORMAT}.${TABLE}.${SECONDARY}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]:
    [required],
  [`${RESPONSE_FORMAT}.${TABLE}.label`]: [required],

  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.measures`]: [emptyMeasures],
  [`${RESPONSE_FORMAT}.${TABLE}.${MEASURE}.label`]: [required],
  [`${RESPONSE_FORMAT}.${TABLE}.${MEASURE}.${SIMPLE}.${TEXT}.maxLength`]: [
    required,
    (value) => minValue(1)(value),
  ],
  [`${RESPONSE_FORMAT}.${TABLE}.${MEASURE}.${SINGLE_CHOICE}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]:
    [required],
  [`${COLLECTED_VARIABLES}.collectedVariables`]: [validCollectedVariables],
};
export const declarationRules = {
  [`${DECLARATIONS}.label`]: [
    (value) => required(value) && Dictionary.validation_declaration_label,
  ],
  [`${DECLARATIONS}.declarationType`]: [
    (value, conf) =>
      cartCodeModeCollecte(value, conf) && Dictionary.validation_card_code,
  ],
};

export const redirectionRules = {
  [`${REDIRECTIONS}.label`]: [
    (value) => required(value) && Dictionary.validation_goTo_description,
  ],
  [`${REDIRECTIONS}.condition`]: [
    (value) => required(value) && Dictionary.validation_condition,
  ],
  [`${REDIRECTIONS}.cible`]: [
    (value) => required(value) && Dictionary.validation_target,
    validateEarlyTarget,
    validateExistingTarget,
  ],
};

export const controlRules = {
  [`${CONTROLS}.label`]: [
    (value) => required(value) && Dictionary.validation_control_description,
  ],
  [`${CONTROLS}.condition`]: [
    (value) => required(value) && Dictionary.validation_expression,
  ],
  [`${CONTROLS}.message`]: [
    (value) => required(value) && Dictionary.validation_control_message,
  ],
};

export const calculatedVariableRules = {
  [`${CALCULATED_VARIABLES}.label`]: [
    (value) =>
      required(value) && Dictionary.validation_calculatedvariable_label,
  ],
  [`${CALCULATED_VARIABLES}.name`]: [
    (value) => required(value) && Dictionary.validation_calculatedvariable_name,
    name,
    nameSize,
    letterStart,
    (value, conf) =>
      validateDuplicatesCalculated(value, conf) &&
      Dictionary.validation_calculatedvariable_existing,
  ],
  [`${CALCULATED_VARIABLES}.formula`]: [
    (value) =>
      required(value) && Dictionary.validation_calculatedvariable_formula,
  ],

  [`${CALCULATED_VARIABLES}.${NUMERIC}.minimum`]: [
    (value, conf) =>
      required(value) && typeCalculated(conf) && Dictionary.validation_minimum,
  ],
  [`${CALCULATED_VARIABLES}.${NUMERIC}.maximum`]: [
    (value, conf) =>
      required(value) && typeCalculated(conf) && Dictionary.validation_maximum,
  ],
};

export const externalVariableRules = {
  [`${EXTERNAL_VARIABLES}.label`]: [
    (value) => required(value) && Dictionary.validation_externalvariable_label,
  ],
  [`${EXTERNAL_VARIABLES}.name`]: [
    (value) => required(value) && Dictionary.validation_externalvariable_name,
    name,
    nameSize,
    letterStart,
    (value, conf) =>
      validateDuplicatesExternal(value, conf) &&
      Dictionary.validation_externalvariable_existing,
  ],
  [`${EXTERNAL_VARIABLES}.${NUMERIC}.minimum`]: [
    (value, conf) =>
      required(value) && typeExternal(conf) && Dictionary.validation_minimum,
  ],
  [`${EXTERNAL_VARIABLES}.${NUMERIC}.maximum`]: [
    (value, conf) =>
      required(value) && typeExternal(conf) && Dictionary.validation_maximum,
  ],
};

export const collectedVariableRules = {
  [`${COLLECTED_VARIABLES}.label`]: [
    (value) => required(value) && Dictionary.validation_collectedvariable_label,
  ],
  [`${COLLECTED_VARIABLES}.name`]: [
    (value) => required(value) && Dictionary.validation_collectedvariable_name,
    name,
    nameSize,
    letterStart,
    (value, conf) =>
      validateDuplicatesCollected(value, conf) &&
      Dictionary.validation_collectedvariable_existing,
  ],
};

export const tableListMeasuresRules = {
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.label`]: [
    (value) => required(value) && Dictionary.validationMeasureLabel,
  ],

  // In table, for single response other than suggester, we need to select a codes list
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SINGLE_CHOICE}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]:
    [
      (value, { form }) => {
        const visHint = get(
          form,
          `${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SINGLE_CHOICE}.visHint`,
        );
        return visHint !== 'SUGGESTER' ? required(value) : undefined;
      },
    ],

  // // In table, for single response suggester,  we need to select a nomenclature
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SINGLE_CHOICE}.${DEFAULT_NOMENCLATURE_SELECTOR_PATH}.id`]:
    [
      (value, { form }) => {
        const visHint = get(
          form,
          `${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SINGLE_CHOICE}.visHint`,
        );
        return visHint === 'SUGGESTER' ? required(value) : undefined;
      },
    ],

  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${TEXT}.maxLength`]: [
    required,
    (value) => minValue(1)(value),
  ],
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${NUMERIC}.maximum`]:
    [(value) => required(value) && Dictionary.validation_maximum],
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${NUMERIC}.minimum`]:
    [(value) => required(value) && Dictionary.validation_minimum],
};

export const roundaboutRules = {
  name: [required, name],
  label: [required],
  nameLoop: [required, nameLoop],
  basedOn: [required],
  initialMember: [required],
  finalMember: [required],
  occurrenceLabel: [required],
};
