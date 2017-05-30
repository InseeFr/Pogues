import { LOAD_QUESTIONNAIRE_SUCCESS } from 'actions/_questionnaire';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { id, update }) {
  return {
    ...state,
    [id]: update.componentById,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;

export default createActionHandlers(actionHandlers);
