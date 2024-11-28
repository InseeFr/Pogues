import { DELETE_APPSTATE, SET_ACTIVE_VARIABLES } from '../../actions/app-state';
import {
  CREATE_COMPONENT,
  DUPLICATE_COMPONENT,
  UPDATE_COMPONENT,
} from '../../actions/component';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveCollectedVariables(
  state,
  { collectedVariableByQuestion },
) {
  return collectedVariableByQuestion;
}

export function updateActiveCollectedVariables(
  state,
  { update: { activeCollectedVariablesById } },
) {
  return {
    ...state,
    ...activeCollectedVariablesById,
  };
}

export function deleteActiveCollectedVariables() {
  return {};
}

actionHandlers[SET_ACTIVE_VARIABLES] = setActiveCollectedVariables;
actionHandlers[UPDATE_COMPONENT] = updateActiveCollectedVariables;
actionHandlers[CREATE_COMPONENT] = updateActiveCollectedVariables;
actionHandlers[DUPLICATE_COMPONENT] = updateActiveCollectedVariables;
actionHandlers[DELETE_APPSTATE] = deleteActiveCollectedVariables;

export default createActionHandlers(actionHandlers);
