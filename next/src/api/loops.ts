import { queryOptions } from '@tanstack/react-query'

import type { InitialLoopMember, Loop } from '@/models/loops'

import { instance } from './instance'
import { LoopDTO } from './models/loopDTO'
import { computeLoop, computeLoopDTO } from './utils/loops'

export const loopsKeys = {
  all: (questionnaireId: string) => ['loops', questionnaireId] as const,
  one: (questionnaireId: string, loopId: string) =>
    ['one', questionnaireId, loopId] as const,
  version: (questionnaireId: string, versionId: string, loopId: string) =>
    ['loopVersion', questionnaireId, versionId, loopId] as const,
  members: (questionnaireId: string) => ['members', questionnaireId] as const,
  membersVersion: (questionnaireId: string, versionId: string) =>
    ['membersVersion', questionnaireId, versionId] as const,
}

/**
 * Used to retrieve a loop of a questionnaire.
 *
 * @see {@link getLoop}
 */
export const loopQueryOptions = (questionnaireId: string, loopId: string) =>
  queryOptions({
    queryKey: loopsKeys.one(questionnaireId, loopId),
    queryFn: () => getLoop(questionnaireId, loopId),
  })

/** Retrieve a loop of a questionnaire by its id. */
export async function getLoop(
  questionnaireId: string,
  loopId: string,
): Promise<Loop> {
  return instance
    .get(`/questionnaires/${questionnaireId}/loops/${loopId}`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: LoopDTO }) => {
      return computeLoop(data)
    })
}

/**
 * Used to retrieve a loop of an older version of a questionnaire.
 *
 * @see {@link getLoopFromVersion}
 */
export const loopFromVersionQueryOptions = (
  questionnaireId: string,
  versionId: string,
  loopId: string,
) =>
  queryOptions({
    queryKey: loopsKeys.version(questionnaireId, versionId, loopId),
    queryFn: () => getLoopFromVersion(questionnaireId, versionId, loopId),
    staleTime: Infinity,
  })

/** Retrieve a loop of an older version of a questionnaire by its id. */
export async function getLoopFromVersion(
  questionnaireId: string,
  versionId: string,
  loopId: string,
): Promise<Loop> {
  return instance
    .get(
      `/questionnaires/${questionnaireId}/version/${versionId}/loops/${loopId}`,
      { headers: { Accept: 'application/json' } },
    )
    .then(({ data }: { data: LoopDTO }) => {
      return computeLoop(data)
    })
}

/**
 * Used to retrieve the components that can be the boundaries of a loop in a
 * questionnaire.
 *
 * @see {@link getLoopMembers}
 */
export const loopMembersQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: loopsKeys.members(questionnaireId),
    queryFn: () => getLoopMembers(questionnaireId),
  })

/**
 * Retrieve the components that can be the initial member of a loop, each with
 * the components that can then be used as its final member.
 */
export async function getLoopMembers(
  questionnaireId: string,
): Promise<InitialLoopMember[]> {
  return instance
    .get(`/questionnaires/${questionnaireId}/loops/members`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: InitialLoopMember[] }) => {
      return data
    })
}

/**
 * Used to retrieve the components that could be the boundaries of a loop in an
 * older version of a questionnaire.
 *
 * @see {@link getLoopMembersFromVersion}
 */
export const loopMembersFromVersionQueryOptions = (
  questionnaireId: string,
  versionId: string,
) =>
  queryOptions({
    queryKey: loopsKeys.membersVersion(questionnaireId, versionId),
    queryFn: () => getLoopMembersFromVersion(questionnaireId, versionId),
    staleTime: Infinity,
  })

/**
 * Retrieve the components that could be the initial member of a loop in an
 * older version of a questionnaire, each with the components that could then
 * be used as its final member.
 */
export async function getLoopMembersFromVersion(
  questionnaireId: string,
  versionId: string,
): Promise<InitialLoopMember[]> {
  return instance
    .get(
      `/questionnaires/${questionnaireId}/version/${versionId}/loops/members`,
      { headers: { Accept: 'application/json' } },
    )
    .then(({ data }: { data: InitialLoopMember[] }) => {
      return data
    })
}

/** Create a new loop, or update the loop with the same id. */
export async function postLoop(
  questionnaireId: string,
  loop: Loop,
): Promise<Response> {
  return instance.post(
    `/questionnaires/${questionnaireId}/loop`,
    computeLoopDTO(loop),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

/** Delete a loop of a questionnaire. */
export async function deleteLoop(
  questionnaireId: string,
  loopId: string,
): Promise<Response> {
  return instance.delete(`/questionnaires/${questionnaireId}/loops/${loopId}`)
}
