import {
  LOAD_QUESTIONNAIRE_SUCCESS,
  CREATE_QUESTIONNAIRE_SUCCESS,
  DELETE_QUESTIONNAIRE_SUCCESS,
} from 'actions/questionnaire';
import { LOAD_QLIST_SUCCESS } from 'actions/questionnaire-list';
import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function loadQuestionnaireSuccess(
  state,
  { update: { questionnaireById } },
) {
  return {
    ...questionnaireById,
  };
}

export function loadQuestionnaireListSuccess(state, updatesList) {
  const questionnaireById = updatesList.reduce((acc, questionnaire) => {
    return { ...acc, ...questionnaire };
  }, {});
  return {
    ...state,
    ...questionnaireById,
  };
}

export function deleteQuestionnaireListSuccess(state, questionnairesList) {
  return questionnairesList;
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[CREATE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;
actionHandlers[DELETE_QUESTIONNAIRE_SUCCESS] = deleteQuestionnaireListSuccess;

export default createActionHandlers(actionHandlers);
