import { SerieDetailDTO } from './questionnaireDetailsDTO'

export type QuestionnaireDTO = {
  id: string
  label: string
  lastUpdatedDate: string
  owner: string
  serie?: SerieDetailDTO
}
