import {
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '@/constants/pogues-constants';

import { maxValue, minValue, required } from '../validate-rules';

const { SIMPLE } = QUESTION_TYPE_ENUM;
const { DURATION } = DATATYPE_NAME;
const { RESPONSE_FORMAT } = TABS_PATHS;

export const durationRulesPTnHnM = {
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.maminutes`]: [
    (value?: string | number) => required(value),
    (value?: string | number) => minValue(0)(value),
    (value?: string | number) => maxValue(59)(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.miminutes`]: [
    (value?: string | number) => required(value),
    (value?: string | number) => minValue(0)(value),
    (value?: string | number) => maxValue(59)(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mahours`]: [
    (value?: string | number) => required(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mihours`]: [
    (value?: string | number) => required(value),
  ],
};

export const durationRulesPnYnM = {
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mamonths`]: [
    (value?: string | number) => required(value),
    (value?: string | number) => minValue(0)(value),
    (value?: string | number) => maxValue(11)(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mimonths`]: [
    (value?: string | number) => required(value),
    (value?: string | number) => minValue(0)(value),
    (value?: string | number) => maxValue(11)(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mayears`]: [
    (value?: string | number) => required(value),
  ],
  [`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.miyears`]: [
    (value?: string | number) => required(value),
  ],
};
