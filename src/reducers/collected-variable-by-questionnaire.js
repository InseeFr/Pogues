import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from 'actions/app-state';
import {
  LOAD_QUESTIONNAIRE_SUCCESS,
  CREATE_QUESTIONNAIRE_SUCCESS,
} from 'actions/questionnaire';
import { LOAD_QLIST_SUCCESS } from 'actions/questionnaire-list';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireSuccess(
  state,
  { update: { collectedVariableByQuestionnaire } },
) {
  return {
    ...collectedVariableByQuestionnaire,
  };
}

export function loadQuestionnaireListSuccess(state, updatesList) {
  return updatesList.reduce((acc, questionnaire) => {
    return { ...acc, ...questionnaire.collectedVariableByQuestionnaire };
  }, {});
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[CREATE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;
actionHandlers[SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;

export default createActionHandlers(actionHandlers);
