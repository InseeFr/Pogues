import {
  FormulasLanguages,
  Questionnaire,
  TargetModes,
} from '@/models/questionnaires'

import {
  FlowLogicEnum,
  FormulasLanguageEnum,
  GenericNameEnum,
  Questionnaire as PoguesQuestionnaire,
  SurveyModeEnum,
} from '../models/poguesModel'
import { QuestionnaireDetailsDTO } from '../models/questionnaireDetailsDTO'
import { FormDetails } from './questionnaireDetails'
import {
  computeQuestionnaire,
  computeQuestionnaireDetailsDTO,
} from './questionnaires'

it('computeQuestionnaire works', () => {
  const poguesQuestionnaire: PoguesQuestionnaire = {
    id: 'id',
    Name: 'TITLE',
    Label: ['title'],
    TargetMode: [SurveyModeEnum.CAPI, SurveyModeEnum.PAPI],
    DataCollection: [],
    lastUpdatedDate:
      'Tue Nov 19 2024 11:36:56 GMT+0000 (Coordinated Universal Time)',
    Variables: { Variable: [] },
    agency: 'fr.insee',
    childQuestionnaireRef: [],
    flowLogic: FlowLogicEnum.Redirection,
    formulasLanguage: FormulasLanguageEnum.XPath,
    genericName: GenericNameEnum.Questionnaire,
    owner: 'my-stamp',
    FlowControl: [],
    ComponentGroup: [],
    CodeLists: {
      CodeList: [{ id: 'idcl', Name: 'cl', Label: 'cl', Code: [] }],
    },
    Child: [
      {
        Name: 'QUESTIONNAIRE_END',
        Label: ['QUESTIONNAIRE_END'],
        id: 'idendquest',
        type: 'SequenceType',
        depth: 1,
        TargetMode: [SurveyModeEnum.CAPI, SurveyModeEnum.PAPI],
        genericName: GenericNameEnum.Module,
      },
    ],
    Iterations: {
      Iteration: [
        { id: 'id-iteration-1', Name: 'mon_itération_1' },
        { id: 'id-iteration-2', Name: 'mon_itération_2' },
      ],
    },
  }

  const scopes = new Map()
  scopes.set('id-iteration-1', 'mon_itération_1')
  scopes.set('id-iteration-2', 'mon_itération_2')
  const questionnaire: Questionnaire = {
    id: 'id',
    title: 'title',
    targetModes: new Set([TargetModes.CAPI, TargetModes.PAPI]),
    codesLists: [{ id: 'idcl', label: 'cl', codes: [] }],
    lastUpdatedDate: new Date('2024-11-19T11:36:56Z'),
    formulasLanguage: FormulasLanguages.XPath,
    scopes,
  }

  expect(computeQuestionnaire(poguesQuestionnaire)).toEqual(questionnaire)
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
      targetModes: new Set([TargetModes.CAPI, TargetModes.PAPI]),
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
      targetModes: new Set(),
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
      targetModes: new Set([TargetModes.CAWI, TargetModes.CATI]),
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
      targetModes: new Set(),
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
