import { TargetModes } from '@/models/questionnaires'

import { SurveyModeEnum } from '../models/poguesModel'
import type {
  QuestionnaireDetailsDTO,
  SerieDetailDTO,
} from '../models/questionnaireDetailsDTO'
import { computeTargetModes } from './targetModes'

export type FormDetails = {
  name: string
  title: string
  serie?: string
  agency: string
  targetModes: TargetModes[]
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
    targetModes: Array.from(
      computeTargetModes(dto.targetMode as SurveyModeEnum[]),
    ),
    owner: dto.owner,
  }
}

export function computeQuestionnaireDetailsDTO(
  formDetails: FormDetails,
  existingDto: QuestionnaireDetailsDTO,
  serieDetails?: SerieDetailDTO,
): QuestionnaireDetailsDTO {
  const base = {
    id: existingDto.id,
    name: formDetails.name,
    label: formDetails.title,
    targetMode: formDetails.targetModes.map(
      (mode) => TargetModes[mode as number] as string,
    ),
    agency: formDetails.agency,
    owner: formDetails.owner,
  }

  if (serieDetails) {
    return {
      ...base,
      dataCollection: {
        serie: {
          id: serieDetails.id,
          uri: serieDetails.uri,
          label: serieDetails.label,
          altLabel: serieDetails.altLabel,
        },
      },
    }
  }

  return base
}
