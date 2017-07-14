import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { normalizeComponentFromForm, addIdsNewFormItems } from 'utils/model/form-state-utils';
import { uuid } from 'utils/data-utils';
import { getClosestComponentIdByType } from 'utils/model/generic-input-utils';
import Component from 'utils/model/transformation-entities/component';
import {
  toComponents,
  findComponentByPredicate,
  isQuestion,
  isSubSequence,
  isSequence,
  toId,
} from 'utils/component/component-utils';
const { QUESTION, SEQUENCE } = COMPONENT_TYPE;

export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';

/**
 * TODO TEST
 * This function is called when we add a component to a parent
 * @param {*} activeComponents The liste of components
 * @param {*} parentId The id of the parent we should update
 * @param {*} newComponentId The id of the created component
 */
export function updateNewComponentParent(activeComponents, parentId, newComponentId) {
  const parent = activeComponents[parentId];
  return {
    [parentId]: {
      ...parent,
      children: [...parent.children, newComponentId],
    },
  };
}

/**
 * Convert a list of codes into an object
 * [{id: '1'}] => { '1': {id: '1'}}
 * @param {object[]} codes 
 */
export function normalizeCodes(codes) {
  if (!codes) return {};
  return codes.reduce((acc, code) => {
    return {
      ...acc,
      [code.id]: code,
    };
  }, {});
}

/**
 * TODO DOC + TEST
 * @param {*} codes 
 */
export function normalizeCodeList(codesList, codeIds) {
  if (!codesList) return {};
  return {
    [codesList.id]: {
      ...codesList,
      codes: codeIds,
    },
  };
}

/**
 * Create component
 *
 * It creates a component in the store appState.activeComponents.
 *
 * @param   {object}  component The component data required for creation.
 * @param   {object}  parent    The component parent data.
 * @param   {object}  siblings  The siblings of the components in the tree.
 * @param   {integer} weight    The position of the component.
 * @param   {string}  type      The type of component
 * @return  {object}            CREATE_COMPONENT action
 */
export const createComponent = (form, parentId, weight, type) => (dispatch, getState) => {
  const id = uuid();
  let activeCodeListsById = {};
  let activeCodesById = {};

  if (type === QUESTION) {
    const responseFormat = form.responseFormat;
    const responseFormatType = responseFormat.type;
    responseFormat[responseFormatType] = addIdsNewFormItems(responseFormat[responseFormatType]);
    activeCodesById = normalizeCodes(responseFormat[responseFormatType].codes);
    activeCodeListsById = normalizeCodeList(responseFormat[responseFormatType].codesList, Object.keys(activeCodesById));
  }

  const componentFromForm = normalizeComponentFromForm(form, id, parentId, weight, type);

  return new Promise(resolve => {
    const result = dispatch({
      type: CREATE_COMPONENT,
      payload: {
        id,
        update: {
          activeComponentsById: componentFromForm,
          activeCodesById,
          activeCodeListsById,
        },
      },
    });
    resolve({
      payload: {
        id,
        lastCreatedComponent: result.payload.update.activeComponentsById,
      },
    });
  });
};

/**
 * This method will increase the weight of all siblings element of a new component
 * For example, if we have this structure:
 * -> Seq 1 (weight=0)
 *  -> Question 1 (weight=0)
 *  -> Question 2 (weight=1)
 * If we add a Question just after Question 1, we have this result : 
 * -> Seq 1 (weight=0)
 *  -> Question 1 (weight=0)
 *  -> Question 3 (weight=1)
 *  -> Question 2 (weight=2)
 * 
 * We have increase by one Question 2. 
 * 
 * @param {object} activesComponents The list of components currently displayed
 * @param {object} newComponent The latests created component
 */
export function increaseWeightOfAll(activesComponents, newComponent) {
  const siblingsIds = activesComponents[newComponent.parent].children;
  return siblingsIds.reduce((acc, key) => {
    const sibling = activesComponents[key];
    let siblingWeight = sibling.weight;
    if (key !== newComponent.id && newComponent.weight <= siblingWeight) {
      siblingWeight += 1;
      return {
        ...acc,
        [key]: {
          ...sibling,
          weight: siblingWeight,
        },
      };
    }
    return acc;
  }, {});
}

