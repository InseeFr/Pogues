import { queryOptions } from '@tanstack/react-query'

import { TargetModes } from '@/models/questionnaires'
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

export const MOCK_PUBLICATIONS: RegistryRelease[] = [
  {
    author: 'xbeltv',
    releaseDate: new Date('2026-07-04T08:00:00').getTime(),
    poguesVersionId: '93d1e85c-327d-4153-a5fa-e04f54ca0e3e',
    releaseDescription: 'ESA 2026 PROD',
    context: 'HOUSEHOLD',
    collectionInstruments: [
      {
        mode: TargetModes.CAWI,
        collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440001',
        version: 3,
        overrideGenerationParameters: {
          questionNumberingMode: 'NONE',
          responseTimeQuestion: false,
        },
        visualizeUrl: 'https://visu.example.com/esa-2026-prod',
      },
      {
        mode: TargetModes.CAPI,
        collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440010',
        version: 3,
        overrideGenerationParameters: null,
        visualizeUrl: 'https://visu.example.com/esa-2026-prod-capi',
      },
    ],
  },
  {
    author: 'nazdsn',
    releaseDate: new Date('2026-06-28T10:00:00').getTime(),
    poguesVersionId: '5ddf61df-00c8-4018-a763-fa7bc91b0162',
    releaseDescription: 'ESA 2026 TEST TERRAIN',
    context: 'BUSINESS',
    collectionInstruments: [
      {
        mode: TargetModes.CAPI,
        collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440002',
        version: 2,
        overrideGenerationParameters: {
          questionNumberingMode: 'NONE',
          responseTimeQuestion: false,
        },
        visualizeUrl: 'https://visu.example.com/esa-2026-test',
      },
    ],
  },
  {
    author: 'bcbab8',
    releaseDate: new Date('2026-06-15T11:30:00').getTime(),
    poguesVersionId: 'b77e7cad-475d-4d83-b036-fa7a98a84a8a',
    releaseDescription: "Publication la plus ancienne d'ESA",
    context: 'HOUSEHOLD',
    collectionInstruments: [
      {
        mode: TargetModes.CAWI,
        collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440003',
        version: 1,
        overrideGenerationParameters: null,
        visualizeUrl: 'https://visu.example.com/esa-2026-old',
      },
    ],
  },
]

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
  console.log('questionnaireId', questionnaireId)

  return instance
    .get(`/questionnaire/${questionnaireId}/releases`, {
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
  console.log('questionnaireId', questionnaireId)

  return instance
    .get(`/questionnaire/${questionnaireId}/release-requests`, {
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
  return instance.post(`/questionnaire/${questionnaireId}/releases`, release, {
    headers: { 'Content-Type': 'application/json' },
  })
}

/** Delete a release request by its id. */
export async function deleteReleaseRequest(
  questionnaireId: string,
  releaseRequestId: number,
): Promise<Response> {
  return instance.delete(
    `/questionnaire/${questionnaireId}/release-requests/${releaseRequestId}`,
  )
}
