import { queryOptions } from '@tanstack/react-query';

import { Variable } from '@/models/variables';

import { instance } from './instance';
import { VariableDTO } from './models/variableDTO';
import { computeVariableDTO, computeVariables } from './utils/variables';

export const variablesKeys = {
  all: (questionnaireId: string) => ['variables', questionnaireId] as const,
  version: (questionnaireId: string, versionId: string) =>
    ['variablesVersion', questionnaireId, versionId] as const,
};

/**
 * Used to retrieve questionnaire variables associated to its id.
 */
export const variablesQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: variablesKeys.all(questionnaireId),
    queryFn: () => getVariables(questionnaireId),
  });

/**
 * Used to retrieve variables used by an older version of a questionnaire.
 *
 * @see {@link getVariablesFromVersion}
 */
export const variablesFromVersionQueryOptions = (
  questionnaireId: string,
  versionId: string,
) =>
  queryOptions({
    queryKey: variablesKeys.version(questionnaireId, versionId),
    queryFn: () => getVariablesFromVersion(questionnaireId, versionId),
    staleTime: Infinity,
  });

/** Retrieve questionnaire variables by the questionnaire id. */
export async function getVariables(
  questionnaireId: string,
): Promise<Variable[]> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/variables`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: VariableDTO[] }) => {
      return computeVariables(data);
    });
}

/** Retrieve all variables used by a version of a questionnaire. */
export async function getVariablesFromVersion(
  questionnaireId: string,
  versionId: string,
): Promise<Variable[]> {
  return instance
    .get(
      `/persistence/questionnaire/${questionnaireId}/version/${versionId}/variables`,
      {
        headers: { Accept: 'application/json' },
      },
    )
    .then(({ data }: { data: VariableDTO[] }) => {
      return computeVariables(data);
    });
}

/** Create a new variable. */
export async function postVariable(
  variable: Variable,
  questionnaireId: string,
): Promise<Response> {
  return instance.post(
    `/persistence/questionnaire/${questionnaireId}/variables`,
    computeVariableDTO(variable),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
