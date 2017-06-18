import { LOAD_QUESTIONNAIRE_SUCCESS } from 'home/actions/questionnaire';
import { LOAD_QLIST_SUCCESS } from 'home/actions/questionnaire-list';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { update: { conditionById } }) {
  return {
    ...state,
    ...conditionById,
  };
}

export function loadQuestionnaireListSuccess(state, updatesList) {
  const conditionById = updatesList.reduce((acc, questionnaire) => {
    return { ...acc, ...questionnaire.conditionById };
  }, {});
  return {
    ...state,
    ...conditionById,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;

export default createActionHandlers(actionHandlers);
