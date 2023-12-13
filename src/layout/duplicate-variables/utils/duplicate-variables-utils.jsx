import PropTypes from 'prop-types';
import { getAllVariables } from '../../../utils/variables/variables-utils';

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
  const currentDuplicateCollected = Object.values(
    collectedVariableByQuestion,
  ).reduce(
    (accQuest, question) => [
      ...accQuest,
      ...Object.values(question).reduce(
        (accVar, variable) =>
          duplicateVariables.includes(variable.name)
            ? [
                ...accVar,
                {
                  questionnaire: 'current',
                  variableName: variable.name,
                  variableType: 'CollectedVariableType',
                },
              ]
            : accVar,
        [],
      ),
    ],
    [],
  );
  const currentDuplicateExternal = Object.values(activeExternalVariablesById)
    .filter(variable => duplicateVariables.includes(variable.name))
    .map(variable => ({
      questionnaire: 'current',
      variableName: variable.name,
      variableType: 'ExternalVariableType',
    }));
  const currentDuplicateCalculated = Object.values(
    activeCalculatedVariablesById,
  )
    .filter(variable => duplicateVariables.includes(variable.name))
    .map(variable => ({
      questionnaire: 'current',
      variableName: variable.name,
      variableType: 'CalculatedVariableType',
    }));
  const externalQuestionnaireDuplicate = Object.values(
    externalQuestionnairesVariables,
  )
    .filter(questionnaire => externalQuestionnaires.includes(questionnaire.id))
    .reduce((accQuest, quest) => {
      const qRefName = activeComponentsById[quest.id]?.name;
      return [
        ...accQuest,
        ...Object.values(quest.variables)
          .filter(variable => duplicateVariables.includes(variable.Name))
          .map(variable => ({
            questionnaire: qRefName,
            variableName: variable.Name,
            variableType: variable.type,
          })),
      ];
    }, []);

  return [
    ...currentDuplicateCollected,
    ...currentDuplicateExternal,
    ...currentDuplicateCalculated,
    ...externalQuestionnaireDuplicate,
  ];
}

questionnaireDuplicateVariables.propTypes = {
  collectedVariableByQuestion: PropTypes.object,
  activeExternalVariablesById: PropTypes.object,
  activeCalculatedVariablesById: PropTypes.object,
  activeQuestionnaire: PropTypes.object,
  externalQuestionnairesVariables: PropTypes.object,
  activeComponentsById: PropTypes.object,
};

questionnaireDuplicateVariables.defaultProps = {
  collectedVariableByQuestion: {},
  activeExternalVariablesById: {},
  activeCalculatedVariablesById: {},
  activeQuestionnaire: {},
  externalQuestionnairesVariables: {},
  activeComponentsById: {},
};
