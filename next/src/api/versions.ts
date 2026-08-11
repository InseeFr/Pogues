import { queryOptions } from '@tanstack/react-query'

import type { Version } from '@/models/version'

import { instance } from './instance'

export enum ERROR_CODES {
  RELATED_QUESTION_NAMES = 'codelist:relatedquestions:name',
}

export const versionsKeys = {
  all: (questionnaireId: string) => ['versions', questionnaireId] as const,
  one: (versionId: string) => ['version', versionId] as const,
}

/**
 * Used to retrieve versions of a questionnaire.
 *
 * @see {@link getAllVersions}
 */
export const versionsQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: versionsKeys.all(questionnaireId),
    queryFn: () => getAllVersions(questionnaireId),
  })

/**
 * Used to retrieve a specific version of a questionnaire.
 *
 * @see {@link getAllVersions}
 */
export const versionQueryOptions = (versionId: string) =>
  queryOptions({
    queryKey: versionsKeys.one(versionId),
    queryFn: () => getVersion(versionId),
  })

/** Retrieve all versions of a questionnaire. */
export async function getAllVersions(
  questionnaireId: string,
): Promise<Version[]> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/versions`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: Version[] }) => {
      return data
    })
}

/** Retrieve specific version of a questionnaire. */
export async function getVersion(versionId: string): Promise<Version> {
  return instance
    .get(`/persistence/version/${versionId}`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: Version }) => {
      return data
    })
}

/** Restore a version. */
export async function restoreVersion(versionId: string): Promise<Response> {
  return instance.post(`/persistence/questionnaire/restore/${versionId}`)
}
