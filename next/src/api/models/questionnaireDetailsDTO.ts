import { FlowLogicEnum, FormulasLanguageEnum } from './poguesModel'

export type QuestionnaireDetailsDTO = {
  id: string
  name: string
  label: string
  flowLogic: FlowLogicEnum
  formulasLanguage: FormulasLanguageEnum
  dataCollection?: {
    serie: SerieDetailDTO
  }
  targetMode: string[]
  agency: string
  owner: string
}

export type SerieDTO = {
  id: string
  uri: string
  label: string
}

export type OperationDTO = {
  id: string
  uri: string
  label: string
}

export type SerieDetailDTO = SerieDTO & {
  altLabel: string
}
