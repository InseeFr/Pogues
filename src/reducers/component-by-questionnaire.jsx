import {
  LOAD_QUESTIONNAIRE_SUCCESS,
  CREATE_QUESTIONNAIRE_SUCCESS,
} from '../actions/questionnaire';
import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from '../actions/app-state';
import { LOAD_QLIST_SUCCESS } from '../actions/questionnaire-list';
import { createActionHandlers } from '../utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireSuccess(
  state,
  { update: { componentByQuestionnaire } },
) {
  return {
    ...componentByQuestionnaire,
  };
}

export function loadQuestionnaireListSuccess(state, updatesList) {
  const componentByQuestionnaire = updatesList.reduce((acc, questionnaire) => {
    return { ...acc, ...questionnaire.componentByQuestionnaire };
  }, {});
  return {
    ...state,
    ...componentByQuestionnaire,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[CREATE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;

export default createActionHandlers(actionHandlers);
