import nock from 'nock';

import { FormulasLanguages, TargetModes } from '@/models/questionnaires';

import {
  type Questionnaire as PoguesQuestionnaire,
  SurveyModeEnum,
} from './models/pogues';
import {
  getQuestionnaire,
  getQuestionnaires,
  postQuestionnaire,
  putQuestionnaire,
} from './questionnaires';

vi.mock('@/lib/auth/oidc');

const poguesQuestionnaire = {
  id: 'id',
  Name: 'name',
  Label: ['title'],
  TargetMode: [SurveyModeEnum.CAPI],
  DataCollection: [],
  lastUpdatedDate:
    'Tue Nov 19 2024 11:36:56 GMT+0000 (Coordinated Universal Time)',
};

const questionnaire = {
  id: 'id',
  title: 'title',
  targetModes: new Set([TargetModes.CAPI]),
  lastUpdatedDate: new Date('2024-11-19T11:36:56Z'),
  codesLists: [],
  formulasLanguage: FormulasLanguages.VTL,
};

it('Get questionnaires works', async () => {
  const questionnaires: PoguesQuestionnaire[] = [poguesQuestionnaire];

  nock('https://mock-api')
    .get('/persistence/questionnaires/search/meta?owner=my-stamp')
    .reply(200, questionnaires);

  const res = await getQuestionnaires('my-stamp');
  expect(res).toEqual([questionnaire]);
});

it('Get questionnaire works', async () => {
  nock('https://mock-api')
    .get('/persistence/questionnaire/id')
    .reply(200, poguesQuestionnaire);

  const res = await getQuestionnaire('id');
  expect(res).toEqual(questionnaire);
});

it('Post questionnaire works', async () => {
  nock('https://mock-api').post('/persistence/questionnaires').reply(201);

  const res = await postQuestionnaire(questionnaire, 'my-stamp');
  expect(res.status).toEqual(201);
});

it('Put questionnaire works', async () => {
  nock('https://mock-api').put('/persistence/questionnaire/id').reply(200);

  const res = await putQuestionnaire('id', poguesQuestionnaire);
  expect(res.status).toEqual(200);
});
