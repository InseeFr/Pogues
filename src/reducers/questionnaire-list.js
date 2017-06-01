import { LOAD_QLIST_SUCCESS } from 'actions/questionnaire-list';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireListSuccess(state, questionnairesList) {
  return {
    ...state,
    ...questionnairesList,
  };
}

actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;

export default createActionHandlers(actionHandlers);
