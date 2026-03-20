import { describe, expect, test } from 'vitest';

import {
  filterStoreByProp,
  getControlId,
  getIndexItemsByAttrs,
  getKey,
  getValuesFromGenericOptions,
  toggleValueInList,
} from './widget-utils';

describe('Widget utils', () => {
  test.each([
    ['input', 'fakeName', undefined, 'input-fakeName'],
    ['input', 'fakeName', 'fakeValue', 'input-fakeName-fakeValue'],
    [
      'input',
      'fakeName',
      'this is a fake value',
      'input-fakeName-this-is-a-fake-value',
    ],
  ])('getControlId (%s, %s, %s) -> %s', (type, name, value, expected) => {
    expect(getControlId(type, name, value)).toEqual(expected);
  });

  test.each([])('getValuesFromGenericOptions', (input, expected) => {
    expect(getValuesFromGenericOptions(input)).toEqual(expected);
  });

  test.each([
    [[], 'fake4', ['fake4']],
    [['fake1', 'fake2', 'fake3'], 'fake1', ['fake2', 'fake3']],
    [
      ['fake1', 'fake2', 'fake3'],
      'fake4',
      ['fake1', 'fake2', 'fake3', 'fake4'],
    ],
  ])('toggleValueInList (%s, %s) -> %s', (items, item, expected) => {
    expect(toggleValueInList(items, item)).toEqual(expected);
  });

  test('filterStoreByProp', () => {
    const store = {
      FAKE_01: {
        id: 'FAKE_01',
        parent: '',
      },
      FAKE_02: {
        id: 'FAKE_02',
        parent: '',
      },
      FAKE_03: {
        id: 'FAKE_03',
        parent: 'FAKE_02',
      },
      FAKE_04: {
        id: 'FAKE_04',
        parent: 'FAKE_02',
      },
      FAKE_05: {
        id: 'FAKE_04',
        parent: 'FAKE_01',
      },
    };

    const expectedResult = [
      {
        id: 'FAKE_03',
        parent: 'FAKE_02',
      },
      {
        id: 'FAKE_04',
        parent: 'FAKE_02',
      },
    ];

    expect(filterStoreByProp(undefined, 'parent', 'FAKE_02')).toEqual([]);
    expect(filterStoreByProp(store, 'parent', 'FAKE_02')).toEqual(
      expectedResult,
    );
  });

  test.each([
    ['my simple key', 'my-simple-key'],
    ['My Uppercase Key', 'my-uppercase-key'],
  ])('getKey (%s) -> %s', (key, expected) => {
    expect(getKey(key)).toEqual(expected);
  });

  test.each([
    [
      { a: 'my-value-1', b: 'my-value-2' },
      [{ a: 'my-value-1', b: 'my-value-2' }],
      0,
    ],
    [{ a: 'my-value-1' }, [{ a: 'my-value-2' }], undefined],
    [
      { a: 'my-value-1', b: 'my-value-2' },
      [{ a: 'my-value-1', b: 'my-value-3' }],
      undefined,
    ],
    [
      { a: 'my-value-1' },
      [{ a: 'my-value-2' }, { a: 'my-value-1' }, { a: 'my-value-1' }],
      1,
    ],
  ])('getIndexItemsByAttrs (%s, %s) -> %s', (attrs, items, expected) => {
    expect(getIndexItemsByAttrs(attrs, items)).toEqual(expected);
  });
});
