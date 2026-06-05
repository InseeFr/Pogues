import { queryOptions } from '@tanstack/react-query'

import type { Scopes } from '@/models/scopes'

import { instance } from './instance'
import { VariableScope } from './models/variableDTO'

export const scopesKeys = {
  all: ['scopes'] as const,
  detail: (questionnaireId: string) =>
    [...scopesKeys.all, 'detail', questionnaireId] as const,
}

/**
 * Used to retrieve scopes for a questionnaire.
 */
export const scopesQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: scopesKeys.detail(questionnaireId),
    queryFn: () => getScopes(questionnaireId),
  })

/**
 * Retrieve scopes for a questionnaire by id.
 */
export async function getScopes(questionnaireId: string): Promise<Scopes> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/variables-scopes`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: VariableScope[] }) => {
      return new Map(data.map((scope) => [scope.id, scope.label]))
    })
}
