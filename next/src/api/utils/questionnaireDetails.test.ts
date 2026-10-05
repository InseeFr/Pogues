import { TargetModes } from '@/models/questionnaires'

import { SurveyModeEnum } from '../models/poguesModel'
import type { QuestionnaireDetailsDTO } from '../models/questionnaireDetailsDTO'
import {
  type FormDetails,
  computeQuestionnaireDetails,
  computeQuestionnaireDetailsDTO,
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
      targetModes: [TargetModes.CAPI, TargetModes.PAPI],
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

describe('computeQuestionnaireDetailsDTO', () => {
  const existingDto: QuestionnaireDetailsDTO = {
    id: 'q123',
    name: 'original',
    label: 'Original',
    targetMode: [SurveyModeEnum.CAPI],
    agency: 'fr.insee',
    owner: 'ESQUIE',
  }

  const serieDetails = {
    id: 's1004',
    uri: 'http://example.fr/esquie',
    label: 'Enquête Esquie',
    altLabel: 'EL',
  }

  it('builds a questionnaire detail dto from form details', () => {
    const formDetails: FormDetails = {
      name: 'NEW_NAME',
      title: 'New Title',
      serie: 's1004',
      agency: 'fr.insee',
      targetModes: [TargetModes.CAPI, TargetModes.PAPI],
      owner: 'MONOCO',
    }

    const result = computeQuestionnaireDetailsDTO(
      formDetails,
      existingDto,
      serieDetails,
    )

    expect(result.id).toBe('q123')
    expect(result.owner).toBe('MONOCO')
    expect(result.name).toBe('NEW_NAME')
    expect(result.label).toBe('New Title')
    expect(result.agency).toBe('fr.insee')
    expect(result.targetMode).toEqual(['CAPI', 'PAPI'])
    expect(result.dataCollection?.serie).toEqual(serieDetails)
  })

  it('preserves the original DTO fields that are not overwritten', () => {
    const formDetails: FormDetails = {
      name: 'NEW_NAME',
      title: 'New Title',
      serie: 's1004',
      agency: 'fr.insee',
      targetModes: [],
      owner: 'ESQUIE',
    }

    const result = computeQuestionnaireDetailsDTO(
      formDetails,
      existingDto,
      serieDetails,
    )

    expect(result.id).toBe('q123')
    expect(result.owner).toBe('ESQUIE')
  })

  it('maps targetModes Set to SurveyModeEnum string array', () => {
    const formDetails: FormDetails = {
      name: 'test',
      title: 'Test',
      serie: 's1004',
      agency: 'fr.insee',
      targetModes: [TargetModes.CAWI, TargetModes.CATI],
      owner: 'ESQUIE',
    }

    const result = computeQuestionnaireDetailsDTO(
      formDetails,
      existingDto,
      serieDetails,
    )

    expect(result.targetMode).toEqual(['CAWI', 'CATI'])
  })

  it('produces an empty targetMode array for an empty array', () => {
    const formDetails: FormDetails = {
      name: 'test',
      title: 'Test',
      serie: 's1004',
      agency: 'fr.insee',
      targetModes: [],
      owner: 'ESQUIE',
    }

    const result = computeQuestionnaireDetailsDTO(
      formDetails,
      existingDto,
      serieDetails,
    )

    expect(result.targetMode).toEqual([])
  })
})
