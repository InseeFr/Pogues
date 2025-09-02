import get from 'lodash.get';
import { date } from 'redux-form-validators';

import {
  DATATYPE_NAME,
  DIMENSION_TYPE,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import { required } from '../validate-rules';

const { SIMPLE, TABLE } = QUESTION_TYPE_ENUM;
const { DATE } = DATATYPE_NAME;
const { LIST_MEASURE } = DIMENSION_TYPE;
const { RESPONSE_FORMAT } = TABS_PATHS;

const tableListDateFormat = `${RESPONSE_FORMAT}.${TABLE}.${LIST_MEASURE}.${SIMPLE}.${DATE}.format`;

/** Check that a date respects a given format. */
function checkDate(format: string, value?: string): string | undefined {
  return date({
    format: format.toLowerCase(),
  })(value) as string | undefined;
}

/** Minimum must be scpecified and respect the format. */
export const dateMinimumRules = [
  (value?: string | number) => required(value) && Dictionary.validation_minimum,
  (value?: string, { form }: { [tableListDateFormat]?: string } = {}) => {
    // there is a value that does not match with the date format
    const dateFormat = get(form, tableListDateFormat) as string;

    return value && checkDate(dateFormat, value) && Dictionary.formatDate;
  },
];

/** Maximum must be scpecified and respect the format. */
export const dateMaximumRules = [
  (value?: string | number) => required(value) && Dictionary.validation_maximum,
  (value?: string, { form }: { [tableListDateFormat]?: string } = {}) => {
    // there is a value that does not match with the date format
    const dateFormat = get(form, tableListDateFormat) as string;

    return value && checkDate(dateFormat, value) && Dictionary.formatDate;
  },
];
