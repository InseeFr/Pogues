import {
  FlowLogics,
  FormulasLanguages,
  TargetModes,
} from '@/models/questionnaires'

import { SurveyModeEnum } from '../models/poguesModel'
import type {
  QuestionnaireDetailsDTO,
  SerieDetailDTO,
} from '../models/questionnaireDetailsDTO'
import { computeFlowLogic, computePoguesFlowLogic } from './flowLogic'
import {
  computeFormulasLanguage,
  computePoguesFormulasLanguage,
} from './formulasLanguage'
import { computeTargetModes } from './targetModes'

export type FormDetails = {
  name: string
  title: string
  serie?: string
  agency: string
  targetModes: TargetModes[]
  flowLogic: FlowLogics
  formulasLanguage: FormulasLanguages
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
    flowLogic: computeFlowLogic(dto.flowLogic) ?? FlowLogics.Filter,
    formulasLanguage:
      computeFormulasLanguage(dto.formulasLanguage) ?? FormulasLanguages.VTL,
  }
}

export function computeQuestionnaireDetailsDTO(
  formDetails: FormDetails,
  existingDto: QuestionnaireDetailsDTO,
  serieDetails?: SerieDetailDTO,
): QuestionnaireDetailsDTO {
  const base = {
    ...existingDto,
    dataCollection: undefined,
    name: formDetails.name,
    label: formDetails.title,
    flowLogic: computePoguesFlowLogic(formDetails.flowLogic),
    formulasLanguage: computePoguesFormulasLanguage(
      formDetails.formulasLanguage,
    ),
    targetMode: formDetails.targetModes.map(
      (mode) => TargetModes[mode as number] as string,
    ),
    agency: formDetails.agency,
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
