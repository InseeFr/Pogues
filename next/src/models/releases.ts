import { TargetModes } from '@/models/questionnaires'

export type ReleaseRequestStatus =
  | 'CREATED'
  | 'RUNNING'
  | 'COMPLETED'
  | 'FAILED'

export type QuestionNumberingMode = 'NONE' | 'SEQUENCE' | 'ALL'

export type ReleaseContext = 'HOUSEHOLD' | 'BUSINESS'

export type ReleaseRequest = {
  releaseRequestId: number
  author: string
  requestDate: number
  status: ReleaseRequestStatus
  statusDescription: string
  poguesVersionId: string
  poguesId: string
  releaseDescription: string
  modes: TargetModes[]
  context: ReleaseContext
  overrideGenerationParameters: {
    questionNumberingMode: QuestionNumberingMode
    responseTimeQuestion: boolean
  }
}

export type RegistryCollectionInstrument = {
  mode: TargetModes
  collectionInstrumentId: string
  version: number
  overrideGenerationParameters: {
    questionNumberingMode: QuestionNumberingMode
    responseTimeQuestion: boolean
  } | null
  visualizeUrl: string
}

export type RegistryRelease = {
  author: string
  releaseDate: number
  poguesVersionId: string
  releaseDescription: string
  context: ReleaseContext
  collectionInstruments: RegistryCollectionInstrument[]
}
