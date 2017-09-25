import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

export function removeOrphansVariables(variablesIdsFromComponents, variablesStore = {}) {
  return Object.keys(variablesStore)
    .filter(key => variablesIdsFromComponents.indexOf(key) !== -1)
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: variablesStore[key],
      };
    }, {});
}

export function getVariablesIdsFromComponents(componentsStore) {
  return Object.keys(componentsStore)
    .filter(key => {
      return componentsStore[key].type === QUESTION;
    })
    .reduce((acc, key) => {
      const { collectedVariables, calculateVariables, externalVariables } = componentsStore[key];
      return [...acc, ...(collectedVariables || []), ...(calculateVariables || []), ...(externalVariables || [])];
    }, []);
}
