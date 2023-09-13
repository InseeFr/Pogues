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
  const duplicateVariables = [
    ...new Set(
      allVariables.filter(
        (item, index) => index !== allVariables.indexOf(item),
      ),
    ),
  ];
  const duplicates = duplicateVariables.map(duplicateVariable => ({
    variable: duplicateVariable,
    isCollected: Object.values(collectedVariableByQuestion).some(
      question =>
        typeof question === 'object' &&
        Object.values(question).some(
          variable => variable.name === duplicateVariable,
        ),
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
        const referencedQuestionnaireVariables = Object.values(
          quest.variables,
        ).filter(variable => variable.Name === duplicateVariable);
        if (referencedQuestionnaireVariables.length === 0) return acc;
        const qRefName = activeComponentsById[quest.id]?.name;
        return {
          ...acc,
          [qRefName]: {
            isCollected: referencedQuestionnaireVariables.some(
              ({ type }) => type === 'CollectedVariableType',
            ),
            isExternal: referencedQuestionnaireVariables.some(
              ({ type }) => type === 'ExternalVariableType',
            ),
            isCalculated: referencedQuestionnaireVariables.some(
              ({ type }) => type === 'CalculatedVariableType',
            ),
          },
        };
      }, {}),
  }));
  return duplicates;
}
