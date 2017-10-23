import { LOAD_SEARCH_RESULT_SUCCESS } from 'actions/search';
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

actionHandlers[LOAD_SEARCH_RESULT_SUCCESS] = loadSearchResultSuccess;

export default createActionHandlers(actionHandlers);
