import { COMPONENT_TYPE } from '../../../constants/pogues-constants';
import {
  getClosestComponentIdByType,
  getWeight,
} from '../../../utils/component/generic-input-utils';

const { SUBSEQUENCE, QUESTION, SEQUENCE, EXTERNAL_ELEMENT } = COMPONENT_TYPE;

/**
 * Get new sequence placeholder
 *
 * It obtains the gap in the questionnaire hierarchy (parent id and weight) for a new
 * sequence, applying the sequence insertion rules.
 *
 * @param  {object}           components        List of components
 * @param  {string}           questionnaireId   Questionnaire id
 * @param  {object|undefined} activeComponent   The selected component
 * @return {object} Parent and weight
 */
export function getNewSequencePlaceholder(
  components,
  questionnaireId,
  activeComponent,
) {
  let weight = 0;
  const parent = components[questionnaireId] ? questionnaireId : '';

  if (parent !== '') {
    if (activeComponent) {
      const closestSequenceId = getClosestComponentIdByType(
        components,
        activeComponent,
        SEQUENCE,
      );
      weight = getWeight(components, closestSequenceId);
    } else {
      const heavySequenceId = getHeavyComponentIdFromGroupIds(
        components,
        components[questionnaireId].children,
      );
      weight = getWeight(components, heavySequenceId);
    }
  }

  return {
    parent,
    weight,
  };
}

/**
 * Get new question placeholder
 *
 * It obtains the gap in the questionnaire hierarchy (parent id and weight) for a new
 * question, applying the sub-sequence insertion rules.
 *
 * @param  {object}           components        List of components
 * @param  {object|undefined} activeComponent   The selected component
 * @return {object} Parent and weight
 */
export function getNewQuestionPlaceholder(components, activeComponent) {
  let weight = 0;
  let parent = '';
  let heavySequenceId;
  let heavySubsequenceId;
  let heavyQuestionId;

  if (activeComponent) {
    parent = getClosestComponentIdByType(
      components,
      activeComponent,
      SUBSEQUENCE,
    );
    if (parent === '')
      parent = getClosestComponentIdByType(
        components,
        activeComponent,
        SEQUENCE,
      );

    if (activeComponent.type === QUESTION) {
      weight = activeComponent.weight + 1;
    } else {
      weight = 0;
    }
  } else {
    heavySequenceId = getHeavyComponentIdByTypeFromGroupIds(
      components,
      Object.keys(components),
      SEQUENCE,
    );

    if (heavySequenceId !== '') {
      heavySubsequenceId = getHeavyComponentIdByTypeFromGroupIds(
        components,
        components[heavySequenceId].children,
        SUBSEQUENCE,
      );
      parent = heavySubsequenceId !== '' ? heavySubsequenceId : heavySequenceId;
      heavyQuestionId = getHeavyComponentIdByTypeFromGroupIds(
        components,
        components[parent].children,
        QUESTION,
      );
      weight = getWeight(components, heavyQuestionId);
    }
  }

  return {
    parent,
    weight,
  };
}

/**
 * Get new loop placeholder
 *
 * It finds from a list of components if it have at least one sequence
 *
 * @param  {object} components        List of components
 * @return {object|undefined} first sequence in component
 */
export function getNewLoopPlaceholder(components) {
  return !!Object.values(components).find(
    (component) =>
      (component.type === SEQUENCE && component.id !== 'idendquest') ||
      component.type === EXTERNAL_ELEMENT,
  );
}

/**
 * Get new roundabout placeholder
 *
 * It obtains the gap in the questionnaire hierarchy (parent id and weight) for a new
 * question, applying the sub-sequence insertion rules.
 *
 * @param  {object}           components        List of components
 * @param  {object|undefined} activeComponent   The selected component
 * @return {object} Parent and weight
 */
export function getNewRoundaboutPlaceholder(activeComponent) {
  if (activeComponent)
    return {
      parent: activeComponent.parent,
      weight: activeComponent.weight,
    };
  return { parent: '', weight: 0 };
}

/**
 * Get new sub-sequence placeholder
 *
 * It obtains the gap in the questionnaire hierarchy (parent id and weight) for a new
 * sub-sequence, applying the sub-sequence insertion rules.
 *
 * @param  {object}           components        List of components
 * @param  {object|undefined} activeComponent   The selected component
 * @return {object} Parent and weight
 */
export function getNewSubsequencePlaceholder(components, activeComponent) {
  let weight = 0;
  let parent = '';
  let heavyChildrenId;

  if (activeComponent) {
    parent = getClosestComponentIdByType(components, activeComponent, SEQUENCE);
  } else {
    parent = getHeavyComponentIdByTypeFromGroupIds(
      components,
      Object.keys(components),
      SEQUENCE,
    );
  }

  if (parent !== '') {
    if (activeComponent && activeComponent.type !== SEQUENCE) {
      if (activeComponent.type === SUBSEQUENCE) {
        weight = activeComponent.weight + 1;
      } else if (
        activeComponent.type === QUESTION &&
        components[activeComponent.parent].type === SUBSEQUENCE
      ) {
        /*
         * When we insert an element from a QUESTION, we get weight of the parent, and increase by one
         *
         * Example:
         * If we have this structure
         * Sequence 1
         *   -> SubSequence 1
         *     -> Question 1
         *
         * If the Question 1 has the focus, and we want to add a sub sequence, we will get this structure
         * Sequence 1
         *   -> SubSequence 1
         *     -> Question 1
         *   -> SubSequence 2
         */
        weight = components[activeComponent.parent].weight + 1;
      } else if (
        activeComponent.type === QUESTION &&
        components[activeComponent.parent].type === SEQUENCE
      ) {
        weight = activeComponent.weight + 1;
      } else {
        heavyChildrenId = getHeavyComponentIdFromGroupIds(
          components,
          components[parent].children,
        );
        weight = getWeight(components, heavyChildrenId);
      }
    } else {
      weight = 0;
    }
  }

  return {
    parent,
    weight,
  };
}

/**
 * Get heavy component id from group of ids
 *
 * It finds from a list of components id the id for the component with the heaviest weight of all them
 *
 * @param  {object} components        List of components
 * @param  {array}  subgroupIds       List of components id
 * @return {string} The id of the component with heaviest weight or an empty string
 */
function getHeavyComponentIdFromGroupIds(components, subgroupIds) {
  let heavyComponentId = '';
  if (subgroupIds.length > 0) {
    heavyComponentId = subgroupIds.reduce((acc, key) => {
      return components[key].weight > components[acc].weight ? key : acc;
    });
  }
  return heavyComponentId;
}

/**
 * Get heavy component id by type from group of ids
 *
 * It filter by component type a list of components id and it finds the id for the component with the
 * heaviest weight of all them
 *
 * @param  {object}                         components        List of components
 * @param  {array}                          subgroupIds       List of components id
 * @param  {QUESTION|SEQUENCE|SUBSEQUENCE}  type              Type of component
 * @return {string} The id of the component with heaviest weight and corresponding type or an empty string
 */
function getHeavyComponentIdByTypeFromGroupIds(components, subgroupIds, type) {
  let heavyComponentId = '';
  const componentsIds = subgroupIds.filter(
    (key) => components[key] && components[key].type === type,
  );
  if (componentsIds.length > 0) {
    heavyComponentId = getHeavyComponentIdFromGroupIds(
      components,
      componentsIds,
    );
  }
  return heavyComponentId;
}
