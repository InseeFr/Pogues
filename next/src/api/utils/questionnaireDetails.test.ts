import { TargetModes } from '@/models/questionnaires'

import { SurveyModeEnum } from '../models/poguesModel'
import type { QuestionnaireDetailsDTO } from '../models/questionnaireDetailsDTO'
import {
  type FormDetails,
  computeQuestionnaireDetails,
} from './questionnaireDetails'

describe('computeQuestionnaireDetails', () => {
  it('should compute a questionnaire details correctly', () => {
    const dto: QuestionnaireDetailsDTO = {
      id: 'q123',
      name: 'MNABSOLUTE',
      label: '[mn] absolute cinema',
      targetMode: [SurveyModeEnum.CAPI, SurveyModeEnum.PAPI],
      agency: 'fr.insee',
      owner: 'ESQUIE',
      dataCollection: {
        serie: {
          id: 's1004',
          uri: 'http://example.fr/esquie',
          label: 'Enquête Esquie',
          altLabel: 'EL',
        },
      },
    }

    const result = computeQuestionnaireDetails(dto)

    expect(result).toEqual<FormDetails>({
      name: 'MNABSOLUTE',
      title: '[mn] absolute cinema',
      serie: 's1004',
      agency: 'fr.insee',
      targetModes: new Set([TargetModes.CAPI, TargetModes.PAPI]),
      owner: 'ESQUIE',
    })
  })

  it('handles empty serie id when dataCollection is missing', () => {
    const dto: QuestionnaireDetailsDTO = {
      id: 'q123',
      name: 'test',
      label: 'Test',
      targetMode: [],
      agency: 'fr.insee',
      owner: 'owner',
    }

    const result = computeQuestionnaireDetails(dto)

    expect(result.serie).toBe('')
  })
})
