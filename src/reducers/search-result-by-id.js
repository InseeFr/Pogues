import { LOAD_QLIST_REF_SUCCESS } from 'actions/questionnaire-list';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadSearchResultsSuccess(state, searchResultsList) {
  return searchResultsList.reduce((acc, result) => {
    return {
      ...acc,
      [result.id]: result,
    };
  }, {});
}

actionHandlers[LOAD_QLIST_REF_SUCCESS] = loadSearchResultsSuccess;

export default createActionHandlers(actionHandlers);
