import { SET_ACTIVE_DECLARATIONS, UPDATE_COMPONENT } from 'actions/app-state';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveDeclarations(state, activeDeclarations) {
  return activeDeclarations;
}

export function updateComponent(state, { componentId, update: { declarations } }) {
  return {
    ...state,
    [declarations.id]: {
      ...state[declarations.id],
      ...declarations,
    },
  };
}

actionHandlers[SET_ACTIVE_DECLARATIONS] = setActiveDeclarations;
actionHandlers[UPDATE_COMPONENT] = updateComponent;

export default createActionHandlers(actionHandlers);