/**
 * Function for reseting all weight of a list of components. 
 * The weight of the first component is 0, the second one 1, ...
 * 
 * @param {object[]} components List of components 
 */
export function resetWeight(components) {
  return components.sort((c1, c2) => c1.weight - c2.weight).reduce((acc, component, i) => {
    return {
      ...acc,
      [component.id]: {
        ...component,
        weight: i,
      },
    };
  }, {});
}

/**
 * This method is used for updating elements when some of them become a children of the new one
 * We will update the parent property of this children, and the children property of the prent
 * 
 * TODO TEST
 * @param {object[]} componentsToMove The list of component that should be moved to the new Parent
 * @param {object} newParent The component will be used as Parent element
 */
export function moveComponents(componentsToMove, newParent) {
  let move = {};
  if (componentsToMove) {
    move = {
      ...componentsToMove.reduce((acc, c) => {
        return {
          ...acc,
          [c.id]: {
            ...c,
            parent: newParent.id,
          },
        };
      }, {}),
      [newParent.id]: {
        ...newParent,
        children: toId(componentsToMove),
      },
    };
  }
  return move;
}

/**
 * OK!!!
 * TODO DOC + TEST
 */
export function moveQuestionToSubSequence(activesComponents, selectedComponentId, newComponent) {
  const selectedComponent = activesComponents[selectedComponentId];

  if (!isQuestion(selectedComponent)) {
    return;
  }

  const oldParent = activesComponents[selectedComponent.parent];
  const questionToMove = findComponentByPredicate(
    toComponents(oldParent.children, activesComponents),
    child => child.weight === selectedComponent.weight + 1
  );
  let changes = {};
  if (questionToMove) {
    const newChildren = oldParent.children.filter(child => child !== questionToMove.id);
    questionToMove.weight = 0;
    changes = {
      [questionToMove.parent]: {
        ...oldParent,
        children: newChildren,
      },
      ...moveComponents([questionToMove], newComponent),
    };

    if (isSubSequence(oldParent)) {
      changes = {
        ...changes,
        ...resetWeight(newChildren.map(id => activesComponents[id])),
        ...increaseWeightOfAll(activesComponents, newComponent),
      };
    }
  }
  return changes;
}

/**
 * This function generate a componentById with the children passed as 
 * a parameter.
 * 
 * @param {string[]} component The component that should be updated
 * @param {object} children The new children array
 */
export function resetChildren(component, children) {
  return {
    [component.id]: {
      ...component,
      children: toId(children),
    },
  };
}

/**
 * TODO TEST
 * This method is executed when we want to add a Sequence from a Question or a SubSequence
 * @param {*} activesComponents The list of components currently displayed
 * @param {*} selectedComponentId  The ID of the selected component
 * @param {*} newComponent The latests created component
 */
