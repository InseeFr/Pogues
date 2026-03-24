import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from '../actions/app-state';
import {
  CREATE_QUESTIONNAIRE_SUCCESS,
  LOAD_QUESTIONNAIRE_FAILURE,
  LOAD_QUESTIONNAIRE_START,
  LOAD_QUESTIONNAIRE_SUCCESS,
} from '../actions/questionnaire';
import Dictionary from '../utils/dictionary/dictionary';
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
export function loadQuestionnaireFail(state, payload) {
  const { err, id } = payload;
  const finalMessage =
    err.statusCode === 404
      ? `${Dictionary.pageSearchNoResultsForId} ${id}.`
      : `${Dictionary.errorMessageQuest}.`;

  return {
    loader: false,
    loadingError: finalMessage,
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QUESTIONNAIRE_START] = loadQuestionnaireStart;
actionHandlers[LOAD_QUESTIONNAIRE_FAILURE] = loadQuestionnaireFail;
actionHandlers[CREATE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;

export default createActionHandlers(actionHandlers);
