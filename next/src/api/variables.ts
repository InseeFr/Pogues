import { queryOptions } from '@tanstack/react-query';

import { Variable } from '@/models/variables/variables';

import { instance } from './instance';
import { VariablesObject as PoguesVariables } from './models/pogues';
import { computeVariables } from './utils/variables';

/**
 * Used to retrieve questionnaire variables associated to its id.
 */
export const variablesQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: ['variables', { questionnaireId }],
    queryFn: () => getVariables(questionnaireId),
  });

/** Retrieve questionnaire variables by the questionnaire id. */
export async function getVariables(id: string): Promise<Variable[]> {
  return instance
    .get(`/persistence/questionnaire/${id}/variables`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PoguesVariables }) => {
      return computeVariables(data.Variable ?? []);
    });
}
