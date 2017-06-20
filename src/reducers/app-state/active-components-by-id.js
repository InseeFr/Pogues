import { SET_ACTIVE_COMPONENTS } from 'actions/app-state';
import { CREATE_COMPONENT, UPDATE_COMPONENT } from 'actions/component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';
import { normalizeQuestion, normalizeSequence } from 'utils/model/model-to-state-utils';
import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

const actionHandlers = {};

export function setActiveComponents(state, activeComponents) {
  return activeComponents;
}

export function createComponent(state, data) {
  const siblings = state[data.parent].children;
  const components = { ...state };
  let newComponent;

  if (data.type === QUESTION) {
    newComponent = normalizeQuestion(data);
  } else {
    newComponent = normalizeSequence(data);
  }

  // Updating the siblings weights
  for (let i = 0; i < siblings.length; i += 1) {
    const key = siblings[i];
    if (components[key].weight >= data.weight) {
      components[key].weight += 1;
    }
  }

  return {
    ...components,
    [data.parent]: {
      ...components[data.parent],
      children: [...components[data.parent].children, newComponent.id],
    },
    [newComponent.id]: newComponent,
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
