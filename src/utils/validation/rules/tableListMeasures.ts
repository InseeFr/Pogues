import get from 'lodash.get';

import {
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DEFAULT_NOMENCLATURE_SELECTOR_PATH,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import { minValue, required } from '../validate-rules';

const { SIMPLE, SINGLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { NUMERIC, TEXT } = DATATYPE_NAME;
const { LIST_MEASURE } = DIMENSION_TYPE;
const { RESPONSE_FORMAT } = TABS_PATHS;

const tableListSingleChoiceVisHint = `${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SINGLE_CHOICE}.visHint`;

export const tableListMeasuresRules = {
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.label`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validationMeasureLabel,
  ],

  // In table, for single response other than suggester, we need to select a codes list
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SINGLE_CHOICE}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]:
    [
      (
        value: string | number | null | undefined,
        { form }: { [tableListSingleChoiceVisHint]?: string },
      ) => {
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
      (
        value: string | number | null | undefined,
        { form }: { [tableListSingleChoiceVisHint]?: string },
      ) => {
        const visHint = get(
          form,
          `${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SINGLE_CHOICE}.visHint`,
        );
        return visHint === 'SUGGESTER' ? required(value) : undefined;
      },
    ],

  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${TEXT}.maxLength`]: [
    required,
    (value?: string | number) => minValue(1)(value),
  ],
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${NUMERIC}.maximum`]:
    [
      (value?: string | number) =>
        required(value) && Dictionary.validation_maximum,
    ],
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${NUMERIC}.minimum`]:
    [
      (value?: string | number) =>
        required(value) && Dictionary.validation_minimum,
    ],
};
