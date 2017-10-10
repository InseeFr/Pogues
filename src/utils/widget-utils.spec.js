import { getControlId, toggleValueInList } from './widget-utils';

describe('Widget utils', () => {
  test('getControlId', () => {
    expect(getControlId('input', 'fakeName')).toEqual('');
    expect(getControlId('input', 'fakeName', 'fakeValue')).toEqual('input-fakeName-fakeValue');
    expect(getControlId('input', 'fakeName', 'this is a fake value')).toEqual('input-fakeName-this-is-a-fake-value');
  });

  test('toggleValueInList', () => {
    const list = ['fake1', 'fake2', 'fake3'];
    expect(toggleValueInList([], 'fake4')).toEqual(['fake4']);
    expect(toggleValueInList(list, 'fake1')).toEqual(['fake2', 'fake3']);
    expect(toggleValueInList(list, 'fake4')).toEqual(['fake1', 'fake2', 'fake3', 'fake4']);
  });
});
