import sortBy from 'lodash.sortby';
import { toComponents, toId } from '../utils/component/component-utils';
import { COMPONENT_TYPE } from '../constants/pogues-constants';

const { FILTER, LOOP } = COMPONENT_TYPE;
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
  if (newComponent.type !== LOOP || newComponent.type !== FILTER) {
    const siblingsIds = activesComponents[newComponent.parent]
      ? activesComponents[newComponent.parent].children
      : [];
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
  return {};
}

/**
 * Function for reseting all weight of a list of components.
 * The weight of the first component is 0, the second one 1, ...
 *
 * @param {object[]} components List of components
 */
export function resetWeight(components) {
  return sortBy(components, ['weight']).reduce((acc, component, i) => {
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
 * This method will reset all weight of the active components list. We will go
 * through all children property, and reset the corresponding component
 *
 * @param {object} activesComponents The list of components currently displayed
 */
export function resetAllWeight(activesComponents) {
  return Object.keys(activesComponents)
    .map(key => activesComponents[key])
    .reduce((acc, component) => {
      if (component.children && component.children.length > 0) {
        return {
          ...acc,
          ...resetWeight(toComponents(component.children, activesComponents)),
        };
      }
      return acc;
    }, {});
}
