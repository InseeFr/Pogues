import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import { getLocale } from '../../reducers/dictionary';
import Dictionary from '../dictionary/dictionary';

const {
  QUESTION,
  SEQUENCE,
  SUBSEQUENCE,
  QUESTIONNAIRE,
  LOOP,
  FILTER,
  NESTEDFILTRE,
  EXTERNAL_ELEMENT,
} = COMPONENT_TYPE;

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
 * This method return true if the component passed as a parameter is a EXTERNAL_ELEMENT
 *
 * @param {object} component The component we should test
 */
export function isExternalQuestionnaire(component) {
  return component && component.type === EXTERNAL_ELEMENT;
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
 * This method return true if the component passed as a parameter is a  LOOP
 *
 * @param {object} component The component we should test
 */
export function isLoop(component) {
  return component && component.type === LOOP;
}

/**
 * This method return true if the component passed as a parameter is a  NESTEDFILTRE
 *
 * @param {object} component The component we should test
 */
export function isNestedFilter(component) {
  return component && component.type === NESTEDFILTRE;
}

/**
 * This method return true if the component passed as a parameter is a  FILTER
 *
 * @param {object} component The component we should test
 */
export function isFilter(component) {
  return component && component.type === FILTER;
}
/**
 * This method will return an array of component based of the ids passed as parameter
 *
 * @param {string[]} ids The list of IDs
 * @param {object} activesComponents The object representing the activated components
 */
export function toComponents(ids, activesComponents) {
  return ids.map((id) => activesComponents[id]);
}

/**
 * This method will return an array of component's id
 *
 * @param {object[]} components The list of components
 */
export function toId(components) {
  return components.map((c) => c.id);
}

/**
 * This method will return a sorted list of children ID, based on the parent
 * component passed as a parameter
 *
 * @param {object} components The list of components
 * @param {string} parent The ID of the component of the children we are looking for
 */
export function getSortedChildren(components, parent) {
  return Object.keys(components)
    .filter((key) => components[key].parent === parent)
    .sort((key, nextKey) => {
      if (components[key].weight < components[nextKey].weight) return -1;
      if (components[key].weight > components[nextKey].weight) return 1;
      return 0;
    });
}

export function formatDate(date) {
  return new Intl.DateTimeFormat(getLocale(), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getState(final) {
  return final ? Dictionary.stateValidated : Dictionary.stateProvisional;
}

/**
 * This function is called when we add a component to a parent
 *
 * @param {object[]} activeComponents The list of components
 * @param {string} parentId The id of the parent we should update
 * @param {string} newComponentId The id of the created component
 */
export function updateNewComponentParent(
  activeComponents,
  parentId,
  newComponentId,
) {
  const parent = activeComponents[parentId];
  if (
    !isLoop(activeComponents[newComponentId]) &&
    !isFilter(activeComponents[newComponentId])
  ) {
    return {
      [parentId]: {
        ...parent,
        children: [...parent.children, newComponentId],
      },
    };
  }
  return {};
}
