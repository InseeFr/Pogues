import { SET_ACTIVE_VARIABLES, DELETE_APPSTATE } from '../../actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from '../../actions/component';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveCalculatedVariables(
  state,
  { activeCalculatedVariablesById },
) {
  return activeCalculatedVariablesById;
}

export function updateActiveCalculatedVariables(
  state,
  { update: { activeCalculatedVariablesById } },
) {
  return activeCalculatedVariablesById;
}

export function deleteActiveCalculatedVariables() {
  return {};
}

actionHandlers[SET_ACTIVE_VARIABLES] = setActiveCalculatedVariables;
actionHandlers[CREATE_COMPONENT] = updateActiveCalculatedVariables;
actionHandlers[UPDATE_COMPONENT] = updateActiveCalculatedVariables;
actionHandlers[DELETE_APPSTATE] = deleteActiveCalculatedVariables;

export default createActionHandlers(actionHandlers);
