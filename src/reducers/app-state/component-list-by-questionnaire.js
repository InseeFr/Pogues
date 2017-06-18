import { LOAD_QUESTIONNAIRE_SUCCESS } from 'home/actions/questionnaire';
import { CREATE_COMPONENT, EDIT_COMPONENT } from 'actions/component';
import { createActionHandlers } from 'utils/reducer/actions-handlers';
import { createComponent as createComp } from 'utils/model/model-to-state-utils';

const actionHandlers = {};

export function loadQuestionnaireSuccess(state, { id, update }) {
  return {
    ...state,
    [id]: update.componentById,
  };
}

export function createComponent(state, { questionnaireId, component, parentId, weight }) {
  const siblings = state[questionnaireId][parentId].children;
  const components = { ...state[questionnaireId] };

  // Updating the siblings weights
  for (let i = 0; i < siblings.length; i += 1) {
    const key = siblings[i];
    if (components[key].weight >= weight) {
      components[key].weight += 1;
    }
  }

  return {
    ...state,
    [questionnaireId]: {
      ...components,
      [component.id]: createComp(component, parentId, weight),
      [parentId]: {
        ...state[questionnaireId][parentId],
        children: [...state[questionnaireId][parentId].children, component.id],
      },
    },
  };
}

function editComponent(state, { componentId, questionnaireId, update }) {
  return {
    ...state,
    [questionnaireId]: {
      ...state[questionnaireId],
      [componentId]: { ...state[questionnaireId][componentId], ...update },
    },
  };
}

actionHandlers[LOAD_QUESTIONNAIRE_SUCCESS] = loadQuestionnaireSuccess;
actionHandlers[CREATE_COMPONENT] = createComponent;
actionHandlers[EDIT_COMPONENT] = editComponent;

export default createActionHandlers(actionHandlers);
