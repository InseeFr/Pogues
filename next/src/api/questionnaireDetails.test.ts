import nock from 'nock'

import {
  FlowLogicEnum,
  FormulasLanguageEnum,
  SurveyModeEnum,
} from './models/poguesModel'
import type { QuestionnaireDetailsDTO } from './models/questionnaireDetailsDTO'
import {
  getQuestionnaireDetails,
  getQuestionnaireDetailsFromVersion,
  putQuestionnaireDetail,
} from './questionnaireDetails'

vi.mock('@/lib/auth/oidc')

const questionnaireDetail: QuestionnaireDetailsDTO = {
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
  },
}

it('Get questionnaire details works', async () => {
  nock('https://mock-api')
    .get('/persistence/questionnaire/q123/details')
    .reply(200, questionnaireDetail)

  const res = await getQuestionnaireDetails('q123')
  expect(res).toEqual(questionnaireDetail)
})

it('Get questionnaire details from version works', async () => {
  nock('https://mock-api')
    .get('/persistence/questionnaire/q123/version/v456/details')
    .reply(200, questionnaireDetail)

  const res = await getQuestionnaireDetailsFromVersion('q123', 'v456')
  expect(res).toEqual(questionnaireDetail)
})

it('Put questionnaire detail works', async () => {
  nock('https://mock-api')
    .put('/persistence/questionnaire/q123/details', questionnaireDetail)
    .reply(200, { status: 'ok' })

  const res = await putQuestionnaireDetail('q123', questionnaireDetail)
  expect(res.status).toEqual(200)
})
