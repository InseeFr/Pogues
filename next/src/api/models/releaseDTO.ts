import type { TargetMode } from '@/models/questionnaires'

/** Model of a collection instrument of a registry release returned by the Pogues API's releases endpoint. */
export type RegistryCollectionInstrumentDTO = {
  mode: TargetMode
  collectionInstrumentId: string
  version: number
  overrideGenerationParameters: OverrideGenerationParametersDTO | null
  visualizeUrl: string
}

/** Model of the registry release returned by the Pogues API's releases endpoint. */
export type RegistryReleaseDTO = {
  author: string
  releaseDate: string
  poguesVersionId: string
  releaseDescription: string
  context: ReleaseContextDTO
  collectionInstruments: RegistryCollectionInstrumentDTO[]
}

/** Model of the release request returned by the Pogues API's release-requests endpoint. */
export type ReleaseRequestDTO = {
  releaseRequestId: number
  author: string
  requestDate: string
  status: ReleaseRequestStatusDTO
  statusDescription: string
  poguesVersionId: string
  poguesId: string
  releaseDescription: string
  modes: TargetMode[]
  context: ReleaseContextDTO
  overrideGenerationParameters: OverrideGenerationParametersDTO
}

export type CreateReleaseDTO = {
  poguesId: string
  releaseDescription: string
  mode: TargetMode
  context: ReleaseContextDTO
  overrideGenerationParameters: OverrideGenerationParametersDTO
}

export type OverrideGenerationParametersDTO = {
  questionNumberingMode: QuestionNumberingModeDTO
  responseTimeQuestion: boolean
}

export type ReleaseContextDTO = 'HOUSEHOLD' | 'BUSINESS'

export type ReleaseRequestStatusDTO =
  | 'CREATED'
  | 'RUNNING'
  | 'COMPLETED'
  | 'FAILED'

export type QuestionNumberingModeDTO = 'NONE' | 'SEQUENCE' | 'ALL'
