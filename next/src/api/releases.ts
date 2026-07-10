import { queryOptions } from '@tanstack/react-query'

import type { RegistryRelease, ReleaseRequest } from '@/models/releases'

import { instance } from './instance'
import type {
  CreateReleaseDTO,
  RegistryReleaseDTO,
  ReleaseRequestDTO,
} from './models/releaseDTO'
import {
  computeRegistryReleases,
  computeReleaseRequests,
} from './utils/releases'

export const releasesKeys = {
  released: (questionnaireId: string) => ['released', questionnaireId] as const,
  pending: (questionnaireId: string) => ['pending', questionnaireId] as const,
}

/**
 * Used to retrieve questionnaire registry releases associated to its id.
 */
export const releasesQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: releasesKeys.released(questionnaireId),
    queryFn: () => getReleases(questionnaireId),
  })

/**
 * Used to retrieve pending questionnaire registry releases associated to its id.
 */
export const pendingReleasesQueryOptions = (questionnaireId: string) =>
  queryOptions({
    queryKey: releasesKeys.pending(questionnaireId),
    queryFn: () => getPendingReleases(questionnaireId),
  })

/** Retrieve questionnaire releases by the questionnaire id. */
export async function getReleases(
  questionnaireId: string,
): Promise<RegistryRelease[]> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/releases`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: RegistryReleaseDTO[] }) => {
      return computeRegistryReleases(data)
    })
}

/** Retrieve questionnaire pending releases by the questionnaire id. */
export async function getPendingReleases(
  questionnaireId: string,
): Promise<ReleaseRequest[]> {
  return instance
    .get(`/persistence/questionnaire/${questionnaireId}/release-requests`, {
      headers: { Accept: 'application/json' },
    })
    .then(({ data }: { data: ReleaseRequestDTO[] }) => {
      return computeReleaseRequests(data)
    })
}

/** Create a new release. */
export async function postRelease(
  questionnaireId: string,
  release: CreateReleaseDTO,
): Promise<Response> {
  return instance.post(
    `/persistence/questionnaire/${questionnaireId}/releases`,
    release,
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

/** Delete a release request by tracker id. */
export async function deleteReleaseRequest(
  questionnaireId: string,
  trackerId: number,
): Promise<Response> {
  return instance.delete(
    `/persistence/questionnaire/${questionnaireId}/release-requests/${trackerId}`,
  )
}
