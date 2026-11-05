import { TargetModes } from '@/models/questionnaires'

import type { QuestionnaireDetailsDTO } from '../models/questionnaireDetailsDTO'
import { computeTargetModes } from './targetModes'

export type FormDetails = {
  name: string
  title: string
  serie?: string
  agency: string
  targetModes: Set<TargetModes>
  owner: string
}

function computeSerieId(dto: QuestionnaireDetailsDTO): string {
  return dto.dataCollection?.serie?.id ?? ''
}

export function computeQuestionnaireDetails(
  dto: QuestionnaireDetailsDTO,
): FormDetails {
  return {
    name: dto.name,
    title: dto.label,
    serie: computeSerieId(dto),
    agency: dto.agency,
    targetModes: computeTargetModes(dto.targetMode),
    owner: dto.owner,
  }
}