export function moveQuestionAndSubSequenceToSequence(activesComponents, selectedComponentId, newComponent) {
  const selectedComponent = activesComponents[selectedComponentId];
  const oldParent = selectedComponent ? activesComponents[selectedComponent.parent] : false;

  if (!oldParent || (!isQuestion(selectedComponent) && !isSubSequence(selectedComponent))) {
    return;
  }

  /**
   * We get the list of components of the parent of the selected element
   */
  const listOfComponent = oldParent.children.map(id => activesComponents[id]);

  /**
   * Based on this list, we fetch only the component to move, 
   * and we construct an array with the new parent (the sequence)
   */
  let listOfComponentsToMove = listOfComponent
    .filter(child => child.weight > selectedComponent.weight)
    .reduce((acc, component) => {
      return acc.concat([
        {
          ...component,
          parent: newComponent.id,
        },
      ]);
    }, []);

  /**
   * List of components that should stay in the previous parent
   */
  const listOfComponentsToKeep = listOfComponent.filter(child => child.weight <= selectedComponent.weight);

  /**
   * We move up to the root Sequence
   */
  const parentSequence = activesComponents[getClosestComponentIdByType(activesComponents, selectedComponent, SEQUENCE)];

  /**
   * We move up to the first non-sequence element, starting from the SEQUENCE
   */
  let component = selectedComponent;
  while (component.parent && !isSequence(activesComponents[component.parent])) {
    component = activesComponents[component.parent];
  }

  /**
   * We merge the previous list of component with the children of the SEQUENCE
   */
  if (isSubSequence(oldParent.type)) {
    listOfComponentsToMove = listOfComponentsToMove.concat(
      parentSequence.children.map(c => activesComponents[c]).filter(c => c.weight > component.weight)
    );
  }

  /**
   * And we reset the weight of all component
   */
  listOfComponentsToMove = resetWeight(listOfComponentsToMove);

  return {
    ...moveComponents(Object.keys(listOfComponentsToMove).map(key => listOfComponentsToMove[key]), newComponent),
    ...resetChildren(oldParent, listOfComponentsToKeep),
    ...resetChildren(
      parentSequence,
      toComponents(parentSequence.children, activesComponents).filter(c => c.weight <= component.weight)
    ),
    ...increaseWeightOfAll(activesComponents, newComponent),
  };
}

/**
 * OK!!!!!
 * TODO DOC + TEST
 * @param {*} param0 
 */
export const updateParentChildren = ({ payload: { id, lastCreatedComponent } }) => (dispatch, getState) => {
  const state = getState();
  return dispatch({
    type: UPDATE_COMPONENT,
    payload: {
      id,
      lastCreatedComponent,
      update: {
        activeComponentsById: updateNewComponentParent(
          state.appState.activeComponentsById,
          lastCreatedComponent[id].parent,
          id
        ),
      },
    },
  });
};

/**
 * DOC + TEST
 * @param {*} param0 
 */
export const orderComponents = ({ payload: { id, lastCreatedComponent } }) => (dispatch, getState) => {
  const state = getState();
  const selectedComponentId = state.appState.selectedComponentId;
  const activesComponents = state.appState.activeComponentsById;

  let activeComponentsById;

  if (isSubSequence(lastCreatedComponent[id])) {
    activeComponentsById = moveQuestionToSubSequence(activesComponents, selectedComponentId, lastCreatedComponent[id]);
  } else if (isSequence(lastCreatedComponent[id])) {
    activeComponentsById = moveQuestionAndSubSequenceToSequence(
      activesComponents,
      selectedComponentId,
      lastCreatedComponent[id]
    );
  } else {
    activeComponentsById = increaseWeightOfAll(activesComponents, lastCreatedComponent[id]);
  }

  return dispatch({
    type: UPDATE_COMPONENT,
    payload: {
      id,
      update: {
        activeComponentsById,
      },
    },
  });
};
/**
 * Update component
 *
 * It updates in the store appState.activeComponents the corresponding component with the new values.
 *
 * @param   {string}  componentId The component id
 * @param   {object}  update      The properties which need to be updated
 * @return  {object}              UPDATE_COMPONENT action
 */
export const updateComponent = (form, id, parent, weight, type) => {
  let activeCodeListsById = {};
  let activeCodesById = {};

  if (type === QUESTION) {
    const responseFormat = form.responseFormat;
    const responseFormatType = responseFormat.type;
    responseFormat[responseFormatType] = addIdsNewFormItems(responseFormat[responseFormatType]);
    activeCodesById = normalizeCodes(responseFormat[responseFormatType].codes);
    activeCodeListsById = normalizeCodeList(responseFormat[responseFormatType].codesList, Object.keys(activeCodesById));
  }
  // const activeComponentsById = normalizeComponentFromForm(form, id, parent, weight, type);

  const activeComponentsById = {
    [form.id]: Component.formToState({ ...form, id, parent, weight, type }),
  };
  return {
    type: UPDATE_COMPONENT,
    payload: {
      id: form.id,
      update: {
        activeComponentsById,
        activeCodesById,
        activeCodeListsById,
      },
    },
  };
};
