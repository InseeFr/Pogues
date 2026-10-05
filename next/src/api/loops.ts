import { queryOptions } from '@tanstack/react-query'

import type { InitialLoopMember, Loop } from '@/models/loops'

import { instance } from './instance'
import type { LoopDTO } from './models/loopDTO'
import { computeLoopDTO } from './utils/loops'

export const loopsKeys = {
  all: ['loops'] as const,
  members: (questionnaireId: string) =>
    [...loopsKeys.all, 'members', questionnaireId] as const,
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
