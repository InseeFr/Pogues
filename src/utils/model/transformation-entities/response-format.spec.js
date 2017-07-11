jest.dontMock('./response-format.js');

import { QUESTION_TYPE_ENUM, DIMENSION_TYPE, MAIN_DIMENSION_FORMATS } from 'constants/pogues-constants';
import ResponseFormat from './response-format';
import { defaultDimensionState } from 'utils/model/transformation-entities/dimension';

const { TABLE } = QUESTION_TYPE_ENUM;
const { PRIMARY, MEASURE } = DIMENSION_TYPE;
const { CODES_LIST } = MAIN_DIMENSION_FORMATS;

describe.skip('Transformation entities - ResponseFormat', () => {
  test('modelToState with a response format TABLE', () => {
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
});
