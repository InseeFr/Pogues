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
      dimensionType: MEASURE,
    });
  });
  test('when the type is MEASURE with a LABEL', () => {
    const result = stateToRemote({
      type: MEASURE,
      label: 'Label',
    });

    expect(result).toEqual({
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
  test(`when the type is PRIMARY and has a minLines and maxLines`, () => {
    const result = stateToRemote({
      type: PRIMARY,
      minLines: 1,
      maxLines: 2,
    });

    expect(result).toEqual({
      dimensionType: PRIMARY,
      dynamic: 'DYNAMIC_LENGTH',
      MinLines: 1,
      MaxLines: 2,
    });
  });
  test(`when the type is PRIMARY and has a length fixed by a formula`, () => {
    const result = stateToRemote({
      type: PRIMARY,
      fixedLength: 'formula',
    });

    expect(result).toEqual({
      dimensionType: PRIMARY,
      dynamic: 'FIXED_LENGTH',
      FixedLength: 'formula',
    });
  });
  test(`when the type is PRIMARY and has a minLines but not maxLines`, () => {
    const result = stateToRemote({
      type: PRIMARY,
      minLines: 1,
    });

    expect(result).toEqual({
      dynamic: 'NON_DYNAMIC',
      dimensionType: PRIMARY,
    });
  });
  test(`when the type is PRIMARY and has a maxLines but not minLines`, () => {
    const result = stateToRemote({
      type: PRIMARY,
      maxLines: 2,
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
    dimensionType: 'FAKE TYPE',
  });
});
