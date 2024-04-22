import { stateToRemote } from './dimension';
import {
  DIMENSION_TYPE,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from '../../constants/pogues-constants';

const { PRIMARY, SECONDARY, MEASURE } = DIMENSION_TYPE;
describe('dimension tranformations', () => {
  test('when the type is MEASURE without a LABEL', () => {
    const result = stateToRemote({
      type: MEASURE,
    });

    expect(result).toEqual({
      dynamic: '0',
      dimensionType: MEASURE,
    });
  });
  test('when the type is MEASURE with a LABEL', () => {
    const result = stateToRemote({
      type: MEASURE,
      label: 'Label',
    });

    expect(result).toEqual({
      dynamic: '0',
      dimensionType: MEASURE,
      Label: 'Label',
    });
  });

  [PRIMARY, SECONDARY].forEach(type => {
    test(`when the type is ${type} and has a CodesListState`, () => {
      const result = stateToRemote({
        type: type,
        [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: '1' },
      });

      expect(result).toEqual({
        dynamic: '0',
        dimensionType: type,
        CodeListReference: '1',
      });
    });
    test(`when the type is ${type} and has a totalLabel and showTotalLabel=true`, () => {
      const result = stateToRemote({
        type: type,
        totalLabel: 'totalLabel',
        showTotalLabel: true,
      });

      expect(result).toEqual({
        dynamic: '0',
        dimensionType: type,
        totalLabel: 'totalLabel',
      });
    });
    test(`when the type is ${type} and has a totalLabel and showTotalLabel=false`, () => {
      const result = stateToRemote({
        type: type,
        totalLabel: 'totalLabel',
        showTotalLabel: false,
      });

      expect(result).toEqual({
        dynamic: '0',
        dimensionType: type,
      });
    });
    test(`when the type is ${type} and has a numLinesMin and numLinesMax`, () => {
      const result = stateToRemote({
        type: type,
        numLinesMin: 1,
        numLinesMax: 2,
      });

      expect(result).toEqual({
        dimensionType: type,
        dynamic: '1-2',
      });
    });
    test(`when the type is ${type} and has a numLinesMin but not numLinesMax`, () => {
      const result = stateToRemote({
        type: type,
        numLinesMin: 1,
      });

      expect(result).toEqual({
        dynamic: '0',
        dimensionType: type,
      });
    });
    test(`when the type is ${type} and has a numLinesMax but not numLinesMin`, () => {
      const result = stateToRemote({
        type: type,
        numLinesMax: 2,
      });

      expect(result).toEqual({
        dynamic: '0',
        dimensionType: type,
      });
    });
  });

  test('when the type is not PRIMARY, SECONDATY neither MEASURE', () => {
    const result = stateToRemote({
      type: 'FAKE TYPE',
    });

    expect(result).toEqual({
      dynamic: '0',
      dimensionType: 'FAKE TYPE',
    });
  });
});
