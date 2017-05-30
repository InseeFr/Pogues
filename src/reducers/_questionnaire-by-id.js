import { LOAD_QUESTIONNAIRE_SUCCESS } from 'actions/_questionnaire';
import { createActionHandlers } from 'utils/reducer/actions-handlers';
import { defaultQuestionnaire } from 'utils/reducer/default-states';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { id, update }) {
  return {
    ...state,
    [id]: { ...defaultQuestionnaire, ...update.questionnaire },
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;

export default createActionHandlers(actionHandlers);
