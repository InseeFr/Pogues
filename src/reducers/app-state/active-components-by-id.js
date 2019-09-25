import {
  CREATE_COMPONENT,
  DUPLICATE_COMPONENT,
  UPDATE_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENT_PARENT,
  UPDATE_COMPONENT_ORDER,
  MOVE_COMPONENT,
} from 'actions/component';
import {
  SET_ACTIVE_COMPONENTS,
  CREATE_PAGE_BREAK,
  REMOVE_PAGE_BREAK,
} from 'actions/app-state';

import { createActionHandlers } from 'utils/reducer/actions-handlers';

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

export function createPageBreak(state, { id }) {
  return {
    ...state,
    [id]: {
      ...state[id],
      pageBreak: true,
    },
  };
}

export function removePageBreak(state, { id }) {
  return {
    ...state,
    [id]: {
      ...state[id],
      pageBreak: false,
    },
  };
}

actionHandlers[SET_ACTIVE_COMPONENTS] = setActiveComponents;
actionHandlers[REMOVE_COMPONENT] = setActiveComponents;

actionHandlers[CREATE_COMPONENT] = updateActiveComponents;
actionHandlers[DUPLICATE_COMPONENT] = updateActiveComponents;
actionHandlers[UPDATE_COMPONENT] = updateActiveComponents;
actionHandlers[UPDATE_COMPONENT_PARENT] = updateActiveComponents;
actionHandlers[UPDATE_COMPONENT_ORDER] = updateActiveComponents;
actionHandlers[MOVE_COMPONENT] = updateActiveComponents;

actionHandlers[CREATE_PAGE_BREAK] = createPageBreak;
actionHandlers[REMOVE_PAGE_BREAK] = removePageBreak;

export default createActionHandlers(actionHandlers);
