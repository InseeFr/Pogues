import { describe, expect, test } from 'vitest';

import {
  getStampFromEmail,
  getSupWeight,
  nameFromLabel,
  nestedStoreToFlat,
  storeToArray,
  verifyVariable,
} from './utils';

describe('Utils', () => {
  test.each([
    [undefined, []],
    [{ a: 1, b: 'b' }, [1, 'b']],
  ])('storeToArray (%s) -> %s', (store, expected) => {
    expect(storeToArray(store)).toEqual(expected);
  });

  test.each([
    [undefined, []],
    [{ a: { a: 1, b: 'b' } }, [1, 'b']],
  ])('nestedStoreToFlat (%s) -> %s', (store, expected) => {
    expect(nestedStoreToFlat(store)).toEqual(expected);
  });

  test.each([
    ['mon label', 'MONLABEL'],
    ['mon label est un peu trop long', 'MONLABELES'],
    ['mon 1er läbél', 'MON1ERLBL'],
  ])('nameFromLabel (%s) -> %s', (label, expected) => {
    expect(nameFromLabel(label)).toEqual(expected);
  });

  test('verifyVariable', () => {
    const label =
      'Value0: $Value1 $Value2 $Value3$ Value4 $Value5$= $Value6$* $Value_7& $Value8$+ $Value9!';
    expect(verifyVariable(label)).toBe(
      'Value0: $Value1$ $Value2$ $Value3$ Value4 $Value5$= $Value6$* $Value_7$& $Value8$+ $Value9$!',
    );
  });

  test.each([
    ['test@test.com', 'TEST'],
    ['test@test', 'TEST'],
    ['test@coucou-test.fr', 'COUCOU-TEST'],
    ['test@test_fr.super-test.com', 'TEST_FR'],
    ['test@test.super-test.com', 'TEST'],
  ])('getStampFromEmail (%s) -> %s', (email, expected) => {
    expect(getStampFromEmail(email)).toBe(expected);
  });

  test.each([[null], [undefined], [''], ['no-at-sign']])(
    'getStampFromEmail (%s) -> undefined',
    (email) => {
      expect(getStampFromEmail(email)).toBeUndefined();
    },
  );

  test.each([
    [[], 2],
    [[{ type: 'SEQUENCE', weight: 32 }], 33],
    [[{ type: 'SEQUENCE' }], 2],
    [[{ type: 'NOT_A_SEQUENCE', weight: 32 }], 2],
    [
      [
        { type: 'SEQUENCE', weight: 32 },
        { type: 'SEQUENCE', weight: 9000 },
      ],
      9001,
    ],
  ])('getSupWeight (%s) -> %s', (components, expected) => {
    expect(getSupWeight(components)).toEqual(expected);
  });
});
