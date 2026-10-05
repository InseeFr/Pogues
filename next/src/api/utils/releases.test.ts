import { describe, expect, it } from 'vitest'

import type { FormValues } from '@/components/release/form/schema'
import { type TargetMode, TargetModes } from '@/models/questionnaires'

import type {
  RegistryReleaseDTO,
  ReleaseRequestDTO,
} from '../models/releaseDTO'
import {
  computeCreateReleaseDTO,
  computeRegistryRelease,
  computeRegistryReleaseDTO,
  computeReleaseRequest,
  computeReleaseRequestDTO,
  getStatusDescriptionKey,
} from './releases'

describe('getStatusDescriptionKey', () => {
  it.each([
    ['publication:not_started', 'publication.not_started'],
    ['publication:in_progress', 'publication.in_progress'],
    ['publication:completed', 'publication.completed'],
    ['error:generation:ddi', 'error.generation.ddi'],
    ['error:generation:lunatic', 'error.generation.lunatic'],
    ['error:generation:parameters', 'error.generation.parameters'],
    ['error:publication:ddi', 'error.publication.ddi'],
    ['error:publication:lunatic', 'error.publication.lunatic'],
    ['error:publication:prerelease', 'error.publication.prerelease'],
  ])('maps "%s" to key "%s"', (code, expected) => {
    expect(getStatusDescriptionKey(code)).toBe(expected)
  })

  it('maps "error:publication" to the default publication key', () => {
    expect(getStatusDescriptionKey('error:publication')).toBe(
      'error.publication_default',
    )
  })

  it('returns the original value for unknown codes', () => {
    expect(getStatusDescriptionKey('unknown:code')).toBe('unknown.code')
  })

  it('returns an empty string for empty input', () => {
    expect(getStatusDescriptionKey('')).toBe('')
  })
})

describe('computeRegistryRelease', () => {
  it.each([
    ['CAWI', TargetModes.CAWI],
    ['CAPI', TargetModes.CAPI],
    ['PAPI', TargetModes.PAPI],
    ['CATI', TargetModes.CATI],
  ] as const)(
    'should compute a registry release with %s mode correctly',
    (modeDTO, modeModel) => {
      const dto: RegistryReleaseDTO = {
        author: 'xbeltv',
        releaseDate: '2026-06-04T08:00:00.000Z',
        poguesVersionId: '93d1e85c-327d-4153-a5fa-e04f54ca0e3e',
        releaseDescription: 'ESA 2026 PROD',
        context: 'HOUSEHOLD',
        collectionInstruments: [
          {
            mode: modeDTO,
            collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440001',
            version: 3,
            overrideGenerationParameters: {
              questionNumberingMode: 'NONE',
              responseTimeQuestion: false,
            },
            visualizeUrl: 'https://visu.example.com/esa-2026-prod',
          },
        ],
      }

      const result = computeRegistryRelease(dto)
      expect(result).toEqual({
        ...dto,
        releaseDate: new Date(dto.releaseDate).getTime(),
        collectionInstruments: [
          {
            ...dto.collectionInstruments[0],
            mode: modeModel,
          },
        ],
      })

      const resultDTO = computeRegistryReleaseDTO(result)
      expect(resultDTO).toEqual(dto)
    },
  )

  it('should compute a registry release with null overrideGenerationParameters', () => {
    const dto: RegistryReleaseDTO = {
      author: 'bcbab8',
      releaseDate: '2026-06-04T08:00:00.000Z',
      poguesVersionId: 'b77e7cad-475d-4d83-b036-fa7a98a84a8a',
      releaseDescription: 'Old publication',
      context: 'HOUSEHOLD',
      collectionInstruments: [
        {
          mode: 'CAWI',
          collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440001',
          version: 1,
          overrideGenerationParameters: null,
          visualizeUrl: 'https://visu.example.com/old',
        },
      ],
    }

    const result = computeRegistryRelease(dto)
    expect(result).toEqual({
      ...dto,
      releaseDate: new Date(dto.releaseDate).getTime(),
      collectionInstruments: [
        {
          ...dto.collectionInstruments[0],
          mode: TargetModes.CAWI,
        },
      ],
    })

    const resultDTO = computeRegistryReleaseDTO(result)
    expect(resultDTO).toEqual(dto)
  })
})

describe('computeCreateReleaseDTO', () => {
  it('should compute a create release DTO from form values', () => {
    const formValues: FormValues = {
      releaseDescription: 'New release',
      modes: ['CAWI', 'CAPI'],
      context: 'HOUSEHOLD',
      overrideGenerationParameters: {
        questionNumberingMode: 'SEQUENCE',
        responseTimeQuestion: true,
      },
    }

    expect(computeCreateReleaseDTO('my-questionnaire', formValues)).toEqual({
      poguesId: 'my-questionnaire',
      releaseDescription: 'New release',
      modes: ['CAWI', 'CAPI'],
      context: 'HOUSEHOLD',
      overrideGenerationParameters: {
        questionNumberingMode: 'SEQUENCE',
        responseTimeQuestion: true,
      },
    })
  })
})

describe('computeReleaseRequest', () => {
  it.each<[TargetMode[], TargetModes[]]>([
    [['CAWI'], [TargetModes.CAWI]],
    [['CAPI'], [TargetModes.CAPI]],
    [['PAPI'], [TargetModes.PAPI]],
    [['CATI'], [TargetModes.CATI]],
  ])(
    'should compute a release request with %s mode correctly',
    (modesDTO, modesModel) => {
      const dto: ReleaseRequestDTO = {
        releaseRequestId: 1,
        author: 'xbeltv',
        requestDate: '2026-06-04T08:00:00.000Z',
        status: 'RUNNING',
        statusDescription: '',
        poguesVersionId: '550e8400-e29b-41d4-a716-446655440000',
        poguesId: 'SRCV_REINTERRO',
        releaseDescription: 'Release description',
        modes: modesDTO,
        context: 'HOUSEHOLD',
        overrideGenerationParameters: {
          questionNumberingMode: 'SEQUENCE',
          responseTimeQuestion: true,
        },
      }

      const result = computeReleaseRequest(dto)
      expect(result).toEqual({
        ...dto,
        requestDate: new Date(dto.requestDate).getTime(),
        modes: modesModel,
      })

      const resultDTO = computeReleaseRequestDTO(result)
      expect(resultDTO).toEqual(dto)
    },
  )
})
