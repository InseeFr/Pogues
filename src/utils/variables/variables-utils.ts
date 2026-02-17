import { CHOICE_TYPE, COMPONENT_TYPE } from '@/constants/pogues-constants';

const { QUESTION } = COMPONENT_TYPE;

/** Remove variables for which we don't have id. */
export function removeOrphansCollectedVariables(
  variablesIdsFromComponents: unknown[] = [],
  variablesStore: { [key: string]: { [key: string]: unknown } } = {},
): { [key: string]: { [key: string]: unknown } } {
  return Object.keys(variablesStore)
    .filter((key) => variablesIdsFromComponents.indexOf(key) !== -1)
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: variablesStore[key],
      };
    }, {});
}

/** Get variable ids of components that are of type `"QUESTION"`. */
export function getCollectedVariablesIdsFromComponents(componentsStore: {
  [key: string]: {
    type: string;
    collectedVariables: string[];
  };
}): string[] {
  const res = [];
  for (const componentStore of Object.values(componentsStore)) {
    if (componentStore.type === QUESTION) {
      res.push(...componentStore.collectedVariables);
    }
  }
  return res;
}

/** Fuse all variables into a big variable array. */
export function getAllVariables(
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
): unknown[] {
  const externalVariables = Object.values(
    activeExternalVariablesById || {},
  ).map((element) => element.name);
  const calculatedVariables = Object.values(
    activeCalculatedVariablesById || {},
  ).map((element) => element.name);

  const collectedVariables = Object.values(collectedVariableByQuestion || {})
    .map(
      (question) =>
        typeof question === 'object' &&
        Object.values(question).map((variable) => variable.name),
    )
    .flat();

  const externalQuestionnaires =
    activeQuestionnaire?.childQuestionnaireRef || [];

  const initialQVar: unknown[] = [];
  const referencedQuestionnairesVariables =
    externalQuestionnairesVariables &&
    Object.values(externalQuestionnairesVariables)
      .filter((questionnaire) =>
        externalQuestionnaires.includes(questionnaire.id),
      )
      .reduce((acc, quest) => {
        if (!quest.variables) return acc;
        return [
          ...acc,
          ...Object.values(quest.variables).map((variable) => variable?.Name),
        ];
      }, initialQVar);

  return collectedVariables.concat(
    externalVariables,
    calculatedVariables,
    referencedQuestionnairesVariables,
  );
}

export function getReference(form: {
  choiceType: CHOICE_TYPE;
  CodesList?: { id: string; label: string };
  Nomenclature?: { id: string; label: string };
}): {
  codeListReference?: string;
  codeListReferenceLabel?: string;
} {
  switch (form.choiceType) {
    case CHOICE_TYPE.CODE_LIST:
      return {
        codeListReference: form.CodesList?.id,
        codeListReferenceLabel: form.CodesList?.label,
      };
    case CHOICE_TYPE.SUGGESTER:
      return {
        codeListReference: form.Nomenclature?.id,
        codeListReferenceLabel: form.Nomenclature?.label,
      };
    default:
      return {};
  }
}
