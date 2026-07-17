import {
  FlowLogics,
  FormulasLanguages,
  TargetModes,
} from '@/models/questionnaires'

import { SurveyModeEnum } from '../models/poguesModel'
import type { QuestionnaireDetailsDTO } from '../models/questionnaireDetailsDTO'
import { computeFlowLogic, computePoguesFlowLogic } from './flowLogic'
import {
  computeFormulasLanguage,
  computePoguesFormulasLanguage,
} from './formulasLanguage'
import { computeTargetModes } from './targetModes'

export type FormDetails = {
  name: string
  title: string
  serie: string
  agency: string
  targetModes: Set<TargetModes>
  flowLogic: FlowLogics
  formulasLanguage: FormulasLanguages
  operation?: string
}

function computeSerieId(dto: QuestionnaireDetailsDTO): string {
  return dto.dataCollection?.serie.id ?? ''
}

export function computeQuestionnaireDetails(
  dto: QuestionnaireDetailsDTO,
): FormDetails {
  return {
    name: dto.name,
    title: dto.label,
    serie: computeSerieId(dto),
    agency: dto.agency,
    targetModes: computeTargetModes(dto.targetMode as SurveyModeEnum[]),
    flowLogic: computeFlowLogic(dto.flowLogic) ?? FlowLogics.Filter,
    formulasLanguage:
      computeFormulasLanguage(dto.formulasLanguage) ?? FormulasLanguages.VTL,
    operation: dto.dataCollection?.operations[0]?.id,
  }
}

export function computeQuestionnaireDetailsDTO(
  formDetails: FormDetails,
  existingDto: QuestionnaireDetailsDTO,
  serieDetails: { id: string; uri: string; label: string; altLabel: string },
  operations: { id: string; uri: string; label: string }[],
): QuestionnaireDetailsDTO {
  return {
    ...existingDto,
    name: formDetails.name,
    label: formDetails.title,
    flowLogic: computePoguesFlowLogic(formDetails.flowLogic),
    formulasLanguage: computePoguesFormulasLanguage(
      formDetails.formulasLanguage,
    ),
    targetMode: Array.from(formDetails.targetModes).map(
      (mode) => TargetModes[mode as number] as string,
    ),
    agency: formDetails.agency,
    dataCollection: {
      serie: {
        id: serieDetails.id,
        uri: serieDetails.uri,
        label: serieDetails.label,
        altLabel: serieDetails.altLabel,
      },
      operations,
    },
  }
}
