import { describe, expect, test } from 'vitest';

import { SET_ACTIVE_CODE_LISTS } from '../../actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from '../../actions/component';
import actionsHandlers, {
  setActiveCodeLists,
  updateActiveCodeLists,
} from './active-code-lists-by-id';

describe('setActiveCodeLists', () => {
  test('when called directly', () => {
    const result = setActiveCodeLists(
      { state: 'previous' },
      { activeCodeLists: 'activeCodeLists' },
    );
    expect(result).toEqual('activeCodeLists');
  });
  test('when called when we trigger SET_ACTIVE_VARIABLES', () => {
    const result = actionsHandlers(
      { state: 'previous' },
      {
        type: SET_ACTIVE_CODE_LISTS,
        payload: {
          activeCodeLists: 'activeCodeLists',
        },
      },
    );
    expect(result).toEqual('activeCodeLists');
  });
});

describe('updateActiveCodeLists', () => {
  test('when called directly', () => {
    const result = updateActiveCodeLists(
      { state: 'previous' },
      {
        update: {
          activeCodeListsById: { 1: 'activeCodeListsById' },
        },
      },
    );
    expect(result).toEqual({ state: 'previous', 1: 'activeCodeListsById' });
  });
  [CREATE_COMPONENT, UPDATE_COMPONENT].forEach((action) => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {
            update: {
              activeCodeListsById: { 1: 'activeCodeListsById' },
            },
          },
        },
      );
      expect(result).toEqual({ state: 'previous', 1: 'activeCodeListsById' });
    });
  });
});
