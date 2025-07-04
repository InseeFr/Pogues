import { COMPONENT_TYPE } from '../../constants/pogues-constants';

const { SEQUENCE, LOOP, FILTER, EXTERNAL_ELEMENT } = COMPONENT_TYPE;

/**
 * Get closest component id by type
 *
 * Go over the active component ancestor until it's found an ancestor with the corresponding type
 *
 * @param  {object}                        components        List of components
 * @param  {object}                        activeComponent   Component selected
 * @param  {QUESTION|SEQUENCE|SUBSEQUENCE} type              Type of component
 * @return {string}   The closest component's id with the corresponding type or an empty string
 */
export function getClosestComponentIdByType(components, activeComponent, type) {
  let componentId = '';
  let currentComponent = activeComponent;
  while (
    currentComponent.parent !== '' &&
    currentComponent.type !== LOOP &&
    currentComponent.type !== FILTER
  ) {
    if (
      currentComponent.type === type ||
      ((currentComponent.type === SEQUENCE ||
        currentComponent.type === EXTERNAL_ELEMENT) &&
        (type === SEQUENCE || type === EXTERNAL_ELEMENT))
    ) {
      componentId = currentComponent.id;
      break;
    }
    currentComponent = components[currentComponent.parent];
  }
  return componentId;
}

/**
 * Get weight
 *
 * It calculates the current weight from the weight of a component passed
 *
 * @param  {object} components  List of components
 * @param  {string} siblingId   Component id
 * @return {string} The next component weight or 0
 */
export function getWeight(components, componentId) {
  return componentId !== '' ? components[componentId].weight + 1 : 0;
}
