import { SET_ACTIVE_CALCULATED_VARIABLES } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from 'actions/component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveCalcultedVariables(state, { calculatedVariables }) {
  return calculatedVariables;
}

export function updateActiveCalcultedVariables(state, { update: { activeCalculatedVariablesById } }) {
  return {
    ...state,
    ...activeCalculatedVariablesById,
  };
}

actionHandlers[SET_ACTIVE_CALCULATED_VARIABLES] = setActiveCalcultedVariables;
actionHandlers[CREATE_COMPONENT] = updateActiveCalcultedVariables;
actionHandlers[UPDATE_COMPONENT] = updateActiveCalcultedVariables;

export default createActionHandlers(actionHandlers);
