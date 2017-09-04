import { SET_ACTIVE_COLLECTED_VARIABLES } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from 'actions/component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveCollectedVariables(state, { collectedVariablesByQuestion }) {
  return collectedVariablesByQuestion;
}

export function updateActiveCollectedVariables(state, { update: { activeCollectedVariablesById } }) {
  return {
    ...state,
    ...activeCollectedVariablesById,
  };
}

actionHandlers[SET_ACTIVE_COLLECTED_VARIABLES] = setActiveCollectedVariables;
actionHandlers[UPDATE_COMPONENT] = updateActiveCollectedVariables;
actionHandlers[CREATE_COMPONENT] = updateActiveCollectedVariables;

export default createActionHandlers(actionHandlers);
