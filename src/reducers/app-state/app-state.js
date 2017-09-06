import activeComponentsById from 'reducers/app-state/active-components-by-id';
import activeCodeListsById from 'reducers/app-state/active-code-lists-by-id';
import activeCalculatedVariablesById from 'reducers/app-state/active-calculated-variables-by-id';
import collectedVariableByQuestion from 'reducers/app-state/collected-variable-by-question';
import activeExternalVariablesById from 'reducers/app-state/active-external-variables-by-id';
import codeListsByActiveQuestion from 'reducers/app-state/code-lists-by-active-question';
import invalidItemsByActiveQuestion from 'reducers/app-state/invalid-items-by-active-question';
import { SET_ACTIVE_QUESTIONNAIRE, SET_SELECTED_COMPONENT, UPDATE_ACTIVE_QUESTIONNAIRE } from 'actions/app-state';
import { LOAD_USER_SUCCESS } from 'actions/user';

const actionHandlers = {};

const defaultState = {
  user: {},
  activeQuestionnaire: {},
  activeComponentsById: {},
  activeCodeListsById: {},
  activeCodesById: {},
  activeCalculatedVariablesById: {},
  errorsByCode: {},
  selectedComponentId: '',
};

export function loadUserSuccess(state, user) {
  return {
    ...state,
    user: user,
  };
}

export function setActiveQuestionnaire(state, questionnaire) {
  const { components, codeLists, ...activeQuestionnaire } = questionnaire;

  return {
    ...state,
    activeQuestionnaire,
  };
}

export function updateActiveQuestionnaire(state, updatedQuestionnaire) {
  return {
    ...state,
    activeQuestionnaire: {
      ...state.activeQuestionnaire,
      ...updatedQuestionnaire,
    },
  };
}

export function setSelectedComponentId(state, id) {
  return {
    ...state,
    selectedComponentId: id,
  };
}

actionHandlers[LOAD_USER_SUCCESS] = loadUserSuccess;
actionHandlers[SET_ACTIVE_QUESTIONNAIRE] = setActiveQuestionnaire;
actionHandlers[UPDATE_ACTIVE_QUESTIONNAIRE] = updateActiveQuestionnaire;
actionHandlers[SET_SELECTED_COMPONENT] = setSelectedComponentId;

// @TODO: Add the combine functionality to the generic createActionHandler method
export default function(state = defaultState, action) {
  if (!action) return state;
  const { type, payload } = action;
  const hndlr = actionHandlers[type];
  return {
    ...(hndlr ? hndlr(state, payload) : state),
    activeComponentsById: activeComponentsById(state.activeComponentsById, action),
    activeCodeListsById: activeCodeListsById(state.activeCodeListsById, action),
    activeCalculatedVariablesById: activeCalculatedVariablesById(state.activeCalculatedVariablesById, action),
    collectedVariableByQuestion: collectedVariableByQuestion(state.collectedVariableByQuestion, action),
    activeExternalVariablesById: activeExternalVariablesById(state.activeExternalVariablesById, action),
    codeListsByActiveQuestion: codeListsByActiveQuestion(state.codeListsByActiveQuestion, action),
    invalidItemsByActiveQuestion: invalidItemsByActiveQuestion(state.invalidItemsByActiveQuestion, action),
  };
}
