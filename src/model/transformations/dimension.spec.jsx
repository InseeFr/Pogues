import { describe, expect, test } from 'vitest';
import {
  DEFAULT_CODES_LIST_SELECTOR_PATH,
  DIMENSION_TYPE,
} from '../../constants/pogues-constants';
import { stateToRemote } from './dimension';

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

  test(`when the type is PRIMARY and has a CodesListState`, () => {
    const result = stateToRemote({
      type: PRIMARY,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: '1' },
    });

    expect(result).toEqual({
      dynamic: 'NON_DYNAMIC',
      dimensionType: PRIMARY,
      CodeListReference: '1',
    });
  });
  test(`when the type is PRIMARY and has a numLinesMin and numLinesMax`, () => {
    const result = stateToRemote({
      type: PRIMARY,
      isFixedLength: '0',
      fixedLength: 'formula',
      numLinesMin: 1,
      numLinesMax: 2,
    });

    expect(result).toEqual({
      dimensionType: PRIMARY,
      dynamic: 'DYNAMIC_LENGTH',
      isFixedLength: false,
      minimum: 1,
      maximum: 2,
    });
  });
  test(`when the type is PRIMARY and has a length fixed by a formula`, () => {
    const result = stateToRemote({
      type: PRIMARY,
      isFixedLength: '1',
      fixedLength: 'formula',
      numLinesMin: 1,
      numLinesMax: 2,
    });

    expect(result).toEqual({
      dimensionType: PRIMARY,
      dynamic: 'FIXED_LENGTH',
      isFixedLength: true,
      fixedLength: 'formula',
    });
  });
  test(`when the type is PRIMARY and has a numLinesMin but not numLinesMax`, () => {
    const result = stateToRemote({
      type: PRIMARY,
      numLinesMin: 1,
    });

    expect(result).toEqual({
      dynamic: 'NON_DYNAMIC',
      dimensionType: PRIMARY,
    });
  });
  test(`when the type is PRIMARY and has a numLinesMax but not numLinesMin`, () => {
    const result = stateToRemote({
      type: PRIMARY,
      numLinesMax: 2,
    });

    expect(result).toEqual({
      dynamic: 'NON_DYNAMIC',
      dimensionType: PRIMARY,
    });
  });

  test(`when the type is SECONDARY and has a CodesListState`, () => {
    const result = stateToRemote({
      type: SECONDARY,
      [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: '1' },
    });

    expect(result).toEqual({
      dynamic: '0',
      dimensionType: SECONDARY,
      CodeListReference: '1',
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
