import {
  DELETE_APPSTATE,
  SET_ACTIVE_COMPONENTS,
} from '../../actions/app-state';
import {
  CREATE_COMPONENT,
  DUPLICATE_COMPONENT,
  MOVE_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENT,
  UPDATE_COMPONENT_ORDER,
  UPDATE_COMPONENT_PARENT,
} from '../../actions/component';
import { createActionHandlers } from '../../utils/reducer/actions-handlers';

const actionHandlers = {};

export function setActiveComponents(state, activeComponents) {
  return activeComponents;
}

export function updateActiveComponents(
  state,
  { update: { activeComponentsById } },
) {
  return {
    ...state,
    ...activeComponentsById,
  };
}

export function deleteComponentsById() {
  return {};
}

actionHandlers[SET_ACTIVE_COMPONENTS] = setActiveComponents;
actionHandlers[REMOVE_COMPONENT] = setActiveComponents;

actionHandlers[CREATE_COMPONENT] = updateActiveComponents;
actionHandlers[DUPLICATE_COMPONENT] = updateActiveComponents;
actionHandlers[UPDATE_COMPONENT] = updateActiveComponents;
actionHandlers[UPDATE_COMPONENT_PARENT] = updateActiveComponents;
actionHandlers[UPDATE_COMPONENT_ORDER] = updateActiveComponents;
actionHandlers[MOVE_COMPONENT] = updateActiveComponents;

actionHandlers[DELETE_APPSTATE] = deleteComponentsById;

export default createActionHandlers(actionHandlers);
