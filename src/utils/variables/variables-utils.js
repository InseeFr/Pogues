import { COMPONENT_TYPE } from 'constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

export function removeOrphansCollectedVariables(
  variablesIdsFromComponents = [],
  variablesStore = {},
) {
  return Object.keys(variablesStore)
    .filter(key => variablesIdsFromComponents.indexOf(key) !== -1)
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: variablesStore[key],
      };
    }, {});
}

export function getCollectedVariablesIdsFromComponents(componentsStore) {
  return Object.keys(componentsStore)
    .filter(key => {
      return componentsStore[key].type === QUESTION;
    })
    .reduce((acc, key) => {
      return [...acc, ...(componentsStore[key].collectedVariables || [])];
    }, []);
}

export function getAllVariables(
  activeExternalVariablesById,
  activeCalculatedVariablesById,
  collectedVariableByQuestion,
  activeQuestionnaire,
  externalQuestionnairesVariables,
) {
  const externalVariables = Object.values(
    activeExternalVariablesById || {},
  ).map(element => element.name);
  const calculatedVariables = Object.values(
    activeCalculatedVariablesById || {},
  ).map(element => element.name);
  const collectedVariables = Object.values(collectedVariableByQuestion || {})
    .map(
      question =>
        typeof question === 'object' &&
        Object.values(question).map(variable => variable.name),
    )
    .flat();
  const externalQuestionnaires =
    activeQuestionnaire?.childQuestionnaireRef || [];
  const referencedQuestionnairesVariables =
    externalQuestionnairesVariables &&
    Object.values(externalQuestionnairesVariables)
      .filter(questionnaire =>
        externalQuestionnaires.includes(questionnaire.id),
      )
      .reduce((acc, quest) => {
        return [
          ...acc,
          ...Object.values(quest.variables).map(variable => variable.Name),
        ];
      }, []);
  return collectedVariables.concat(
    externalVariables,
    calculatedVariables,
    referencedQuestionnairesVariables,
  );
}

export function hasDuplicateVariables(
  activeExternalVariablesById,
  activeCalculatedVariablesById,
  collectedVariableByQuestion,
  activeQuestionnaire,
  externalQuestionnairesVariables,
) {
  const allVariables = getAllVariables(
    activeExternalVariablesById,
    activeCalculatedVariablesById,
    collectedVariableByQuestion,
    activeQuestionnaire,
    externalQuestionnairesVariables,
  );
  return allVariables.length !== new Set(allVariables).size;
}
