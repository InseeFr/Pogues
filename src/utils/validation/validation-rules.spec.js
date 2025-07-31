import { describe, expect, test } from 'vitest';

import {
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '../../constants/pogues-constants';
import { durationRulesPTnHnM, durationRulesPnYnM } from './validation-rules';

const { SIMPLE } = QUESTION_TYPE_ENUM;
const { DURATION } = DATATYPE_NAME;
const { RESPONSE_FORMAT } = TABS_PATHS;

describe('duration rules validation', () => {
  test('should validate have right rules for "PTnHnM" format', () => {
    expect(Object.keys(durationRulesPTnHnM)).toStrictEqual([
      `${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.maminutes`,
      `${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.miminutes`,
      `${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mahours`,
      `${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mihours`,
    ]);

    expect(
      durationRulesPTnHnM[`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.maminutes`]
        .length,
    ).toBe(3);
    expect(
      durationRulesPTnHnM[`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.miminutes`]
        .length,
    ).toBe(3);

    expect(
      durationRulesPTnHnM[`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mahours`]
        .length,
    ).toBe(1);
    expect(
      durationRulesPTnHnM[`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mihours`]
        .length,
    ).toBe(1);
  });

  test('should validate have right rules for "PnYnM" format', () => {
    expect(Object.keys(durationRulesPnYnM)).toStrictEqual([
      `${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mamonths`,
      `${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mimonths`,
      `${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mayears`,
      `${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.miyears`,
    ]);

    expect(
      durationRulesPnYnM[`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mamonths`]
        .length,
    ).toBe(3);
    expect(
      durationRulesPnYnM[`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mimonths`]
        .length,
    ).toBe(3);

    expect(
      durationRulesPnYnM[`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.mayears`]
        .length,
    ).toBe(1);
    expect(
      durationRulesPnYnM[`${RESPONSE_FORMAT}.${SIMPLE}.${DURATION}.miyears`]
        .length,
    ).toBe(1);
  });
});
