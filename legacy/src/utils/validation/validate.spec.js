import { describe, expect, test } from 'vitest';

import {
  DATATYPE_NAME,
  QUESTION_TYPE_ENUM,
  TABS_PATHS,
} from '../../constants/pogues-constants';
import { validateQuestionForm } from './validate';

const { SIMPLE } = QUESTION_TYPE_ENUM;
const { DURATION } = DATATYPE_NAME;
const { RESPONSE_FORMAT } = TABS_PATHS;

const fakeValuePTnHnM = {
  [RESPONSE_FORMAT]: {
    [SIMPLE]: {
      [DURATION]: {
        format: 'PTnHnM',
        maminutes: '',
        miminutes: '',
        mahours: '',
        mihours: '',
      },
    },
  },
};

const fakeValuePnYnM = {
  [RESPONSE_FORMAT]: {
    [SIMPLE]: {
      [DURATION]: {
        format: 'PnYnM',
        mamonths: '',
        mimonths: '',
        mayears: '',
        miyears: '',
      },
    },
  },
};

describe('Special validation for duration', () => {
  test('should validate have right rules for duration (PTnHnM) question (required)', () => {
    let validationErrors;
    const setErrors = (errors) => {
      validationErrors = errors;
    };

    expect(() =>
      validateQuestionForm(fakeValuePTnHnM, setErrors, {}),
    ).toThrowError(/Submit Validation Failed/);

    expect(validationErrors).toMatchSnapshot();
  });

  test('should validate have right rules for duration (PnYnM) question (required)', () => {
    let validationErrors;
    const setErrors = (errors) => {
      validationErrors = errors;
    };

    expect(() =>
      validateQuestionForm(fakeValuePnYnM, setErrors, {}),
    ).toThrowError(/Submit Validation Failed/);

    expect(validationErrors).toMatchSnapshot();
  });
});
