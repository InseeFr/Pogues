import { describe, expect, test } from 'vitest';
import {
  ADD_LIST_INVALID_ITEMS,
  REMOVE_INVALID_ITEM,
  SET_INVALID_ITEMS,
} from '../../actions/app-state';
import actionsHandlers, {
  addListInvalidItem,
  removeInvalidItem,
  setInvalidItems,
} from './invalid-items-by-active-question';

describe('setActiveExternalVariables', () => {
  test('when called directly', () => {
    const result = setInvalidItems(
      { state: 'previous' },
      { invalidItems: 'invalidItems' },
    );
    expect(result).toEqual('invalidItems');
  });
  [SET_INVALID_ITEMS].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            invalidItems: 'invalidItems',
          },
        },
      );
      expect(result).toEqual('invalidItems');
    });
  });
});

describe('removeInvalidItem', () => {
  test('when called directly', () => {
    const result = removeInvalidItem(
      { 1: 'remove', 2: 'keep' },
      { invalidItemIdToRemove: '1' },
    );
    expect(result).toEqual({ 2: 'keep' });
  });
  [REMOVE_INVALID_ITEM].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { 1: 'remove', 2: 'keep' },
        {
          type: action,
          payload: { invalidItemIdToRemove: '1' },
        },
      );
      expect(result).toEqual({ 2: 'keep' });
    });
  });
});

describe('addListInvalidItem', () => {
  test('when called directly', () => {
    const result = addListInvalidItem({ 'test.1': 'remove', 2: 'keep' }, [
      ['test.1'],
    ]);
    expect(result).toEqual({
      'test.1': { id: 'test.1', type: 'test' },
      2: 'keep',
    });
  });
  [ADD_LIST_INVALID_ITEMS].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { 'test.1': 'remove', 2: 'keep' },
        {
          type: action,
          payload: [['test.1']],
        },
      );
      expect(result).toEqual({
        'test.1': { id: 'test.1', type: 'test' },
        2: 'keep',
      });
    });
  });
});
