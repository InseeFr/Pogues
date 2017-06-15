import { SET_ACTIVE_COMPONENTS } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveComponents(state, activeComponents) {
  return {
    activeComponents,
  };
}

actionHandlers[SET_ACTIVE_COMPONENTS] = setActiveComponents;

export default createActionHandlers(actionHandlers);
