import questionnaireById from './questionnaire-by-id';
import componentListByQuestionnaire from './component-list-by-questionnaire';
import { defaultAppState } from 'utils/reducer/default-states';
import { SET_ACTIVE_COMPONENT } from 'actions/app-state';
import { LOAD_USER_SUCCESS } from 'actions/user';

const actionHandlers = {};

export function loadUserSuccess(state, user) {
  return {
    ...state,
    user: user,
  };
}

export function setActiveComponent(state, id) {
  return {
    ...state,
    activeComponent: id,
  };
}

actionHandlers[LOAD_USER_SUCCESS] = loadUserSuccess;
actionHandlers[SET_ACTIVE_COMPONENT] = setActiveComponent;

// @TODO: Add the combine functionality to the generic createActionHandler method
export default function(state = defaultAppState, action) {
  if (!action) return state;
  const { type, payload } = action;
  const hndlr = actionHandlers[type];
  return {
    ...(hndlr ? hndlr(state, payload) : state),
    questionnaireById: questionnaireById(state.questionnaireById, action),
    componentListByQuestionnaire: componentListByQuestionnaire(state.componentListByQuestionnaire, action),
  };
}
