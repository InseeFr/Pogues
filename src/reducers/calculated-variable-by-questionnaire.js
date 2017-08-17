import { LOAD_QUESTIONNAIRE_SUCCESS, CREATE_QUESTIONNAIRE_SUCCESS } from 'actions/questionnaire';
import { LOAD_QLIST_SUCCESS } from 'actions/questionnaire-list';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { update: { calculatedVariableByQuestionnaire } }) {
  return {
    ...state,
    ...calculatedVariableByQuestionnaire,
  };
}

export function loadQuestionnaireListSuccess(state, updatesList) {
  const calculatedVariableByQuestionnaire = updatesList.reduce((acc, questionnaire) => {
    return { ...acc, ...questionnaire.calculatedVariableByQuestionnaire };
  }, {});
  return {
    ...state,
    ...calculatedVariableByQuestionnaire,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[CREATE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;

export default createActionHandlers(actionHandlers);
