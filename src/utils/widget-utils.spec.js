import { getControlId, toggleValueInList, filterStoreByProp, storeToArray } from './widget-utils';

describe('Widget utils', () => {
  test('getControlId', () => {
    expect(getControlId('input', 'fakeName')).toEqual('input-fakeName');
    expect(getControlId('input', 'fakeName', 'fakeValue')).toEqual('input-fakeName-fakeValue');
    expect(getControlId('input', 'fakeName', 'this is a fake value')).toEqual('input-fakeName-this-is-a-fake-value');
  });

  test('toggleValueInList', () => {
    const list = ['fake1', 'fake2', 'fake3'];
    expect(toggleValueInList([], 'fake4')).toEqual(['fake4']);
    expect(toggleValueInList(list, 'fake1')).toEqual(['fake2', 'fake3']);
    expect(toggleValueInList(list, 'fake4')).toEqual(['fake1', 'fake2', 'fake3', 'fake4']);
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
    expect(filterStoreByProp(store, 'parent', 'FAKE_02')).toEqual(expectedResult);
  });

  test('storeToArray', () => {
    expect(storeToArray()).toEqual([]);
  });
});
