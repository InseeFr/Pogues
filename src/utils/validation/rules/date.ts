import get from 'lodash.get';
import { date } from 'redux-form-validators';

import {
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import { required } from '../validate-rules';

const { SIMPLE } = QUESTION_TYPE_ENUM;
const { DATE } = DATATYPE_NAME;
const { RESPONSE_FORMAT } = TABS_PATHS;

const simpleDateFormatPath = `${RESPONSE_FORMAT}.${SIMPLE}.${DATE}.format`;

/** Check that a date respects a given format.
 *
 * Returns the error message, or undefined if the format is respected */
function checkDate(format: string, value?: string): string | undefined {
  return date({
    format: format.toLowerCase(),
  })(value) as string | undefined;
}

/** Minimum must be scpecified and respect the format. */
export const dateMinimumRules = (formatPath: string) => [
  (value?: string) => required(value) && Dictionary.validation_minimum,
  (value?: string, { form }: { [formatPath]?: string } = {}) => {
    // there is a value that does not match with the date format
    const dateFormat = get(form, formatPath) as string;
    return value && checkDate(dateFormat, value) !== undefined
      ? Dictionary.formatDate
      : undefined;
  },
];

/** Maximum must be scpecified and respect the format. */
export const dateMaximumRules = (formatPath: string) => [
  (value?: string) => required(value) && Dictionary.validation_maximum,
  (value?: string, { form }: { [formatPath]?: string } = {}) => {
    // there is a value that does not match with the date format
    const dateFormat = get(form, formatPath) as string;

    return value && checkDate(dateFormat, value) !== undefined
      ? Dictionary.formatDate
      : undefined;
  },
];

export const dateRules = {
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DATE}.minimum`]:
    dateMinimumRules(simpleDateFormatPath),
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DATE}.maximum`]:
    dateMaximumRules(simpleDateFormatPath),
};
