import { SET_ACTIVE_VARIABLES } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from 'actions/component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveCalculatedVariables(state, { activeCalculatedVariablesById }) {
  return activeCalculatedVariablesById;
}

export function updateActiveCalculatedVariables(state, { update: { activeCalculatedVariablesById } }) {
  return activeCalculatedVariablesById;
}

actionHandlers[SET_ACTIVE_VARIABLES] = setActiveCalculatedVariables;
actionHandlers[CREATE_COMPONENT] = updateActiveCalculatedVariables;
actionHandlers[UPDATE_COMPONENT] = updateActiveCalculatedVariables;

export default createActionHandlers(actionHandlers);
