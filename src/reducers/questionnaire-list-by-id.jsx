import {
  LOAD_QLIST_SUCCESS,
  DELETE_QLIST_SUCCESS,
} from '../actions/questionnaire-list';
import { createActionHandlers } from '../utils/reducer/actions-handlers';

const actionHandlers = {};

export function deleteQuestionnaireList() {
  return {};
}

export function loadQuestionnaireListSuccess(state, updatesList) {
  const questionnaireById = updatesList.reduce((acc, questionnaire) => {
    return { ...acc, ...questionnaire };
  }, {});
  return questionnaireById;
}

actionHandlers[LOAD_QLIST_SUCCESS] = loadQuestionnaireListSuccess;
actionHandlers[DELETE_QLIST_SUCCESS] = deleteQuestionnaireList;

export default createActionHandlers(actionHandlers);
