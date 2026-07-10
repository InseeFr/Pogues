import { TargetModes } from '@/models/questionnaires'

export type ReleaseRequestStatus =
  | 'CREATED'
  | 'RUNNING'
  | 'COMPLETED'
  | 'FAILED'

export type CurrentStep =
  | 'BUILD_PARAMETERS'
  | 'PUBLISH_PRERELEASE'
  | 'GENERATE_DDI'
  | 'GENERATE_LUNATIC'
  | 'PUBLISH_DDI'
  | 'PUBLISH_LUNATIC'
  | 'FINISHED'

export type QuestionNumberingMode = 'NONE' | 'SEQUENCE' | 'ALL'

export type ReleaseContext = 'HOUSEHOLD' | 'BUSINESS'

export type ReleaseRequest = {
  trackerId: number
  author: string
  requestDate: number
  currentStep: CurrentStep
  status: ReleaseRequestStatus
  statusDescription: string
  poguesVersionId: string
  poguesId: string
  releaseDescription: string
  mode: TargetModes
  context: ReleaseContext
  overrideGenerationParameters: {
    questionNumberingMode: QuestionNumberingMode
    responseTimeQuestion: boolean
  }
}

export type RegistryRelease = {
  collectionInstrumentId: string
  version: number
  author: string
  releaseDate: number
  poguesVersionId: string
  releaseDescription: string
  mode: TargetModes
  context: ReleaseContext
  overrideGenerationParameters: {
    questionNumberingMode: QuestionNumberingMode
    responseTimeQuestion: boolean
  } | null
  visualizeUrl: string
}
