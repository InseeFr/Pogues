import { LOAD_QUESTIONNAIRE_SUCCESS } from 'actions/questionnaire';
import { LOAD_QLIST_SUCCESS } from 'actions/questionnaire-list';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { update: { declarationByQuestionnaire } }) {
  return {
    ...state,
    ...declarationByQuestionnaire,
  };
}

export function loadQuestionnaireListSuccess(state, updatesList) {
  const declarationByQuestionnaire = updatesList.reduce((acc, questionnaire) => {
    return { ...acc, ...questionnaire.declarationByQuestionnaire };
  }, {});
  return {
    ...state,
    ...declarationByQuestionnaire,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;

export default createActionHandlers(actionHandlers);
