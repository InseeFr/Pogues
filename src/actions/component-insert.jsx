import sortBy from 'lodash.sortby';
import cloneDeep from 'lodash.clonedeep';
import { COMPONENT_TYPE } from '../constants/pogues-constants';
import {
  toComponents,
  isQuestion,
  isSubSequence,
  isSequence,
  toId,
  updateNewComponentParent,
} from '../utils/component/component-utils';
import { getClosestComponentIdByType } from '../utils/component/generic-input-utils';
import {
  resetWeight,
  increaseWeightOfAll,
  resetChildren,
} from './component-update';
import { uuid } from '../utils/utils';

const { SEQUENCE } = COMPONENT_TYPE;

/**
 * This method is used for updating elements when some of them become a children of the new one
 * We will update the parent property of this children, and the children property of the prent
 *
 * @param {object[]} componentsToMove The list of component that should be moved to the new Parent
 * @param {object} newParent The component will be used as Parent element
 */
export function moveComponents(componentsToMove, newParent, keepChildren) {
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
        children: !keepChildren
          ? toId(componentsToMove)
          : [...newParent.children, ...toId(componentsToMove)],
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
 * @param {boolean} includeSelectedComponent Should we add the selected component as a child of the newComponent. Or do we start with the next sibling ?
 */
export function moveQuestionToSubSequence(
  activesComponents,
  selectedComponent,
  newComponent,
  keepChildren,
  includeSelectedComponent,
) {
  const oldParent = activesComponents[selectedComponent.parent];
  let moves;
  if (oldParent) {
    /**
     * We will get the question we have to move, based on the keepChildren and includeSelectedComponent flags
     * If keepChildren is false, we will keep only the next sibling (selectedComponent.weight + 1)
     * If keepChildren is true, will keep all children with a weight bigger than the selected component
     * If includeSelectedComponent is true, we will also keep the component with a weight equal to the selected component
     */
    let questionsToMove = toComponents(
      oldParent.children,
      activesComponents,
    ).filter(
      child =>
        ((!keepChildren && child.weight === selectedComponent.weight + 1) ||
          (keepChildren &&
            (child.weight > selectedComponent.weight ||
              (includeSelectedComponent &&
                child.weight === selectedComponent.weight)))) &&
        isQuestion(child),
    );
    const questionsToMoveId = toId(questionsToMove);
    moves = activesComponents;

    /**
     * If questionsToMove has elements, we start doing the transformations
     */
    if (questionsToMove.length > 0) {
      const newChildren = oldParent.children.filter(
        child => questionsToMoveId.indexOf(child) < 0,
      );

      /**
       * If we need to keep the children of the newComponent, we have to update the weight of the inserted component
       */
      questionsToMove = questionsToMove.map((question, i) => {
        question.weight = !keepChildren ? 0 : newComponent.children.length + i;
        return question;
      });

      moves = {
        ...moves,
        ...moveComponents(questionsToMove, newComponent, keepChildren),
        [oldParent.id]: {
          ...oldParent,
          children: newChildren,
        },
      };
      if (!isQuestion(oldParent)) {
        moves = {
          ...moves,
          ...resetWeight(newChildren.map(id => moves[id])),
        };
        moves = {
          ...moves,
          ...increaseWeightOfAll(moves, newComponent),
        };
      }
    }
  }
  return moves;
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
 * @param {boolean} includeSelectedComponent Should we add the selected component as a child of the newComponent. Or do we start with the next sibling ?
 */
export function moveQuestionAndSubSequenceToSequence(
  activesComponents,
  selectedComponent,
  newComponent,
  includeSelectedComponent,
) {
  const oldParent = selectedComponent
    ? activesComponents[selectedComponent.parent]
    : false;
  let moves;
  if (oldParent) {
    /**
     * We get the list of components of the parent of the selected element
     */
    const listOfComponent = oldParent.children.map(id => activesComponents[id]);

    /**
     * Based on this list, we fetch only the component to move (with the
     * weight > or = to the weight of the selected component) and we
     * construct an array with an updated weight and parent for each component
     */
    let listOfComponentsToMove = sortBy(listOfComponent, ['weight'])
      .filter(
        child =>
          child.weight > selectedComponent.weight ||
          (includeSelectedComponent &&
            child.weight === selectedComponent.weight),
      )
      .reduce((acc, component, i) => {
        return acc.concat([
          {
            ...component,
            weight: i + newComponent.children.length,
            parent: newComponent.id,
          },
        ]);
      }, []);

    /**
     * List of components that should stay in the previous parent
     */
    const listOfComponentsToKeep = listOfComponent.filter(
      child =>
        child.weight < selectedComponent.weight ||
        (!includeSelectedComponent &&
          child.weight === selectedComponent.weight),
    );

    /**
     * We move up to the root Sequence
     */
    const parentSequence =
      activesComponents[
        getClosestComponentIdByType(
          activesComponents,
          selectedComponent,
          SEQUENCE,
        )
      ];

    /**
     * We move up to the first non-sequence element, starting from the SEQUENCE
     */
    let component = selectedComponent;
    while (
      component.parent &&
      !isSequence(activesComponents[component.parent])
    ) {
      component = activesComponents[component.parent];
    }

    /**
     * We merge the previous list of component with the children of the SEQUENCE
     */
    if (isSubSequence(oldParent)) {
      listOfComponentsToMove = [
        ...listOfComponentsToMove,
        ...parentSequence.children
          .map(c => activesComponents[c])
          .filter(c => c.weight > component.weight)
          .map((c, i) => {
            return {
              ...c,
              weight:
                i +
                newComponent.children.length +
                listOfComponentsToMove.length,
            };
          }),
      ];
    }

    /**
     * And we reset the weight of all component
     */
    listOfComponentsToMove = resetWeight([
      ...toComponents(newComponent.children, activesComponents),
      ...listOfComponentsToMove,
    ]);

    /**
     * 1. We move the components to the new inserted component
     * 2. We reset the children property of the old parent
     * 3. We reset the children of the old sequence
     */
    moves = {
      ...activesComponents,
      ...moveComponents(
        Object.keys(listOfComponentsToMove).map(
          key => listOfComponentsToMove[key],
        ),
        newComponent,
      ),
      ...resetChildren(oldParent, listOfComponentsToKeep),
      ...resetChildren(
        parentSequence,
        toComponents(parentSequence.children, activesComponents).filter(
          c =>
            c.weight < component.weight ||
            (!includeSelectedComponent && c.weight === component.weight),
        ),
      ),
    };

    moves = {
      ...moves,
      ...increaseWeightOfAll(moves, newComponent),
    };
  }

  return moves;
}

/**
 * Method used for creating a duplicate of an existing QUESTION
 *
 * @param {object} activesComponents The list of components currently displayed
 * @param {string} idComponent id of the component we want to duplicate
 */
export function duplicate(activesComponents, idComponent) {
  if (!isQuestion(activesComponents[idComponent])) {
    return {};
  }

  const id = uuid();
  const component = {
    [id]: {
      ...cloneDeep(activesComponents[idComponent]),
      id,
      weight: activesComponents[idComponent].weight + 1,
    },
  };
  return {
    ...component,
    ...updateNewComponentParent(
      activesComponents,
      activesComponents[idComponent].parent,
      id,
    ),
    ...increaseWeightOfAll(activesComponents, component[id]),
  };
}

export function duplicateComponentAndVars(
  activesComponents,
  collectedVariables = {},
  idComponent,
) {
  const stores = {
    activeComponentsById: {},
    activeCollectedVariablesById: {},
  };
  let duplicatedVariables = {};

  if (!isQuestion(activesComponents[idComponent])) {
    return stores;
  }

  const responseFormTypeForDuplicate =
    activesComponents[idComponent].responseFormat.type;

  const duplicatedComponent = {
    ...cloneDeep(activesComponents[idComponent]),
    id: uuid(),
    weight: activesComponents[idComponent].weight + 1,
    redirections: {},
    controls: {},
    responseFormat: {
      type: responseFormTypeForDuplicate,
      [responseFormTypeForDuplicate]: {
        ...activesComponents[idComponent].responseFormat[
          responseFormTypeForDuplicate
        ],
        id: uuid(),
      },
    },
    declarations: Object.keys(
      activesComponents[idComponent].declarations,
    ).reduce((acc, declarationId) => {
      const id = uuid();
      return {
        ...acc,
        [id]: {
          ...activesComponents[idComponent].declarations[declarationId],
          id,
        },
      };
    }, {}),
  };

  if (Object.keys(collectedVariables).length > 0) {
    duplicatedVariables = activesComponents[
      idComponent
    ].collectedVariables.reduce((acc, key) => {
      const id = uuid();
      return {
        ...acc,
        [id]: {
          ...collectedVariables[key],
          id,
        },
      };
    }, {});
  }

  stores.activeComponentsById = {
    [duplicatedComponent.id]: {
      ...duplicatedComponent,
      collectedVariables: Object.keys(duplicatedVariables),
    },
    ...updateNewComponentParent(
      activesComponents,
      activesComponents[idComponent].parent,
      duplicatedComponent.id,
    ),
    ...increaseWeightOfAll(activesComponents, duplicatedComponent),
  };

  stores.activeCollectedVariablesById = {
    [duplicatedComponent.id]: duplicatedVariables,
  };

  return stores;
}
