import { getUrlFromCriterias, storeToArray } from './utils';

describe('Utils', () => {
  test('getUrlFromCriterias', () => {
    expect(getUrlFromCriterias()).toBe('');
    expect(getUrlFromCriterias({})).toBe('');
    expect(getUrlFromCriterias({ key1: 'value-key1' })).toBe(
      '?key1=value-key1',
    );
    expect(getUrlFromCriterias({ key1: undefined })).toBe('');
    expect(
      getUrlFromCriterias({ key1: 'value-key1', key2: 'value-key2' }),
    ).toBe('?key1=value-key1&key2=value-key2');
    expect(getUrlFromCriterias({ key1: 'value-key1', key2: undefined })).toBe(
      '?key1=value-key1',
    );
  });
  test('storeToArray', () => {
    expect(storeToArray()).toEqual([]);
  });
});
