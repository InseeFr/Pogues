import { SET_DEFAULT_STATE_QUESTIONNAIRE } from 'actions/app-state';
import { LOAD_QUESTIONNAIRE_SUCCESS, LOAD_QUESTIONNAIRE_FAILURE } from 'actions/questionnaire';
import { createActionHandlers } from 'utils/reducer/actions-handlers';
import { defaultQuestionnaireState } from 'utils/reducer/default-states';

const actionHandlers = {};

export function setDefaultStateQuestionnaire(state, id) {
  if (Object.prototype.hasOwnProperty.call(state, id)) return state;
  return {
    ...state,
    [id]: defaultQuestionnaireState,
  };
}

export function loadQuestionnaireSuccess(state, { id }) {
  const qrState = state[id];
  return {
    ...state,
    [id]: {
      ...qrState,
      loaded: true,
    },
  };
}

export function loadQuestionnaireFailure(state, { id }) {
  const qrState = state[id];
  return {
    ...state,
    [id]: {
      ...qrState,
      loaded: false,
    },
  };
}

actionHandlers[SET_DEFAULT_STATE_QUESTIONNAIRE] = setDefaultStateQuestionnaire;
actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[LOAD_QUESTIONNAIRE_FAILURE] = loadQuestionnaireFailure;

export default createActionHandlers(actionHandlers);
