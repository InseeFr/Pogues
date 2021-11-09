import {
  LOAD_QUESTIONNAIRE_SUCCESS,
  LOAD_QUESTIONNAIRE_START,
  LOAD_QUESTIONNAIRE_FAILURE,
  CREATE_QUESTIONNAIRE_SUCCESS,
} from 'actions/questionnaire';
import {
  LOAD_QLIST_SUCCESS,
  DELETE_QLIST_SUCCESS,
} from 'actions/questionnaire-list';
import { SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

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

export function deleteQuestionnaireList() {
  return {};
}

export function loadQuestionnaireListSuccess(state, updatesList) {
  const questionnaireById = updatesList.reduce((acc, questionnaire) => {
    return { ...acc, ...questionnaire };
  }, {});
  return questionnaireById;
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QUESTIONNAIRE_START] = loadQuestionnaireStart;
actionHandlers[LOAD_QUESTIONNAIRE_FAILURE] = loadQuestionnaireFail;
actionHandlers[CREATE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[SAVE_ACTIVE_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;
actionHandlers[DELETE_QLIST_SUCCESS] = deleteQuestionnaireList;

export default createActionHandlers(actionHandlers);
