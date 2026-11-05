import type { Questionnaire } from '@/models/questionnaires'

import type { Questionnaire as PoguesQuestionnaire } from '../models/poguesModel'
import {
  QuestionnaireDetailsDTO,
  SerieDetailDTO,
} from '../models/questionnaireDetailsDTO'
import { computeCodesLists } from './codesLists'
import { computeDataCollection } from './dataCollection'
import { computeFormulasLanguage } from './formulasLanguage'
import { FormDetails } from './questionnaireDetails'
import { computeScopes } from './scopes'
import { computePoguesTargetModes, computeTargetModes } from './targetModes'

/** Compute a questionnaire that can be used in our app from API data.
 * @deprecated use `computeQuestionnaireDetailsDTO` instead
 */
export function computeQuestionnaire(
  datum: PoguesQuestionnaire,
): Questionnaire {
  return {
    id: datum.id,
    title: datum.Label[0],
    targetModes: computeTargetModes(datum.TargetMode),
    lastUpdatedDate: datum.lastUpdatedDate
      ? new Date(datum.lastUpdatedDate)
      : undefined,
    codesLists: computeCodesLists(datum.CodeLists?.CodeList),
    formulasLanguage: computeFormulasLanguage(datum.formulasLanguage),
    scopes: computeScopes(datum),
    dataCollectionSerie: datum.DataCollection
      ? computeDataCollection(datum.DataCollection)
      : undefined,
  }
}

/** Compute a questionnaire from the new questionnaire form. */
export function computeQuestionnaireDetailsDTO(
  formDetails: FormDetails,
  existingDto: QuestionnaireDetailsDTO,
  serieDetails?: SerieDetailDTO,
): QuestionnaireDetailsDTO {
  return {
    ...existingDto,
    dataCollection: undefined,
    name: formDetails.name,
    label: formDetails.title,
    targetMode: computePoguesTargetModes(formDetails.targetModes),
    agency: formDetails.agency,
    owner: formDetails.owner,

    ...(serieDetails
      ? {
          dataCollection: {
            serie: {
              id: serieDetails.id,
              uri: serieDetails.uri,
              label: serieDetails.label,
              altLabel: serieDetails.altLabel,
            },
          },
        }
      : {}),
  }
}
