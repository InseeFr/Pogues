import { SET_ACTIVE_COMPONENTS } from 'actions/app-state';
import {
  CREATE_COMPONENT,
  UPDATE_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENT_PARENT,
  UPDATE_COMPONENT_ORDER,
  MOVE_COMPONENT,
} from 'actions/component';
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
actionHandlers[UPDATE_COMPONENT_PARENT] = updateActiveComponents;
actionHandlers[UPDATE_COMPONENT_ORDER] = updateActiveComponents;
actionHandlers[MOVE_COMPONENT] = updateActiveComponents;
actionHandlers[REMOVE_COMPONENT] = setActiveComponents;

export default createActionHandlers(actionHandlers);
