import { getAllVariables } from '@/utils/variables/variables-utils';

/** Whether or not there are duplicate variables. */
export function hasDuplicateVariables(
  activeExternalVariablesById?: { [key: string]: { name: unknown } },
  activeCalculatedVariablesById?: { [key: string]: { name: unknown } },
  collectedVariableByQuestion?: {
    [key: string]: { [key: string]: { name: unknown } };
  },
  activeQuestionnaire?: { childQuestionnaireRef: unknown[] },
  externalQuestionnairesVariables?: {
    [key: string]: {
      id: unknown;
      variables: { [key: string]: { Name: unknown } };
    };
  },
): boolean {
  const allVariables = getAllVariables(
    activeExternalVariablesById,
    activeCalculatedVariablesById,
    collectedVariableByQuestion,
    activeQuestionnaire,
    externalQuestionnairesVariables,
  );
  return allVariables.length !== new Set(allVariables).size;
}
