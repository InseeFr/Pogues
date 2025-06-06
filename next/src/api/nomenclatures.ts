import { queryOptions } from '@tanstack/react-query';

import { Nomenclature } from '@/models/nomenclature';

import { instance } from './instance';

/**
 * Used to retrieve nomenclatures used by a questionnaire.
 *
 * @see {@link getNomenclatures}
 */
export const nomenclaturesQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['nomenclatures', { questionnaireId }],
    queryFn: () => getNomenclatures(questionnaireId),
  });

/**
 * Used to retrieve nomenclatures used by an older version of a questionnaire.
 *
 * @see {@link getNomenclaturesFromVersion}
 */
export const nomenclaturesFromVersionQueryOptions = (
  questionnaireId: string,
  versionId: string,
) =>
  queryOptions({
    queryKey: ['nomenclatures', { questionnaireId, versionId }],
    queryFn: () => getNomenclaturesFromVersion(questionnaireId, versionId),
  });

/** Retrieve all nomenclature used by a questionnaire. */
export async function getNomenclatures(
  questionnaireId: string,
): Promise<Nomenclature[]> {
  return instance
    .get(`/questionnaires/${questionnaireId}/nomenclatures`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: Nomenclature[] }) => {
      return data;
    });
}

/** Retrieve all nomenclature used by a questionnaire. */
export async function getNomenclaturesFromVersion(
  questionnaireId: string,
  versionId: string,
): Promise<Nomenclature[]> {
  return instance
    .get(
      `/questionnaires/${questionnaireId}/version/${versionId}/nomenclatures`,
      { headers: { Accept: 'application/json' } },
    )
    .then(({ data }: { data: Nomenclature[] }) => {
      return data;
    });
}
