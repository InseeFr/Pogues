import { queryOptions } from '@tanstack/react-query';

import { Nomenclature } from '@/models/nomenclature';

import { instance } from './instance';

/**
 * Used to retrieve nomenclatures used by a questionnaire.
 *
 * @see {@link getAllNomenclatures}
 */
export const nomenclaturesQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['nomenclatures', { questionnaireId }],
    queryFn: () => getAllNomenclatures(questionnaireId),
  });

/** Retrieve all nomenclature used by a questionnaire. */
export async function getAllNomenclatures(
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
