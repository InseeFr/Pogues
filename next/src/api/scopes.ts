import { queryOptions } from '@tanstack/react-query'

import type { Scopes } from '@/models/scopes'

import { instance } from './instance'
import { VariableScope } from './models/variableDTO'

export const scopesKeys = {
  all: ['scopes'] as const,
  detail: (questionnaireId: string) =>
    [...scopesKeys.all, 'detail', questionnaireId] as const,
  version: (questionnaireId: string, versionId: string) =>
    [...scopesKeys.all, 'version', questionnaireId, versionId] as const,
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
 * Used to retrieve scopes of an older version of a questionnaire.
 *
 * @see {@link getScopesFromVersion}
 */
export const scopesFromVersionQueryOptions = (
  questionnaireId: string,
  versionId: string,
) =>
  queryOptions({
    queryKey: scopesKeys.version(questionnaireId, versionId),
    queryFn: () => getScopesFromVersion(questionnaireId, versionId),
    staleTime: Infinity,
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

/** Retrieve scopes of an older version of a questionnaire. */
export async function getScopesFromVersion(
  questionnaireId: string,
  versionId: string,
): Promise<Scopes> {
  return instance
    .get(
      `/persistence/questionnaire/${questionnaireId}/version/${versionId}/variables-scopes`,
      { headers: { Accept: 'application/json' } },
    )
    .then(({ data }: { data: VariableScope[] }) => {
      return new Map(data.map((scope) => [scope.id, scope.label]))
    })
}
