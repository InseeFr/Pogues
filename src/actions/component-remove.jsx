import sortBy from 'lodash.sortby';
import find from 'lodash.find';
import takeWhile from 'lodash.takewhile';
import takeRight from 'lodash.takeright';
import {
  toComponents,
  isQuestion,
  isSubSequence,
  isLoop,
  isFilter,
  isNestedFilter,
  toId,
} from '../utils/component/component-utils';
import { COMPONENT_TYPE } from '../constants/pogues-constants';
import { resetWeight } from './component-update';

const { SEQUENCE } = COMPONENT_TYPE;

/**
 * This is method will return the new active components without the one we want
 * to remove
 *
 * @param {object} activesComponents The list of components currently displayed
 * @param {object} deletedComponent The component we want to remove
 */
export function removeComponentFromActivesComponent(
  activesComponents,
  deletedComponent,
) {
  return Object.values(activesComponents).reduce((acc, currentElement) => {
    if (
      currentElement.id !== deletedComponent.id &&
      currentElement.initialMember !== deletedComponent.id &&
      currentElement.finalMember !== deletedComponent.id
    ) {
      acc[currentElement.id] = {
        ...activesComponents[currentElement.id],
        children: activesComponents[currentElement.id]?.children
          ? activesComponents[currentElement.id].children.filter(
              childId => childId !== deletedComponent.id,
            )
          : [],
      };
    }
    return acc;
  }, {});
}

/**
 * This method is only used when we want to remove a leaf node. A leaf can be a QUESTION
 * or a SUBSEQUENCE/SEQUENCE without children
 *
 * @param {object} activesComponents The list of components currently displayed
 * @param {object} deletedComponent The component we want to remove
 */
export function removeLeafComponent(activesComponents, deletedComponent) {
  const moves = removeComponentFromActivesComponent(
    activesComponents,
    deletedComponent,
  );
  return {
    ...moves,
    ...resetWeight(
      toComponents(
        moves[activesComponents[deletedComponent.id].parent].children,
        moves,
      ),
    ),
  };
}

/**
 * This function will be executed when we want to remove a SUBSEQUENCE with children
 *
 * @param {object} activesComponents The list of components currently displayed
 * @param {object} deletedComponent The component we want to remove
 */
export function removeSubSequence(activesComponents, deletedComponent) {
  let moves = removeComponentFromActivesComponent(
    activesComponents,
    deletedComponent,
  );

  // We will get the previous component of the deleted component
  const previousSubSequence = activesComponents[
    deletedComponent.parent
  ].children
    .map(id => activesComponents[id])
    .find(c => c.weight === deletedComponent.weight - 1);

  let newChildren = deletedComponent.children;
  let newParentId;
  let reduceFn;

  if (!isSubSequence(previousSubSequence)) {
    // If the component is not a subsequence, we will move all SEQUENCE to the parent SEQUENCE
    newChildren = [
      ...deletedComponent.children,
      ...activesComponents[deletedComponent.parent].children,
    ];
    newParentId = deletedComponent.parent;
    reduceFn = (acc, id) => {
      if (id === deletedComponent.id) {
        return acc;
      }
      if (acc[id] && acc[id].parent === deletedComponent.id) {
        return {
          ...acc,
          [id]: {
            ...acc[id],
            parent: deletedComponent.parent,
            weight:
              deletedComponent.weight === 0
                ? acc[id].weight
                : deletedComponent.weight + acc[id].weight,
          },
        };
      }
      return {
        ...acc,
        [id]: {
          ...acc[id],
          weight:
            acc[id].weight >= deletedComponent.weight
              ? acc[id].weight + (deletedComponent.children.length - 1)
              : acc[id].weight,
        },
      };
    };
  } else {
    // If the previous component is a subsequence, we will move the QUESTIONS into this sibling subsequence
    newParentId = previousSubSequence.id;
    reduceFn = (acc, id) => {
      return {
        ...acc,
        [id]: {
          ...acc[id],
          parent: previousSubSequence.id,
          weight: acc[id].weight + previousSubSequence.children.length,
        },
      };
    };
  }

  moves = newChildren.reduce(reduceFn, {
    ...moves,
    [newParentId]: {
      ...moves[newParentId],
      children: [...moves[newParentId].children, ...deletedComponent.children],
    },
  });

  return {
    ...moves,
    ...resetWeight(
      toComponents(moves[deletedComponent.parent].children, {
        ...activesComponents,
        ...moves,
      }),
    ),
  };
}

