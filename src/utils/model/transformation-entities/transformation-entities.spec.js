jest.dontMock('./dimension.js');
import { DIMENSION_TYPE, MAIN_DIMENSION_FORMATS } from 'constants/pogues-constants';

import Dimension, { defaultDimensionState } from './dimension';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = MAIN_DIMENSION_FORMATS;

describe('Transformation entities', () => {
  describe('Dimension', () => {
    test("should return default state dimension if it's not initializated", () => {
      expect(new Dimension().getStateData()).toEqual(defaultDimensionState);
    });
    test('should return expected state dimension data when is initializated', () => {
      const model = {
        dimensionType: 'PRIMARY',
        dynamic: '-',
        totalLabel: 'This is a total label',
      };
      const expected = {
        ...defaultDimensionState,
        type: PRIMARY,
        mainDimensionFormat: LIST,
        totalLabel: model.totalLabel,
        numLinesMin: 0,
        numLinesMax: 0,
      };
      expect(new Dimension().initFromModel(model).getStateData()).toEqual(expected);
    });
    test('should return expected dimension data in transformation to model', () => {
      const state = {
        ...defaultDimensionState,
        type: PRIMARY,
        mainDimensionFormat: LIST,
        totalLabel: 'This is a total label',
        numLinesMin: 0,
        numLinesMax: 0,
      };
      const expected = {
        dimensionType: 'PRIMARY',
        dynamic: '0-0',
        totalLabel: state.totalLabel,
      };
      expect(new Dimension().initFromState(state).transformToModel()).toEqual(expected);
    });
  });
});
