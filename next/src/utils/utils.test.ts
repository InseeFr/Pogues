import { describe, expect, test } from 'vitest';

import { getUrlFromCriteria, nameFromLabel } from './utils';

describe('Utils', () => {
  test.each([
    [undefined, ''],
    [{}, ''],
    [{ key1: 'value-key1' }, 'key1=value-key1'],
    [{ key1: undefined }, ''],
    [
      { key1: 'value-key1', key2: 'value-key2' },
      'key1=value-key1&key2=value-key2',
    ],
    [{ key1: 'value-key1', key2: undefined }, 'key1=value-key1'],
  ])('getUrlFromCriteria (%s) -> %s', (criteria, expected) => {
    expect(getUrlFromCriteria(criteria)).toBe(expected);
  });

  test.each([
    ['mon label', 'MONLABEL'],
    ['mon label est un peu trop long', 'MONLABELES'],
    ['mon 1er läbél', 'MON1ERLBL'],
  ])('nameFromLabel (%s) -> %s', (label, expected) => {
    expect(nameFromLabel(label)).toEqual(expected);
  });
});
