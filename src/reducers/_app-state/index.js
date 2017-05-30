import questionnaireById from './_questionnaire-by-id';
import componentListByQuestionnaire from './_component-list-by-questionnaire';
import { defaultAppState } from 'utils/reducer/default-states';
import { SET_ACTIVE_COMPONENT } from 'actions/_app-state';

const actionHandlers = {};

export function setActiveComponent(state, id) {
  return {
    ...state,
    activeComponent: id,
  };
}

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
