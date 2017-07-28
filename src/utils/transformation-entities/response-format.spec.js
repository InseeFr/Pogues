jest.dontMock('./response-format.js');

import { QUESTION_TYPE_ENUM, DIMENSION_TYPE, DIMENSION_FORMATS } from 'constants/pogues-constants';
import ResponseFormat from './response-format';
import { defaultDimensionState } from './dimension';

const { TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = DIMENSION_FORMATS;

describe('Transformation entities - ResponseFormat', () => {
  test.skip('modelToState with a response format TABLE', () => {
    const model = {
      type: TABLE,
      dimensions: [
        { dynamic: 0, dimensionType: 'PRIMARY', codeListReference: 'ixbne3db' },
        { label: 'Pourcentage', dynamic: 0, dimensionType: 'MEASURE' },
      ],
      responses: [],
    };
    const expected = {
      type: TABLE,
      [TABLE]: {
        dimensions: [
          {
            ...defaultDimensionState,
            type: PRIMARY,
            codesList: 'ixbne3db',
            mainDimensionFormat: CODES_LIST,
          },
          {
            ...defaultDimensionState,
            type: MEASURE,
            label: 'Pourcentage',
          },
        ],
      },
    };

    expect(ResponseFormat.modelToState(model)).toEqual(expected);
  });
  test('formToState with a response format SIMPLE - TEXT', () => {
    const form = {
      type: 'SIMPLE',
      SIMPLE: {
        mandatory: true,
        type: 'TEXT',
        TEXT: {
          maxLength: 255,
          pattern: 'This is the pattern',
        },
      },
    };
    const expected = {
      type: 'SIMPLE',
      SIMPLE: {
        mandatory: true,
        type: 'TEXT',
        TEXT: {
          maxLength: 255,
          pattern: 'This is the pattern',
        },
      },
    };

    expect(ResponseFormat.formToState(form)).toEqual(expected);
  });
});
