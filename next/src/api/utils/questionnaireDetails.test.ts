import {
  FlowLogics,
  FormulasLanguages,
  TargetModes,
} from '@/models/questionnaires'

import {
  FlowLogicEnum,
  FormulasLanguageEnum,
  SurveyModeEnum,
} from '../models/poguesModel'
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
      flowLogic: FlowLogicEnum.Filter,
      formulasLanguage: FormulasLanguageEnum.VTL,
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
        operations: [
          {
            id: 'op1',
            uri: 'http://id.insee.fr/operations/operation/op1',
            label: 'Operation 1',
          },
        ],
      },
    }

    const result = computeQuestionnaireDetails(dto)

    expect(result).toEqual<FormDetails>({
      name: 'MNABSOLUTE',
      title: '[mn] absolute cinema',
      serie: 's1004',
      agency: 'fr.insee',
      targetModes: [TargetModes.CAPI, TargetModes.PAPI],
      flowLogic: FlowLogics.Filter,
      formulasLanguage: FormulasLanguages.VTL,
      operation: 'op1',
    })
  })

  it('handles empty serie id when dataCollection is missing', () => {
    const dto: QuestionnaireDetailsDTO = {
      id: 'q123',
      name: 'test',
      label: 'Test',
      flowLogic: FlowLogicEnum.Filter,
      formulasLanguage: FormulasLanguageEnum.VTL,
      targetMode: [],
      agency: 'fr.insee',
      owner: 'owner',
    }

    const result = computeQuestionnaireDetails(dto)

    expect(result.serie).toBe('')
  })

  it('handles missing operations in dataCollection', () => {
    const dto: QuestionnaireDetailsDTO = {
      id: 'q123',
      name: 'test',
      label: 'Test',
      flowLogic: FlowLogicEnum.Filter,
      formulasLanguage: FormulasLanguageEnum.VTL,
      targetMode: [],
      agency: 'fr.insee',
      owner: 'owner',
      dataCollection: {
        serie: {
          id: 's1',
          uri: 'uri',
          label: 'Serie',
          altLabel: '',
        },
        operations: [],
      },
    }

    const result = computeQuestionnaireDetails(dto)

    expect(result.operation).toBeUndefined()
  })

  it('maps REDIRECTION flow logic', () => {
    const dto: QuestionnaireDetailsDTO = {
      id: 'q123',
      name: 'test',
      label: 'Test',
      flowLogic: FlowLogicEnum.Redirection,
      formulasLanguage: FormulasLanguageEnum.VTL,
      targetMode: [],
      agency: 'fr.insee',
      owner: 'owner',
    }

    const result = computeQuestionnaireDetails(dto)

    expect(result.flowLogic).toBe(FlowLogics.Redirection)
  })

  it('maps XPATH formulas language', () => {
    const dto: QuestionnaireDetailsDTO = {
      id: 'q123',
      name: 'test',
      label: 'Test',
      flowLogic: FlowLogicEnum.Filter,
      formulasLanguage: FormulasLanguageEnum.XPath,
      targetMode: [],
      agency: 'fr.insee',
      owner: 'owner',
    }

    const result = computeQuestionnaireDetails(dto)

    expect(result.formulasLanguage).toBe(FormulasLanguages.XPath)
  })

  it('falls back to Filter when flowLogic is undefined', () => {
    const dto: QuestionnaireDetailsDTO = {
      id: 'q123',
      name: 'test',
      label: 'Test',
      flowLogic: undefined as unknown as FlowLogicEnum,
      formulasLanguage: FormulasLanguageEnum.VTL,
      targetMode: [],
      agency: 'fr.insee',
      owner: 'owner',
    }

    const result = computeQuestionnaireDetails(dto)

    expect(result.flowLogic).toBe(FlowLogics.Filter)
  })

  it('falls back to VTL when formulasLanguage is undefined', () => {
    const dto: QuestionnaireDetailsDTO = {
      id: 'q123',
      name: 'test',
      label: 'Test',
      flowLogic: FlowLogicEnum.Filter,
      formulasLanguage: undefined as unknown as FormulasLanguageEnum,
      targetMode: [],
      agency: 'fr.insee',
      owner: 'owner',
    }

    const result = computeQuestionnaireDetails(dto)

    expect(result.formulasLanguage).toBe(FormulasLanguages.VTL)
  })
})

