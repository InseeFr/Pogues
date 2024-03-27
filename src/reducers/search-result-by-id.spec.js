import actionsHandlers, {
  loadSearchResultSuccess,
  clearSearchResult,
} from './search-result-by-id';
import {
  LOAD_SEARCH_RESULT_SUCCESS,
  CLEAR_SEARCH_RESULTS,
} from '../actions/search';

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
