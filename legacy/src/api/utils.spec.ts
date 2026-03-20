import { getUrlFromCriteria } from './utils';

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
