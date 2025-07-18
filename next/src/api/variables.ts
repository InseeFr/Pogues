import { queryOptions } from '@tanstack/react-query';

import { Variable } from '@/models/variables';

import { instance } from './instance';
import { VariablesObject as PoguesVariables } from './models/pogues';
import { computeVariables } from './utils/variables';

export const variablesKeys = {
  all: (questionnaireId: string) => ['variables', questionnaireId] as const,
};

/**
 * Used to retrieve questionnaire variables associated to its id.
 */
export const variablesQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: variablesKeys.all(questionnaireId),
    queryFn: () => getVariables(questionnaireId),
  });

/** Retrieve questionnaire variables by the questionnaire id. */
export async function getVariables(
  questionnaireId: string,
): Promise<Variable[]> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/variables`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PoguesVariables }) => {
      return computeVariables(data.Variable ?? []);
    });
}

/** Create a new variable. */
export async function postVariable(
  variable: Variable,
  questionnaireId: string,
): Promise<Response> {
  return instance.post(
    `/persistence/questionnaire/${questionnaireId}/variables`,
    variable /* TODO compute pogues variable */,
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
