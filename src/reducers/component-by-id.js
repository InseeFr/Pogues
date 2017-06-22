import { LOAD_QUESTIONNAIRE_SUCCESS } from 'actions/questionnaire';
import { LOAD_QLIST_SUCCESS } from 'actions/questionnaire-list';
import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { update: { componentById } }) {
  return {
    ...state,
    ...componentById,
  };
}

export function loadQuestionnaireListSuccess(state, updatesList) {
  const componentById = updatesList.reduce((acc, questionnaire) => {
    return { ...acc, ...questionnaire.componentById };
  }, {});
  return {
    ...state,
    ...componentById,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;

export default createActionHandlers(actionHandlers);
