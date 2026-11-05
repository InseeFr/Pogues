import nock from 'nock'

import { FormulasLanguages, TargetModes } from '@/models/questionnaires'

import {
  type Questionnaire as PoguesQuestionnaire,
  SurveyModeEnum,
} from './models/poguesModel'
import {
  getQuestionnaire,
  getQuestionnaires,
  getQuestionnairesByStampOrSeries,
  putQuestionnaire,
} from './questionnaires'

vi.mock('@/lib/auth/oidc')

const poguesQuestionnaire = {
  id: 'id',
  Name: 'name',
  Label: ['title'],
  TargetMode: [SurveyModeEnum.CAPI],
  DataCollection: [],
  lastUpdatedDate:
    'Tue Nov 19 2024 11:36:56 GMT+0000 (Coordinated Universal Time)',
}

const questionnaire = {
  id: 'id',
  title: 'title',
  targetModes: new Set([TargetModes.CAPI]),
  lastUpdatedDate: new Date('2024-11-19T11:36:56Z'),
  codesLists: [],
  formulasLanguage: FormulasLanguages.VTL,
  scopes: new Map(),
}

it('Get questionnaires works', async () => {
  const questionnaires: PoguesQuestionnaire[] = [poguesQuestionnaire]

  nock('https://mock-api')
    .get('/persistence/questionnaires/search/meta?owner=my-stamp')
    .reply(200, questionnaires)

  const res = await getQuestionnaires('my-stamp')
  expect(res).toEqual([questionnaire])
})

it('Get questionnaires by stamp or series works', async () => {
  const questionnaires = [
    {
      id: 'id',
      label: 'title',
      lastUpdatedDate: '2024-11-19T11:36:56Z',
      owner: 'my-stamp',
      serie: {
        id: 'serie-id',
        uri: 'serie-uri',
        label: 'Serie label',
        altLabel: 'Serie alt label',
      },
    },
  ]

  nock('https://mock-api')
    .get('/questionnaires')
    .query({ owner: 'my-stamp', serieId: 'serie-id' })
    .reply(200, questionnaires)

  const res = await getQuestionnairesByStampOrSeries('my-stamp', 'serie-id')
  expect(res).toEqual(questionnaires)
})

it('Get questionnaire works', async () => {
  nock('https://mock-api')
    .get('/persistence/questionnaire/id')
    .reply(200, poguesQuestionnaire)

  const res = await getQuestionnaire('id')
  expect(res).toEqual(questionnaire)
})

it('Put questionnaire works', async () => {
  nock('https://mock-api').put('/persistence/questionnaire/id').reply(200)

  const res = await putQuestionnaire('id', poguesQuestionnaire)
  expect(res.status).toEqual(200)
})
