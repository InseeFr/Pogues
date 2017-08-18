import activeComponentsById from 'reducers/app-state/active-components-by-id';
import activeCodeListsById from 'reducers/app-state/active-code-lists-by-id';
import activeCodesById from 'reducers/app-state/active-codes-by-id';
import activeDeclarationsById from 'reducers/app-state/active-declarations-by-id';
import { SET_ACTIVE_QUESTIONNAIRE, SET_SELECTED_COMPONENT, UPDATE_ACTIVE_QUESTIONNAIRE } from 'actions/app-state';
import { LOAD_USER_SUCCESS } from 'actions/user';

const actionHandlers = {};

const defaultState = {
  user: {},
  activeQuestionnaire: {},
  activeComponentsById: {},
  errorsByComponent: {},
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
    activeCodesById: activeCodesById(state.activeCodesById, action),
    activeDeclarationsById: activeDeclarationsById(state.activeDeclarationsById, action),
  };
}
