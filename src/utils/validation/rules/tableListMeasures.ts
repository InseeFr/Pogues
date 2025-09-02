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

import { minValue, required, requiredSelect } from '../validate-rules';
import { dateMaximumRules, dateMinimumRules } from './date';
import { minutesRules, monthsRules } from './duration';

const { SIMPLE, SINGLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { DATE, DURATION, NUMERIC, TEXT } = DATATYPE_NAME;
const { LIST_MEASURE } = DIMENSION_TYPE;
const { RESPONSE_FORMAT } = TABS_PATHS;

const tableListSingleChoiceVisHint = `${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SINGLE_CHOICE}.visHint`;
const tableListDurationFormat = `${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DURATION}.format`;
const tableListDateFormat = `${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DATE}.format`;

export const tableListMeasuresRules = {
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.label`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validationMeasureLabel,
  ],

  /* In table, for single response other than suggester, we need to select a codes list. */
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SINGLE_CHOICE}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`]:
    [
      (
        value: string | number | null | undefined,
        { form }: { [tableListSingleChoiceVisHint]?: string },
      ) => {
        const visHint = get(form, tableListSingleChoiceVisHint) as string;
        return visHint !== 'SUGGESTER' ? required(value) : undefined;
      },
    ],

  /* In table, for single response suggester,  we need to select a nomenclature. */
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SINGLE_CHOICE}.${DEFAULT_NOMENCLATURE_SELECTOR_PATH}.id`]:
    [
      (
        value: string | number | null | undefined,
        { form }: { [tableListSingleChoiceVisHint]?: string },
      ) => {
        const visHint = get(form, tableListSingleChoiceVisHint) as string;
        return visHint === 'SUGGESTER' ? required(value) : undefined;
      },
    ],

  /* Text measure must have a maximum length. */
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${TEXT}.maxLength`]: [
    required,
    (value?: string | number) => minValue(1)(value),
  ],

  /* Numeric measure must have minimum / maximum. */
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

  /* Date measure must have format. */
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DATE}.format`]: [
    (value?: string | string[]) =>
      requiredSelect(value) && Dictionary.validation_format,
  ],

  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DATE}.minimum`]:
    dateMinimumRules(tableListDateFormat),
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DATE}.maximum`]:
    dateMaximumRules(tableListDateFormat),

  /* Duration measure must have format / minimum / maximum. */
  [tableListDurationFormat]: [
    (value?: string | string[]) =>
      requiredSelect(value) && Dictionary.validation_format,
  ],

  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DURATION}.maminutes`]:
    [minutesRulesWithFormatCheck],
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DURATION}.miminutes`]:
    [minutesRulesWithFormatCheck],
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DURATION}.mahours`]:
    [
      (
        value: string | number,
        { form }: { [tableListDurationFormat]?: string },
      ) => {
        if (isDurationFormatMinutesHours({ form }))
          return required(value) && Dictionary.validation_maximum;
      },
    ],
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DURATION}.mihours`]:
    [
      (
        value: string | number,
        { form }: { [tableListDurationFormat]?: string },
      ) => {
        if (isDurationFormatMinutesHours({ form }))
          return required(value) && Dictionary.validation_minimum;
      },
    ],

  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DURATION}.mamonths`]:
    [monthsRulesWithFormatCheck],
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DURATION}.mimonths`]:
    [monthsRulesWithFormatCheck],
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DURATION}.mayears`]:
    [
      (
        value: string | number,
        { form }: { [tableListDurationFormat]?: string },
      ) => {
        if (isDurationFormatMonthsYears({ form }))
          return required(value) && Dictionary.validation_maximum;
      },
    ],
  [`${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DURATION}.miyears`]:
    [
      (
        value: string | number,
        { form }: { [tableListDurationFormat]?: string },
      ) => {
        if (isDurationFormatMonthsYears({ form }))
          return required(value) && Dictionary.validation_minimum;
      },
    ],
};

/** Check that the minute rule applies with the selected format and apply them. */
function minutesRulesWithFormatCheck(
  value: string | number,
  { form }: { [tableListDurationFormat]?: string },
) {
  if (isDurationFormatMinutesHours({ form }))
    return applyRules(minutesRules, value);
}

/** Check that the month rule applies with the selected format and apply them. */
function monthsRulesWithFormatCheck(
  value: string | number,
  { form }: { [tableListDurationFormat]?: string },
) {
  if (isDurationFormatMonthsYears({ form }))
    return applyRules(monthsRules, value);
}

/** Check if duration form is minutes / hours to know if we should apply rules. */
function isDurationFormatMinutesHours({
  form,
}: {
  [tableListDurationFormat]?: string;
}): boolean {
  const format = get(form, tableListDurationFormat) as string;
  return format === 'PTnHnM';
}

/** Check if duration form is months / years to know if we should apply rules. */
function isDurationFormatMonthsYears({
  form,
}: {
  [tableListDurationFormat]?: string;
}): boolean {
  const format = get(form, tableListDurationFormat) as string;
  return format === 'PnYnM';
}

/** Apply the rules from a list of rules. */
function applyRules(
  rules: ((v?: string | number) => string | undefined)[],
  value?: string | number,
): string[] {
  const res = [];
  for (const rule of rules) {
    const error = rule(value);
    if (error) res.push(error);
  }
  return res;
}
