import { SET_ACTIVE_COMPONENTS } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from 'actions/component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';
import { createComponent as createComponentState } from 'utils/model/model-to-state-utils';

const actionHandlers = {};

export function setActiveComponents(state, activeComponents) {
  return activeComponents;
}

export function createComponent(state, { component, parentId, weight }) {
  const siblings = state[parentId].children;
  const components = { ...state };

  // Updating the siblings weights
  for (let i = 0; i < siblings.length; i += 1) {
    const key = siblings[i];
    if (components[key].weight >= weight) {
      components[key].weight += 1;
    }
  }

  return {
    ...components,
    [parentId]: {
      ...components[parentId],
      children: [...components[parentId].children, component.id],
    },
    [component.id]: createComponentState(component, parentId, weight),
  };
}

export function updateComponent(state, { componentId, update }) {
  return {
    ...state,
    [componentId]: {
      ...state[componentId],
      ...update,
    },
  };
}

actionHandlers[SET_ACTIVE_COMPONENTS] = setActiveComponents;
actionHandlers[CREATE_COMPONENT] = createComponent;
actionHandlers[UPDATE_COMPONENT] = updateComponent;

export default createActionHandlers(actionHandlers);
