import { getAllVariables } from 'utils/variables/variables-utils';

export function questionnaireDuplicateVariables(
  collectedVariableById,
  activeExternalVariablesById,
  activeCalculatedVariablesById,
  activeQuestionnaire,
  externalQuestionnairesVariables,
  activeComponentsById,
) {
  const allVariables = getAllVariables(
    activeExternalVariablesById,
    activeCalculatedVariablesById,
    collectedVariableById,
    activeQuestionnaire,
    externalQuestionnairesVariables,
  );
  const externalQuestionnaires =
    activeQuestionnaire?.childQuestionnaireRef || [];

  if (allVariables.length === new Set(allVariables).size) return [];
  const duplicateVariables = [
    ...new Set(
      allVariables.filter(
        (item, index) => index !== allVariables.indexOf(item),
      ),
    ),
  ];
  const duplicates = duplicateVariables.map(duplicateVariable => ({
    variable: duplicateVariable,
    isCollected: Object.values(collectedVariableById).some(
      variable => variable.name === duplicateVariable,
    ),
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
