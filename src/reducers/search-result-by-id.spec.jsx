import { describe, expect, test } from 'vitest';
import {
  CLEAR_SEARCH_RESULTS,
  LOAD_SEARCH_RESULT_SUCCESS,
} from '../actions/search';
import actionsHandlers, {
  clearSearchResult,
  loadSearchResultSuccess,
} from './search-result-by-id';

describe('clearSearchResult', () => {
  test('when called directly', () => {
    const result = clearSearchResult({ state: 'previous' }, {});
    expect(result).toEqual({});
  });
  [CLEAR_SEARCH_RESULTS].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: {},
        },
      );
      expect(result).toEqual({});
    });
  });
});

describe('loadSearchResultSuccess', () => {
  test('when called directly', () => {
    const result = loadSearchResultSuccess({ state: 'previous' }, [
      { id: '1' },
      { id: '2' },
    ]);
    expect(result).toEqual({ 1: { id: '1' }, 2: { id: '2' } });
  });
  [LOAD_SEARCH_RESULT_SUCCESS].forEach(action => {
    test(`when called when we trigger ${action}`, () => {
      const result = actionsHandlers(
        { state: 'previous' },
        {
          type: action,
          payload: [{ id: '1' }, { id: '2' }],
        },
      );
      expect(result).toEqual({ 1: { id: '1' }, 2: { id: '2' } });
    });
  });
});
