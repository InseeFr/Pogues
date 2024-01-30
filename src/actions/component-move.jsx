import sortBy from 'lodash.sortby';
import {
  isSubSequence,
  isSequence,
  isQuestion,
  toComponents,
} from '../utils/component/component-utils';
import { getClosestComponentIdByType } from '../utils/component/generic-input-utils';
import { getDragnDropLevel } from '../utils/component/component-dragndrop-utils';
import { resetAllWeight, increaseWeightOfAll } from './component-update';
import {
  moveQuestionToSubSequence,
  moveQuestionAndSubSequenceToSequence,
} from './component-insert';

export function dummyFunction() {
  return 'Hello world';
}

/**
 * This method will get the new weight and new parent, based on the dragndrop level
 *
 * @param {object} activesComponents The list of components currently displayed
 * @param {object} droppedComponent the dropped component
 * @param {object} draggedComponent the dragged component
 * @param {number} dragndropLevel The level at which we want to drag the component
 */
export function getWeightAndParentId(
  activesComponents,
  droppedComponent,
  draggedComponent,
  dragndropLevel,
) {
  const getPreviousSibling =
    activesComponents[
      getClosestComponentIdByType(
        activesComponents,
        droppedComponent,
        draggedComponent.type,
      )
    ];

  let result;
  switch (dragndropLevel) {
    case -2:
      result = {
        newWeight: getPreviousSibling.weight + 1,
        newParentComponentId: getPreviousSibling.parent,
      };
      break;
    case -1:
      if (getPreviousSibling) {
        result = {
          newWeight: getPreviousSibling.weight + 1,
          newParentComponentId: getPreviousSibling.parent,
        };
      } else {
        result = {
          newWeight: droppedComponent.weight + 1,
          newParentComponentId: droppedComponent.parent,
        };
      }
      break;
    case 1:
      result = { newWeight: 0, newParentComponentId: droppedComponent.id };
      break;
    default:
      result = {
        newWeight: droppedComponent.weight + 1,
        newParentComponentId: droppedComponent.parent,
      };
      break;
  }
  return result;
}

/**
 * This method will attach all questions to its previous subsequence sibling
 *
 * @param {object} activesComponents The list of components currently displayed
 */
function attachQuestionToPreviousSubSequence(activesComponents) {
  const moves = {
    ...activesComponents,
  };
  const sequences = Object.keys(activesComponents).filter(key =>
    isSequence(moves[key]),
  );

  sequences.forEach(sequence => {
    const children = sortBy(toComponents(moves[sequence].children, moves), [
      'weight',
    ]);
    let idSubSequenceSibling;
    for (let i = 0; i < children.length; i += 1) {
      if (isSubSequence(children[i])) {
        idSubSequenceSibling = children[i].id;
      }
      if (isQuestion(children[i]) && idSubSequenceSibling) {
        moves[children[i].id] = {
          ...moves[children[i].id],
          parent: idSubSequenceSibling,
          weight: moves[idSubSequenceSibling].children.length,
        };
        moves[idSubSequenceSibling] = {
          ...moves[idSubSequenceSibling],
          children: [...moves[idSubSequenceSibling].children, children[i].id],
        };
        moves[children[i].parent] = {
          ...moves[children[i].parent],
          children: moves[children[i].parent].children.filter(
            id => id !== children[i].id,
          ),
        };
      }
    }
  });

  return moves;
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
export function moveComponent(
  activesComponents,
  idDroppedComponent,
  idDraggedComponent,
) {
  /**
   * If the draggedComponent and the dropped component are the same, we do nothing
   */
  if (idDroppedComponent === idDraggedComponent) {
    return {};
  }

  let droppedComponent = activesComponents[idDroppedComponent];
  const draggedComponent = activesComponents[idDraggedComponent];

  const dragndropLevel = getDragnDropLevel(
    { component: droppedComponent },
    draggedComponent,
  );
  const moveComponentId = draggedComponent.id;

  const { newWeight, newParentComponentId } = getWeightAndParentId(
    activesComponents,
    droppedComponent,
    draggedComponent,
    dragndropLevel,
  );

  let moves = {
    ...activesComponents,
  };

  /**
   * We update the parent and weight of the dragged component
   */
  const componentToMove = {
    ...moves[moveComponentId],
    parent: newParentComponentId,
    weight: newWeight,
  };

  moves[componentToMove.id] = componentToMove;

  const oldParent =
    activesComponents[activesComponents[moveComponentId].parent];

  /**
   * If the dragndrop level is < 0, we should call first the method used to insert
   * a SUBSEQUENCE or a SEQUENCE when another component is active
   */

  if (isSubSequence(componentToMove)) {
    let includeSelectedComponent = false;

    /**
     * If the dropped component is a SubSequence, we will set the drop component to be its first child
     */
    if (
      isSubSequence(droppedComponent) &&
      droppedComponent.children.length > 0
    ) {
      includeSelectedComponent = true;
      droppedComponent = toComponents(droppedComponent.children, moves).find(
        c => c.weight === 0,
      );
    }

    moves = {
      ...moves,
      ...moveQuestionToSubSequence(
        moves,
        droppedComponent,
        componentToMove,
        true,
        includeSelectedComponent,
      ),
    };
  } else if (isSequence(componentToMove)) {
    let includeSelectedComponent = false;

    /**
     * If the dropped component is a SubSequence or a Sequence, we will set the drop component to be its first child
     */
    if (
      (isSequence(droppedComponent) || isSubSequence(droppedComponent)) &&
      droppedComponent.children.length > 0
    ) {
      includeSelectedComponent = true;
      droppedComponent = toComponents(droppedComponent.children, moves).find(
        c => c.weight === 0,
      );
    }

    if (droppedComponent.parent !== componentToMove.parent) {
      moves = {
        ...moves,
        ...moveQuestionAndSubSequenceToSequence(
          moves,
          droppedComponent,
          componentToMove,
          includeSelectedComponent,
        ),
      };
    }
  }

  /**
   * If the source and target parent component is the same, we only need
   * to update the weight of the children
   */
  if (newParentComponentId === oldParent.id && dragndropLevel >= 0) {
    moves = {
      ...moves,
      ...resetAllWeight({
        ...moves,
        ...increaseWeightOfAll(moves, componentToMove),
      }),
    };
    return attachQuestionToPreviousSubSequence(moves);
  }

  /**
   * If the parent is not the same, we remove the component from the old parent, and add to
   * the new parent
   */
  if (newParentComponentId !== oldParent.id) {
    moves = {
      ...moves,
      [newParentComponentId]: {
        ...moves[newParentComponentId],
        children: [...moves[newParentComponentId].children, moveComponentId],
      },
      [oldParent.id]: {
        ...oldParent,
        children: oldParent.children.filter(id => id !== moveComponentId),
      },
    };
  }

  /**
   * We now update the weight of all the siblings components
   */
  moves = {
    ...moves,
    ...increaseWeightOfAll(moves, componentToMove),
  };

  moves = attachQuestionToPreviousSubSequence(moves);

  /**
   * We finish by reset all weight in order to all children starting with weight=0, and
   * for all next children, the weigt should equal to weight+1
   */
  return {
    ...moves,
    ...resetAllWeight(moves),
  };
}