describe('computeQuestionnaireDetailsDTO', () => {
  const existingDto: QuestionnaireDetailsDTO = {
    id: 'q123',
    name: 'original',
    label: 'Original',
    flowLogic: FlowLogicEnum.Filter,
    formulasLanguage: FormulasLanguageEnum.VTL,
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
      flowLogic: FlowLogics.Redirection,
      formulasLanguage: FormulasLanguages.XPath,
      operation: 'op1',
    }

    const result = computeQuestionnaireDetailsDTO(
      formDetails,
      existingDto,
      serieDetails,
      [{ id: 'op1', uri: 'uri', label: 'Op 1' }],
    )

    expect(result.id).toBe('q123')
    expect(result.owner).toBe('ESQUIE')
    expect(result.name).toBe('NEW_NAME')
    expect(result.label).toBe('New Title')
    expect(result.flowLogic).toBe(FlowLogicEnum.Redirection)
    expect(result.formulasLanguage).toBe(FormulasLanguageEnum.XPath)
    expect(result.agency).toBe('fr.insee')
    expect(result.targetMode).toEqual(['CAPI', 'PAPI'])
    expect(result.dataCollection?.serie).toEqual(serieDetails)
    expect(result.dataCollection?.operations).toEqual([
      { id: 'op1', uri: 'uri', label: 'Op 1' },
    ])
  })

  it('preserves the original DTO fields that are not overwritten', () => {
    const formDetails: FormDetails = {
      name: 'NEW_NAME',
      title: 'New Title',
      serie: 's1004',
      agency: 'fr.insee',
      targetModes: [],
      flowLogic: FlowLogics.Filter,
      formulasLanguage: FormulasLanguages.VTL,
    }

    const result = computeQuestionnaireDetailsDTO(
      formDetails,
      existingDto,
      serieDetails,
      [],
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
      flowLogic: FlowLogics.Filter,
      formulasLanguage: FormulasLanguages.VTL,
    }

    const result = computeQuestionnaireDetailsDTO(
      formDetails,
      existingDto,
      serieDetails,
      [],
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
      flowLogic: FlowLogics.Filter,
      formulasLanguage: FormulasLanguages.VTL,
    }

    const result = computeQuestionnaireDetailsDTO(
      formDetails,
      existingDto,
      serieDetails,
      [],
    )

    expect(result.targetMode).toEqual([])
  })

  it('produces an empty targetMode array for an empty array', () => {
    const formDetails: FormDetails = {
      name: 'test',
      title: 'Test',
      serie: 's1004',
      agency: 'fr.insee',
      targetModes: [],
      flowLogic: FlowLogics.Redirection,
      formulasLanguage: FormulasLanguages.VTL,
    }

    const result = computeQuestionnaireDetailsDTO(
      formDetails,
      existingDto,
      serieDetails,
      [],
    )

    expect(result.flowLogic).toBe(FlowLogicEnum.Redirection)
  })

  it('maps XPath formulas language to the enum value', () => {
    const formDetails: FormDetails = {
      name: 'test',
      title: 'Test',
      serie: 's1004',
      agency: 'fr.insee',
      targetModes: [],
      flowLogic: FlowLogics.Filter,
      formulasLanguage: FormulasLanguages.XPath,
    }

    const result = computeQuestionnaireDetailsDTO(
      formDetails,
      existingDto,
      serieDetails,
      [],
    )

    expect(result.formulasLanguage).toBe(FormulasLanguageEnum.XPath)
  })
})
