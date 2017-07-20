import { COMPONENT_TYPE } from 'constants/pogues-constants';
import { toComponents, isQuestion, isSubSequence, isSequence, toId } from 'utils/component/component-utils';
import { getClosestComponentIdByType } from 'utils/model/generic-input-utils';

const { SEQUENCE } = COMPONENT_TYPE;

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
    }

    if (key === newComponent.id) {
      return acc;
    }

    return {
      ...acc,
      [key]: {
        ...sibling,
        weight: siblingWeight,
      },
    };
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
 * This is method is only executed when we want to add a new SUBSEQUENCE when the current
 * selected component is a QUESTION. We have to move the next question to the newly created
 * SUBSEQUENCE
 * 
 * @param {object} activesComponents The list of components currently displayed
 * @param {string} selectedComponentId The Id of the currently selected component
 * @param {object} newComponent The new component (normally a SUBSEQUENCE)
 */
export function moveQuestionToSubSequence(activesComponents, selectedComponent, newComponent) {
  const oldParent = activesComponents[selectedComponent.parent];

  if (!oldParent) {
    return;
  }
  const questionToMove = toComponents(oldParent.children, activesComponents).find(
    child => child.weight === selectedComponent.weight + 1 && isQuestion(child)
  );
  let changes = {};
  if (questionToMove) {
    const newChildren = oldParent.children.filter(child => child !== questionToMove.id);
    questionToMove.weight = 0;
    changes = {
      ...moveComponents([questionToMove], newComponent),
      [questionToMove.parent]: {
        ...oldParent,
        children: newChildren,
      },
    };

    if (isSubSequence(oldParent)) {
      changes = {
        ...changes,
        ...resetWeight(newChildren.map(id => activesComponents[id])),
      };
      changes = {
        ...changes,
        ...increaseWeightOfAll(
          {
            ...activesComponents,
            ...changes,
          },
          newComponent
        ),
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
 * This method is executed when we want to add a Sequence from a Question or a SubSequence
 * Normally this method is only executed when
 *  - the new component is a SEQUENCE
 *  - the currently selected component is a QUESTION
 * 
 * @param {object} activesComponents The list of components currently displayed
 * @param {string} selectedComponentId  The ID of the selected component
 * @param {object} newComponent The latests created component
 */
export function moveQuestionAndSubSequenceToSequence(activesComponents, selectedComponent, newComponent) {
  const oldParent = selectedComponent ? activesComponents[selectedComponent.parent] : false;

  if (!oldParent) {
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
    .reduce((acc, component, i) => {
      return acc.concat([
        {
          ...component,
          weight: i,
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
  if (isSubSequence(oldParent)) {
    listOfComponentsToMove = [
      ...listOfComponentsToMove,
      ...parentSequence.children.map(c => activesComponents[c]).filter(c => c.weight > component.weight).map((c, i) => {
        c.weight = i + listOfComponentsToMove.length;
        return c;
      }),
    ];
  }

  /**
   * And we reset the weight of all component
   */
  listOfComponentsToMove = resetWeight(listOfComponentsToMove);

  const moves = {
    ...moveComponents(Object.keys(listOfComponentsToMove).map(key => listOfComponentsToMove[key]), newComponent),
    ...resetChildren(oldParent, listOfComponentsToKeep),
    ...resetChildren(
      parentSequence,
      toComponents(parentSequence.children, activesComponents).filter(c => c.weight <= component.weight)
    ),
  };

  return {
    ...moves,
    ...increaseWeightOfAll(
      {
        ...activesComponents,
        ...moves,
      },
      newComponent
    ),
  };
}

/**
  * Method used for the Drag&Drop behavior. Based on the dragged component, 
  * we will updated the new parent, the parent, the previous and/or new siblings
  * 
  * @param {object} activesComponents The list of components currently displayed
  * @param {string} moveComponentId The id of the dragged component
  * @param {string} newParentComponentId the id of the target component, 
  * @param {number} newWeight the new weight of dragged component in the target component
  */
export function moveComponent(activesComponents, moveComponentId, newParentComponentId, newWeight) {
  const componentToMove = {
    ...activesComponents[moveComponentId],
    parent: newParentComponentId,
    weight: newWeight,
  };

  /** 
    * If the source and target parent component is the same, only we need 
    * to update the weight of the children
    */
  if (newParentComponentId === activesComponents[moveComponentId].parent) {
    const moves = {
      [moveComponentId]: componentToMove,
      ...increaseWeightOfAll(activesComponents, componentToMove),
    };
    return resetWeight(Object.keys(moves).map(id => moves[id]));
  }

  /**
    * If the source and target parent component are not the same, we need to 
    * update them.
    */
  const oldParent = activesComponents[activesComponents[moveComponentId].parent];
  const oldChildren = oldParent.children.filter(id => id !== moveComponentId);
  let moves = {
    [moveComponentId]: componentToMove,
    [newParentComponentId]: {
      ...activesComponents[newParentComponentId],
      children: [...activesComponents[newParentComponentId].children, moveComponentId],
    },
    [oldParent.id]: {
      ...oldParent,
      children: oldChildren,
    },
  };

  /**
   * We now update the weight of all the siblings components
   */
  moves = {
    ...moves,
    ...increaseWeightOfAll(
      {
        ...activesComponents,
        ...moves,
      },
      componentToMove
    ),
  };

  return {
    ...moves,
    ...resetWeight(
      toComponents(oldChildren, {
        ...activesComponents,
        ...moves,
      })
    ),
  };
}
