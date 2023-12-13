import { SET_ACTIVE_VARIABLES, DELETE_APPSTATE } from '../../actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from '../../actions/component';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveExternalVariables(
  state,
  { activeExternalVariablesById },
) {
  return activeExternalVariablesById;
}

export function updateActiveExternalVariables(
  state,
  { update: { activeExternalVariablesById } },
) {
  return activeExternalVariablesById;
}

export function deleteActiveExternalVariables() {
  return {};
}

actionHandlers[SET_ACTIVE_VARIABLES] = setActiveExternalVariables;
actionHandlers[CREATE_COMPONENT] = updateActiveExternalVariables;
actionHandlers[UPDATE_COMPONENT] = updateActiveExternalVariables;
actionHandlers[DELETE_APPSTATE] = deleteActiveExternalVariables;

export default createActionHandlers(actionHandlers);
