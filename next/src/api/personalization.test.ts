import nock from 'nock';
import { vi } from 'vitest';

import {
  PersonalizationQuestionnaire,
  SurveyContextEnum,
  SurveyContextValueEnum,
} from '@/models/personalizationQuestionnaire';

import { instancePersonalization } from './instancePersonalization';
import {
  addQuestionnaireData,
  deleteQuestionnaireData,
  getAllInterrogationData,
  getPublicEnemyDataFromPogues,
} from './personalization';

vi.mock('@/lib/auth/oidc', () => ({
  getOidc: () =>
    Promise.resolve({
      getTokens: () => ({
        accessToken: 'fake-token',
      }),
    }),
}));
beforeAll(() => {
  vi.stubEnv('VITE_PERSONALIZATION_URL', 'https://mock-personalization-api');
  instancePersonalization.defaults.baseURL = 'https://mock-personalization-api';
});

afterAll(() => {
  vi.unstubAllEnvs();
  nock.cleanAll();
});
const mockData: PersonalizationQuestionnaire = {
  id: '1',
  poguesId: '1',
  label: 'LabelQuestionnaire',
  modes: [
    { name: 'CAWI', isWebMode: true },
    { name: 'CAPI', isWebMode: false },
  ],
  context: {
    name: SurveyContextEnum.HOUSEHOLD,
    value: SurveyContextValueEnum.HOUSEHOLD,
  },
  interrogationData: undefined,
  isOutdated: false,
  state: 'COMPLETED',
};

const mockInterrogationData = {
  CAPI: [
    { id: '1', displayableId: 1, url: 'https://CAPI1.com' },
    { id: '2', displayableId: 2, url: 'https://CAPI2.com' },
    { id: '3', displayableId: 3, url: 'https://CAPI3.com' },
  ],
  CAWI: [
    { id: '1', displayableId: 1, url: 'https://CAWI1.com' },
    { id: '2', displayableId: 2, url: 'https://CAWI2.com' },
  ],
  PAPI: [],
  CATI: [],
};

it('Get personalization data works', async () => {
  nock('https://mock-personalization-api')
    .get('/questionnaires/my-questionnaire')
    .reply(200, mockData);

  const res = await getPublicEnemyDataFromPogues('my-questionnaire');
  expect(res).toEqual(mockData);
});

it('Delete personalization data works', async () => {
  nock('https://mock-personalization-api')
    .delete('/questionnaires/my-questionnaire')
    .reply(204);

  const res = await deleteQuestionnaireData('my-questionnaire');
  expect(res.status).toEqual(204);
});

it('Get interrogation data works', async () => {
  nock('https://mock-personalization-api')
    .get('/questionnaires/my-questionnaire/interrogations')
    .reply(200, mockInterrogationData);

  const res = await getAllInterrogationData('my-questionnaire');
  expect(res).toEqual(mockInterrogationData);
});

it('Add questionnaire data works', async () => {
  nock('https://mock-personalization-api')
    .post('/questionnaires')
    .reply(201, mockData);

  const res = await addQuestionnaireData(mockData);
  expect(res).toEqual(mockData);
});
