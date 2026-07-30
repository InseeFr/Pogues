import { queryOptions } from '@tanstack/react-query'

import { instance } from './instance'
import type { QuestionnaireDetailsDTO } from './models/questionnaireDetailsDTO'

export const detailsKeys = {
  detail: (questionnaireId: string) => ['detail', questionnaireId] as const,
  series: ['metadata', 'series'] as const,
  serie: (questionnaireId: string) =>
    ['metadata', 'series', questionnaireId] as const,
  version: (questionnaireId: string, versionId: string) =>
    ['detailsVersion', questionnaireId, versionId] as const,
}

export const questionnaireDetailsQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: detailsKeys.detail(questionnaireId),
    queryFn: () => getQuestionnaireDetails(questionnaireId),
  })

/**
 * Used to retrieve codes lists associated to an older version of a questionnaire.
 *
 * @see {@link getQuestionnaireDetailsFromVersion}
 */
export const questionnaireDetailsFromVersionQueryOptions = (
  questionnaireId: string,
  versionId: string,
) =>
  queryOptions({
    queryKey: detailsKeys.version(questionnaireId, versionId),
    queryFn: () =>
      getQuestionnaireDetailsFromVersion(questionnaireId, versionId),
    staleTime: Infinity,
  })

export async function getQuestionnaireDetails(
  questionnaireId: string,
): Promise<QuestionnaireDetailsDTO> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/details`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: QuestionnaireDetailsDTO }) => {
      return data
    })
}

/** Retrieve codes lists associated to an older version of the questionnaire. */
export async function getQuestionnaireDetailsFromVersion(
  questionnaireId: string,
  versionId: string,
): Promise<QuestionnaireDetailsDTO> {
  return instance
    .get(
      `/persistence/questionnaire/${questionnaireId}/version/${versionId}/details`,
      { headers: { Accept: 'application/json' } },
    )
    .then(({ data }: { data: QuestionnaireDetailsDTO }) => {
      return data
    })
}

export async function putQuestionnaireDetail(
  questionnaireId: string,
  data: QuestionnaireDetailsDTO,
): Promise<Response> {
  return instance.put(
    `/persistence/questionnaire/${questionnaireId}/details`,
    data,
    { headers: { 'Content-Type': 'application/json' } },
  )
}
