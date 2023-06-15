import { getAllVariables } from 'utils/variables/variables-utils';

export function questionnaireDuplicateVariables(
  collectedVariableByQuestion,
  activeExternalVariablesById,
  activeCalculatedVariablesById,
  activeQuestionnaire,
  externalQuestionnairesVariables,
  activeComponentsById,
) {
  const allVariables = getAllVariables(
    activeExternalVariablesById,
    activeCalculatedVariablesById,
    collectedVariableByQuestion,
    activeQuestionnaire,
    externalQuestionnairesVariables,
  );
  const externalQuestionnaires =
    activeQuestionnaire?.childQuestionnaireRef || [];

  if (allVariables.length === new Set(allVariables).size) return [];
  const duplicates = allVariables
    .filter((item, index) => index !== allVariables.indexOf(item))
    .map(duplicateVariable => ({
      variable: duplicateVariable,
      isCollected:
        Object.values(collectedVariableByQuestion || {}).some(question =>
          Object.values(question || {}).some(
            variable => variable.name === duplicateVariable,
          ),
        ) || false,
      isExternal: Object.values(activeExternalVariablesById).some(
        element => element.name === duplicateVariable,
      ),
      isCalculated: Object.values(activeCalculatedVariablesById).some(
        element => element.name === duplicateVariable,
      ),
      referenced: Object.values(externalQuestionnairesVariables)
        .filter(questionnaire =>
          externalQuestionnaires.includes(questionnaire.id),
        )
        .reduce((acc, quest) => {
          const variableType = Object.values(quest.variables).find(
            variable => variable.Name === duplicateVariable,
          )?.type;
          if (variableType === undefined) return acc;
          const qRefName = activeComponentsById[quest.id]?.name;
          return { ...acc, [qRefName]: variableType };
        }, {}),
    }));
  return duplicates;
}
