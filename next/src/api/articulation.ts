import { queryOptions } from '@tanstack/react-query';

import type { Articulation } from '@/models/articulation';
import { Variable } from '@/models/variables';

import { instance } from './instance';

export const articulationKeys = {
  all: (questionnaireId: string) => ['articulation', questionnaireId] as const,
  version: (questionnaireId: string, versionId: string) =>
    ['articulationVersion', questionnaireId, versionId] as const,
  variables: (questionnaireId: string) =>
    ['articulationVariables', questionnaireId] as const,
};

/**
 * Used to retrieve articulation associated to a questionnaire.
 *
 * @see {@link getArticulation}
 */
export const articulationQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: articulationKeys.all(questionnaireId),
    queryFn: () => getArticulation(questionnaireId),
  });

/**
 * Used to retrieve articulation associated to an older version of a questionnaire.
 *
 * @see {@link getArticulationFromVersion}
 */
export const articulationFromVersionQueryOptions = (
  questionnaireId: string,
  versionId: string,
) =>
  queryOptions({
    queryKey: articulationKeys.version(questionnaireId, versionId),
    queryFn: () => getArticulationFromVersion(questionnaireId, versionId),
    staleTime: Infinity,
  });

/**
 * Used to retrieve articulation variables associated to a questionnaire.
 *
 * @see {@link getArticulationVariables}
 */
export const articulationVariablesQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: articulationKeys.variables(questionnaireId),
    queryFn: () => getArticulationVariables(questionnaireId),
  });

/** Retrieve articulation associated to the questionnaire. */
export async function getArticulation(
  questionnaireId: string,
): Promise<Articulation> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/articulation`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: Articulation }) => {
      return data;
    });
}

/** Retrieve articulation associated to an older version of the questionnaire. */
export async function getArticulationFromVersion(
  questionnaireId: string,
  versionId: string,
): Promise<Articulation> {
  return instance
    .get(
      `/persistence/questionnaire/${questionnaireId}/version/${versionId}/articulation`,
      { headers: { Accept: 'application/json' } },
    )
    .then(({ data }: { data: Articulation }) => {
      return data;
    });
}

/** Retrieve articulation variables associated to the questionnaire. */
async function getArticulationVariables(
  questionnaireId: string,
): Promise<Variable[]> {
  return instance
    .get(
      `/persistence/questionnaire/${questionnaireId}/articulation/variables`,
      {
        headers: { Accept: 'application/json' },
      },
    )
    .then(({ data }: { data: Variable[] }) => {
      return data;
    });
}

/** Create or update an articulation. */
export async function putArticulation(
  questionnaireId: string,
  articulation: Articulation,
): Promise<Response> {
  return instance.put(
    `/persistence/questionnaire/${questionnaireId}/articulation`,
    articulation,
    { headers: { 'Content-Type': 'application/json' } },
  );
}

/** Delete an articulation. */
export async function deleteArticulation(
  questionnaireId: string,
): Promise<Response> {
  return instance.delete(
    `/persistence/questionnaire/${questionnaireId}/articulation`,
  );
}
