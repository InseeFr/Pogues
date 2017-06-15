import activeComponentsById from './active-components-by-id';
import { SET_ACTIVE_QUESTIONNAIRE, SET_SELECTED_COMPONENT } from 'actions/app-state';
import { LOAD_USER_SUCCESS } from 'actions/user';

const actionHandlers = {};

const defaultState = {
  user: {},
  activeQuestionnaire: {},
  activeComponentsById: {},
  selectedComponent: '',
};

export function loadUserSuccess(state, user) {
  return {
    ...state,
    user: user,
  };
}

export function setActiveQuestionnaire(state, questionnaire) {
  const { components, ...activeQuestionnaire } = questionnaire;

  return {
    ...state,
    activeQuestionnaire,
  };
}

export function setSelectedComponent(state, id) {
  return {
    ...state,
    selectedComponent: id,
  };
}

actionHandlers[LOAD_USER_SUCCESS] = loadUserSuccess;
actionHandlers[SET_ACTIVE_QUESTIONNAIRE] = setActiveQuestionnaire;
actionHandlers[SET_SELECTED_COMPONENT] = setSelectedComponent;

// @TODO: Add the combine functionality to the generic createActionHandler method
export default function(state = defaultState, action) {
  if (!action) return state;
  const { type, payload } = action;
  const hndlr = actionHandlers[type];
  return {
    ...(hndlr ? hndlr(state, payload) : state),
    activeComponentsById: activeComponentsById(state.activeComponentsById, action),
  };
}
