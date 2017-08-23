import { SET_ACTIVE_CALCULATED_VARIABLES } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from 'actions/component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveCalculatedVariables(state, { calculatedVariables }) {
  return calculatedVariables;
}

export function updateActiveCalculatedVariables(state, { update: { activeCalculatedVariablesById } }) {
  return {
    ...state,
    ...activeCalculatedVariablesById,
  };
}

actionHandlers[SET_ACTIVE_CALCULATED_VARIABLES] = setActiveCalculatedVariables;
actionHandlers[CREATE_COMPONENT] = updateActiveCalculatedVariables;
actionHandlers[UPDATE_COMPONENT] = updateActiveCalculatedVariables;

export default createActionHandlers(actionHandlers);
