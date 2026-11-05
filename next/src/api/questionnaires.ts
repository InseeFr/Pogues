import { queryOptions } from '@tanstack/react-query'

import type { Questionnaire } from '@/models/questionnaires'

import { instance } from './instance'
import type { Questionnaire as PoguesQuestionnaire } from './models/poguesModel'
import { QuestionnaireDTO } from './models/questionnaireDTO'
import { computeQuestionnaire } from './utils/questionnaires'

export const questionnairesKeys = {
  all: ['questionnaires'] as const,
  allByStampOrSerie: (stamp: string, serieId?: string) =>
    [...questionnairesKeys.all, { stamp, serieId }] as const,
  detail: (id: string) => [...questionnairesKeys.all, 'detail', id] as const,
}

/**
 * Used to retrieve questionnaires associated to a stamp.
 *
 * @see {@link getQuestionnaires}
 */
export const questionnairesQueryOptions = (stamp: string, serieId?: string) =>
  queryOptions({
    queryKey: questionnairesKeys.allByStampOrSerie(stamp, serieId),
    queryFn: () => getQuestionnairesByStampOrSeries(stamp, serieId),
  })

/**
 * Used to retrieve a questionnaire associated to its id.
 *
 * @see {@link getQuestionnaires}
 */
export const questionnaireQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: questionnairesKeys.detail(questionnaireId),
    queryFn: () => getQuestionnaire(questionnaireId),
  })

/**
 * Retrieve questionnaires associated to the provided stamp (e.g. "DR59-SNDI59").
 * @deprecated use `getQuestionnairesByStampOrSeries` instead
 */
export async function getQuestionnaires(
  stamp: string,
): Promise<Questionnaire[]> {
  return instance
    .get('/persistence/questionnaires/search/meta', {
      params: { owner: stamp },
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PoguesQuestionnaire[] }) => {
      const res: Questionnaire[] = []
      for (const datum of data) {
        res.push(computeQuestionnaire(datum))
      }
      return res
    })
}

/**
 * Retrieve questionnaires associated to the provided stamp or serie.
 */
export async function getQuestionnairesByStampOrSeries(
  stamp?: string,
  serieId?: string,
): Promise<QuestionnaireDTO[]> {
  return instance
    .get('/questionnaires', {
      params: { owner: stamp, serieId: serieId },
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: QuestionnaireDTO[] }) => {
      return data
    })
}

/** Retrieve a questionnaire by id. */
export async function getQuestionnaire(id: string): Promise<Questionnaire> {
  return instance
    .get(`/persistence/questionnaire/${id}`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: PoguesQuestionnaire }) => {
      return computeQuestionnaire(data)
    })
}

/** Update a questionnaire by id.
 * @deprecated
 */
export async function putQuestionnaire(
  id: string,
  qr: PoguesQuestionnaire,
): Promise<Response> {
  return instance.put(`/persistence/questionnaire/${id}`, qr, {
    headers: { 'Content-Type': 'application/json' },
  })
}
