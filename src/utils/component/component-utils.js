import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

/**
 * This method return true if the component passed as a parameter is a QUESTION
 *
 * @param {object} component The component we should test
 */
export function isQuestion(component) {
  return component && component.type === QUESTION;
}

/**
 * This method return true if the component passed as a parameter is a SUBSEQUENCE
 *
 * @param {object} component The component we should test
 */
export function isSubSequence(component) {
  return component && component.type === SUBSEQUENCE;
}

/**
 * This method return true if the component passed as a parameter is a SEQUENCE
 *
 * @param {object} component The component we should test
 */
export function isSequence(component) {
  return component && component.type === SEQUENCE;
}

/**
  * This method return true if the component passed as a parameter is a QUESTIONNAIRE
  *
  * @param {object} component The component we should test
  */
export function isQuestionnaire(component) {
  return component && component.type === QUESTIONNAIRE;
}

/**
 * This method will return an array of component based of the ids passed as parameter
 *
 * @param {string[]} ids The list of IDs
 * @param {object} activesComponents The object representing the activated components
 */
export function toComponents(ids, activesComponents) {
  return ids.map(id => activesComponents[id]);
}

/**
 * This method will return an array of component's id
 *
 * @param {object[]} components The list of components
 */
export function toId(components) {
  return components.map(c => c.id);
}

/**
  * We can only move as a sibling two components of the same type.
  *
  * @param {object} droppedComponent the component we are moving
  * @param {object} draggedComponent the previous sibling of the moved component
  */
export function couldInsertToSibling(droppedComponent, draggedComponent) {
  return droppedComponent.type === draggedComponent.type;
}

/**
 * This method will check if in a specific use case, we can drag
 * a component inside another one.
 * This is possible when the dropped zone is a SEQUENCE or SUBSEQUENCE.
 *
 * @param {object} droppedComponent the dropped component
 * @param {object} draggedComponent the dragged component
 */
export function couldInsertAsChild(droppedComponent, draggedComponent) {
  return (
    (isSequence(droppedComponent) && isQuestion(draggedComponent)) ||
    (isSequence(droppedComponent) && isSubSequence(draggedComponent)) ||
    (isSubSequence(droppedComponent) && isQuestion(draggedComponent))
  );
}

/**
 * This method will return a sorted list of children ID, based on the parent
 * component passed as a parameter
 *
 * @param {object} components The list of components
 * @param {string} parent The ID of the component of the children we are looking for
 */
export function getSortedChildren(components, parent) {
  return Object.keys(components).filter(key => components[key].parent === parent).sort((key, nextKey) => {
    if (components[key].weight < components[nextKey].weight) return -1;
    if (components[key].weight > components[nextKey].weight) return 1;
    return 0;
  });
}

function getTargetsFromSequence(components, parent, weight, currentComponentId) {
  return components[parent].children.filter(id => currentComponentId !== id && components[id].weight > weight).reduce(
    (acc, key) => [
      ...acc,
      key,
      ...components[key].children.reduce((acu, id) => {
        return [...acu, id, ...components[id].children];
      }, []),
    ],
    []
  );
}

function getTargetsFromComponent(components, parent, weight, currentComponentId) {
  if (!components[parent].children) return [];

  return components[parent].children
    .filter(id => id !== currentComponentId && components[id].weight >= weight)
    .reduce((acc, id) => {
      return [...acc, id, ...(components[id].children || [])];
    }, []);
}

export function getTargets(
  components,
  componentType,
  selectedComponentId,
  componentParent,
  componentWeight,
  isNewComponent
) {
  let ids = [];
  let currentComponentId = selectedComponentId;
  let currentComponentType = componentType;
  let currentComponentParent = componentParent;
  let currentComponentWeight = componentWeight;

  if (!isNewComponent && selectedComponentId !== '') {
    if (currentComponentType === SEQUENCE) {
      ids = [
        ...components[selectedComponentId].children.reduce((acc, id) => {
          return [...acc, id, ...(components[id].children || [])];
        }, []),
      ];
    } else if (currentComponentType === SUBSEQUENCE) {
      ids = components[selectedComponentId].children;
    }
  }

  do {
    if (currentComponentType !== SEQUENCE) {
      ids = [
        ...ids,
        ...getTargetsFromComponent(components, currentComponentParent, currentComponentWeight, currentComponentId),
      ];
    } else {
      ids = [
        ...ids,
        ...getTargetsFromSequence(components, currentComponentParent, currentComponentWeight, currentComponentId),
      ];
    }

    currentComponentId = components[currentComponentParent].id;
    currentComponentType = components[currentComponentParent].type;
    currentComponentWeight = components[currentComponentParent].weight;
    currentComponentParent = components[currentComponentParent].parent;
  } while (currentComponentParent !== '');

  return ids;
}
