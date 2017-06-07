import { LOAD_QUESTIONNAIRE_SUCCESS } from 'actions/questionnaire';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { update }) {
  return {
    ...state,
    ...update.componentById,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;

export default createActionHandlers(actionHandlers);
