import {
  LOAD_QUESTIONNAIRE_SUCCESS,
  LOAD_QUESTIONNAIRE_START,
  LOAD_QUESTIONNAIRE_FAILURE,
  CREATE_QUESTIONNAIRE_SUCCESS,
} from '../actions/questionnaire';
import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from '../actions/app-state';
import { createActionHandlers } from '../utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireStart() {
  return {
    loader: true,
  };
}

export function loadQuestionnaireSuccess(
  state,
  { update: { questionnaireById } },
) {
  return {
    ...questionnaireById,
    loader: false,
  };
}
export function loadQuestionnaireFail() {
  return {
    loader: false,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QUESTIONNAIRE_START] = loadQuestionnaireStart;
actionHandlers[LOAD_QUESTIONNAIRE_FAILURE] = loadQuestionnaireFail;
actionHandlers[CREATE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;

export default createActionHandlers(actionHandlers);
