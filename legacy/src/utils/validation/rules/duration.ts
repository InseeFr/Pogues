import {
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import { maxValue, minValue, required } from '../validate-rules';

const { SIMPLE } = QUESTION_TYPE_ENUM;
const { DURATION } = DATATYPE_NAME;
const { RESPONSE_FORMAT } = TABS_PATHS;

/** Minutes must be defined and included between 0 and 59. */
export const minutesRules = [
  required,
  (value?: string | number) =>
    minValue(0)(value) || maxValue(59)(value)
      ? Dictionary.validationDurationMinutesMustBeBetween0And59
      : undefined,
];

/** Months must be defined and included between 0 and 11. */
export const monthsRules = [
  required,
  (value?: string | number) =>
    minValue(0)(value) || maxValue(11)(value)
      ? Dictionary.validationDurationMonthsMustBeBetween0And11
      : undefined,
];

export const durationRulesPTnHnM = {
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.maminutes`]: minutesRules,
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.miminutes`]: minutesRules,
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mahours`]: [required],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mihours`]: [required],
};

export const durationRulesPnYnM = {
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mamonths`]: monthsRules,
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mimonths`]: monthsRules,
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mayears`]: [required],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.miyears`]: [required],
};
