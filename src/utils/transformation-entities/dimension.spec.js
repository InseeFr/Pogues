import Dimension, { defaultDimensionState, defaultDimensionModel } from './dimension';
import { DIMENSION_TYPE } from 'constants/pogues-constants';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;

describe('dimension', () => {
  test('defaultDimensionState should be defined', () => {
    expect(defaultDimensionState).toEqual({
      type: undefined,
      mainDimensionFormat: undefined,
      label: undefined,
      totalLabel: undefined,
      codesList: undefined,
      numLinesMin: undefined,
      numLinesMax: undefined,
    });
  });
  test('defaultDimensionModel should be defined', () => {
    expect(defaultDimensionModel).toEqual({
      dimensionType: '',
      dynamic: 0,
    });
  });

  describe('testToModel', () => {
    const state = {
      codesListId: ['1'],
    };

    [PRIMARY, SECONDARY].forEach(type => {
      describe(type, () => {
        test('should add the default dynamic property', () => {
          expect(
            Dimension.stateToModel({
              codesListId: ['1'],
              type: PRIMARY,
            }).dynamic
          ).toEqual(0);
        });
        test('should add CodeList if defined', () => {
          expect(
            Dimension.stateToModel({
              codesListId: ['1'],
              type: PRIMARY,
            }).CodeListReference
          ).toEqual(['1']);

          expect(
            Dimension.stateToModel({
              type: PRIMARY,
            }).CodeListReference
          ).toBeUndefined();
        });
        test('should add totalLabel if totalLabel is defined and showTotalLabel is true', () => {
          expect(
            Dimension.stateToModel({
              type: PRIMARY,
              totalLabel: 'label',
              showTotalLabel: true,
            }).totalLabel
          ).toEqual('label');
          expect(
            Dimension.stateToModel({
              type: PRIMARY,
              totalLabel: 'label',
              showTotalLabel: false,
            }).totalLabel
          ).toBeUndefined();
        });
        test('should add dynamic if numLinesMin and numLinesMax are defined', () => {
          expect(
            Dimension.stateToModel({
              type: PRIMARY,
              totalLabel: 'label',
              showTotalLabel: false,
              numLinesMin: 1,
              numLinesMax: 2,
            }).dynamic
          ).toEqual('1-2');
        });
      });
    });

    test('should handle MEASURE code if label is defined', () => {
      state.type = MEASURE;
      state.label = 'label';
      expect(Dimension.stateToModel(state)).toEqual({
        dimensionType: state.type,
        dynamic: 0,
        Label: 'label',
      });
    });

    test('should handle MEASURE code if label is not defined', () => {
      state.type = MEASURE;
      state.label = undefined;
      expect(Dimension.stateToModel(state)).toEqual({
        dimensionType: state.type,
        dynamic: 0,
      });
    });
  });
});