/**
 * This function will be executed when we want to remove a SEQUENCE with children
 * @param {object} activesComponents The list of components currently displayed
 * @param {object} deletedComponent The component we want to remove
 */
export function removeSequence(activesComponents, deletedComponent) {
  let moves = removeComponentFromActivesComponent(
    activesComponents,
    deletedComponent,
  );
  const childrenToMove = sortBy(
    toComponents(deletedComponent.children, activesComponents),
    ['weight'],
  );
  const parent = activesComponents[deletedComponent.parent];

  const previousSequenceWeight = Object.values(activesComponents).reduce(
    (acc, component) => {
      if (
        component.type === SEQUENCE &&
        component.weight < deletedComponent.weight &&
        component.weight > acc
      )
        return component.weight;
      return acc;
    },
    0,
  );

  // We will find the previous sibling SEQUENCE
  const previousSequence = find(
    toComponents(parent.children, activesComponents),
    c => c.weight === previousSequenceWeight,
  );

  // From the previous SEQUENCE, we will get the last component
  const lastComponentFromPreviousSequence = sortBy(
    toComponents(previousSequence.children, activesComponents),
    ['weight'],
  )[previousSequence.children.length - 1];

  let firstQuestionsToMove = [];

  // If the last component is a subsequence, we will get the first n QUESTION of the deleted component
  if (isSubSequence(lastComponentFromPreviousSequence)) {
    firstQuestionsToMove = takeWhile(childrenToMove, c => isQuestion(c));
  }

  // Based on the previous firstQuestionsToMove array, we will get the other item in another array
  const lastComponentToMove = takeRight(
    childrenToMove,
    childrenToMove.length - firstQuestionsToMove.length,
  );

  let firstQuestionsToMoveTransformation = {};

  // If we have QUESTIONS to move to a SUBSEQUENCE
  if (firstQuestionsToMove.length > 0) {
    firstQuestionsToMoveTransformation = firstQuestionsToMove.reduce(
      (acc, c, index) => {
        return {
          ...acc,
          [c.id]: {
            ...c,
            parent: lastComponentFromPreviousSequence.id,
            weight: lastComponentFromPreviousSequence.children.length + index,
          },
        };
      },
      {
        [lastComponentFromPreviousSequence.id]: {
          ...lastComponentFromPreviousSequence,
          children: [
            ...lastComponentFromPreviousSequence.children,
            ...toId(firstQuestionsToMove),
          ],
        },
      },
    );
  }

  moves = {
    ...moves,
    ...lastComponentToMove.reduce((acc, component, index) => {
      return {
        ...acc,
        [component.id]: {
          ...component,
          parent: previousSequence.id,
          weight: previousSequence.children.length + index,
        },
      };
    }, moves),
    ...firstQuestionsToMoveTransformation,
    [previousSequence.id]: {
      ...previousSequence,
      children: [...previousSequence.children, ...toId(lastComponentToMove)],
    },
  };

  return {
    ...moves,
    ...resetWeight(
      toComponents(moves[deletedComponent.parent].children, {
        ...activesComponents,
        ...moves,
      }),
    ),
  };
}

/**
 * In this method, we will remove entirely a component, we will remove its id from its parent,
 * and reset the weight of all its siblings.
 *
 * @param {object} activesComponents The list of components currently displayed
 * @param {string} idDeletedComponent The id of the component we want to remove
 */
export function remove(activesComponents, idDeletedComponent) {
  const deletedComponent = activesComponents[idDeletedComponent];

  if (
    isLoop(deletedComponent) ||
    isFilter(deletedComponent) ||
    isNestedFilter(deletedComponent)
  ) {
    return removeComponentFromActivesComponent(
      activesComponents,
      deletedComponent,
    );
  }
  if (deletedComponent.children.length === 0) {
    return removeLeafComponent(activesComponents, deletedComponent);
  }

  if (isSubSequence(deletedComponent)) {
    return removeSubSequence(activesComponents, deletedComponent);
  }

  return removeSequence(activesComponents, deletedComponent);
}
