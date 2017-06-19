import { LOAD_QUESTIONNAIRE_SUCCESS, CREATE_QUESTIONNAIRE_SUCCESS } from 'actions/questionnaire';
import { LOAD_QLIST_SUCCESS } from 'actions/questionnaire-list';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { update: { codeByQuestionnaire } }) {
  return {
    ...state,
    ...codeByQuestionnaire,
  };
}

export function loadQuestionnaireListSuccess(state, updatesList) {
  const codeByQuestionnaire = updatesList.reduce((acc, questionnaire) => {
    return { ...acc, ...questionnaire.codeByQuestionnaire };
  }, {});
  return {
    ...state,
    ...codeByQuestionnaire,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[CREATE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;

export default createActionHandlers(actionHandlers);
