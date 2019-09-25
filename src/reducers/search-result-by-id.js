import {
  LOAD_SEARCH_RESULT_SUCCESS,
  CLEAR_SEARCH_RESULTS,
} from 'actions/search';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadSearchResultSuccess(state, searchResultsList) {
  return searchResultsList.reduce((acc, result) => {
    return {
      ...acc,
      [result.id]: result,
    };
  }, {});
}

export function clearSearchResult() {
  return {};
}

actionHandlers[LOAD_SEARCH_RESULT_SUCCESS] = loadSearchResultSuccess;
actionHandlers[CLEAR_SEARCH_RESULTS] = clearSearchResult;

export default createActionHandlers(actionHandlers);
