import { LOAD_QUESTIONNAIRE_SUCCESS, CREATE_QUESTIONNAIRE_SUCCESS } from 'actions/questionnaire';
import { createActionHandlers } from 'utils/reducer/actions-handlers';
import { defaultQuestionnaire } from 'utils/reducer/default-states';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { id, update }) {
  return {
    ...state,
    [id]: { ...defaultQuestionnaire, ...update.questionnaire },
  };
}

export function createQuestionnaireSuccess(state, { id, newQuestionnaire }) {
  return {
    ...state,
    [id]: newQuestionnaire,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[CREATE_QUESTIONNAIRE_SUCCESS] = createQuestionnaireSuccess;

export default createActionHandlers(actionHandlers);
