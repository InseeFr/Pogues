import { SET_ACTIVE_EXTERNAL_VARIABLES } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from 'actions/component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveExternalVariables(state, { externalVariables }) {
  return externalVariables;
}

export function updateActiveExternalVariables(state, { update: { activeExternalVariablesById } }) {
  return {
    ...state,
    ...activeExternalVariablesById,
  };
}

actionHandlers[SET_ACTIVE_EXTERNAL_VARIABLES] = setActiveExternalVariables;
actionHandlers[CREATE_COMPONENT] = updateActiveExternalVariables;
actionHandlers[UPDATE_COMPONENT] = updateActiveExternalVariables;

export default createActionHandlers(actionHandlers);
