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
} from '@/constants/pogues-constants';

import {
  emptyMeasures,
  letterStart,
  minValue,
  name,
  required,
  requiredSelect,
} from '../validate-rules';
import { validCollectedVariables } from '../validate-variables';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { NUMERIC, TEXT, DATE } = DATATYPE_NAME;
const { PRIMARY, SECONDARY, LIST_MEASURE, MEASURE } = DIMENSION_TYPE;
const { NUMBER, FORMULA } = DIMENSION_CALCULATION;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { RESPONSE_FORMAT, COLLECTED_VARIABLES } = TABS_PATHS;

const singleChoiceVisHint = `${RESPONSE_FORMAT}.${SINGLE_CHOICE}.visHint`;

export const questionRules = {
  name: [required, name, letterStart],
  label: [required],
  [`${RESPONSE_FORMAT}.type`]: [requiredSelect],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${TEXT}.maxLength`]: [
    required,
    (value?: string | number) => minValue(1)(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${NUMERIC}.minimum`]: [required],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${NUMERIC}.maximum`]: [required],

  [`${RESPONSE_FORMAT}.${SIMPLE}.${DATE}.format`]: [requiredSelect],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DATE}.minimum`]: [required],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DATE}.maximum`]: [required],

  // for single response suggester, we need to select a nomenclature
  [`${RESPONSE_FORMAT}.${SINGLE_CHOICE}.${DEFAULT_NOMENCLATURE_SELECTOR_PATH}.id`]:
    [
      (
        value: string | number | null | undefined,
        { form }: { form: { [singleChoiceVisHint]?: string } },
      ) => {
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
      (
        value: string | number | null | undefined,
        { form }: { form: { [singleChoiceVisHint]?: string } },
      ) => {
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
    (value?: string | number) => minValue(1)(value),
  ],
  [`${RESPONSE_FORMAT}.${TABLE}.${MEASURE}.${SINGLE_CHOICE}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]:
    [required],
  [`${COLLECTED_VARIABLES}.collectedVariables`]: [validCollectedVariables],
};
