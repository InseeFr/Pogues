import { SET_ACTIVE_COMPONENTS } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from 'actions/component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveComponents(state, activeComponents) {
  return activeComponents;
}

export function updateActiveComponents(state, { update: { activeComponentsById } }) {
  return {
    ...state,
    ...activeComponentsById,
  };
}

actionHandlers[SET_ACTIVE_COMPONENTS] = setActiveComponents;
actionHandlers[CREATE_COMPONENT] = updateActiveComponents;
actionHandlers[UPDATE_COMPONENT] = updateActiveComponents;

export default createActionHandlers(actionHandlers);
