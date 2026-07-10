import { describe, expect, it } from 'vitest'

import { TargetModes } from '@/models/questionnaires'

import type {
  RegistryReleaseDTO,
  ReleaseRequestDTO,
} from '../models/releaseDTO'
import {
  computeRegistryRelease,
  computeRegistryReleaseDTO,
  computeReleaseRequest,
  computeReleaseRequestDTO,
} from './releases'

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
        collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440001',
        version: 3,
        author: 'xbeltv',
        releaseDate: 1780560000000,
        poguesVersionId: '93d1e85c-327d-4153-a5fa-e04f54ca0e3e',
        releaseDescription: 'ESA 2026 PROD',
        mode: modeDTO,
        context: 'HOUSEHOLD',
        overrideGenerationParameters: {
          questionNumberingMode: 'NONE',
          responseTimeQuestion: false,
        },
        visualizeUrl: 'https://visu.example.com/esa-2026-prod',
      }

      const result = computeRegistryRelease(dto)
      expect(result).toEqual({
        ...dto,
        mode: modeModel,
      })

      const resultDTO = computeRegistryReleaseDTO(result)
      expect(resultDTO).toEqual(dto)
    },
  )

  it('should compute a registry release with null overrideGenerationParameters', () => {
    const dto: RegistryReleaseDTO = {
      collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440001',
      version: 1,
      author: 'bcbab8',
      releaseDate: 1780560000000,
      poguesVersionId: 'b77e7cad-475d-4d83-b036-fa7a98a84a8a',
      releaseDescription: 'Old publication',
      mode: 'CAWI',
      context: 'HOUSEHOLD',
      overrideGenerationParameters: null,
      visualizeUrl: 'https://visu.example.com/old',
    }

    const result = computeRegistryRelease(dto)
    expect(result).toEqual({
      ...dto,
      mode: TargetModes.CAWI,
    })

    const resultDTO = computeRegistryReleaseDTO(result)
    expect(resultDTO).toEqual(dto)
  })
})

describe('computeReleaseRequest', () => {
  it.each([
    ['CAWI', TargetModes.CAWI],
    ['CAPI', TargetModes.CAPI],
    ['PAPI', TargetModes.PAPI],
    ['CATI', TargetModes.CATI],
  ] as const)(
    'should compute a release request with %s mode correctly',
    (modeDTO, modeModel) => {
      const dto: ReleaseRequestDTO = {
        trackerId: 1,
        author: 'xbeltv',
        requestDate: 1780560000000,
        currentStep: 'BUILD_PARAMETERS',
        status: 'RUNNING',
        statusDescription: '',
        poguesVersionId: '550e8400-e29b-41d4-a716-446655440000',
        poguesId: 'SRCV_REINTERRO',
        releaseDescription: 'Release description',
        mode: modeDTO,
        context: 'HOUSEHOLD',
        overrideGenerationParameters: {
          questionNumberingMode: 'SEQUENCE',
          responseTimeQuestion: true,
        },
      }

      const result = computeReleaseRequest(dto)
      expect(result).toEqual({
        ...dto,
        mode: modeModel,
      })

      const resultDTO = computeReleaseRequestDTO(result)
      expect(resultDTO).toEqual(dto)
    },
  )
})
