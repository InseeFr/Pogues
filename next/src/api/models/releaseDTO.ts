/** Model of the registry release returned by the Pogues API's releases endpoint. */
export type RegistryReleaseDTO = {
  collectionInstrumentId: string
  version: number
  author: string
  releaseDate: number
  poguesVersionId: string
  releaseDescription: string
  mode: TargetModesDTO
  context: ReleaseContextDTO
  overrideGenerationParameters: OverrideGenerationParametersDTO | null
  visualizeUrl: string
}

/** Model of the release request returned by the Pogues API's release-requests endpoint. */
export type ReleaseRequestDTO = {
  trackerId: number
  author: string
  requestDate: number
  currentStep: CurrentStepDTO
  status: ReleaseRequestStatusDTO
  statusDescription: string
  poguesVersionId: string
  poguesId: string
  releaseDescription: string
  mode: TargetModesDTO
  context: ReleaseContextDTO
  overrideGenerationParameters: OverrideGenerationParametersDTO
}

export type CreateReleaseDTO = {
  poguesId: string
  releaseDescription: string
  mode: TargetModesDTO
  context: ReleaseContextDTO
  overrideGenerationParameters: OverrideGenerationParametersDTO
}

export type OverrideGenerationParametersDTO = {
  questionNumberingMode: QuestionNumberingModeDTO
  responseTimeQuestion: boolean
}

export type TargetModesDTO = 'CAWI' | 'CAPI' | 'PAPI' | 'CATI'

export type ReleaseContextDTO = 'HOUSEHOLD' | 'BUSINESS'

export type CurrentStepDTO =
  | 'BUILD_PARAMETERS'
  | 'PUBLISH_PRERELEASE'
  | 'GENERATE_DDI'
  | 'GENERATE_LUNATIC'
  | 'PUBLISH_DDI'
  | 'PUBLISH_LUNATIC'
  | 'FINISHED'

export type ReleaseRequestStatusDTO =
  | 'CREATED'
  | 'RUNNING'
  | 'COMPLETED'
  | 'FAILED'

export type QuestionNumberingModeDTO = 'NONE' | 'SEQUENCE' | 'ALL'
