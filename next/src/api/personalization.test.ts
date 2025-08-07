import nock from 'nock';

import {
  PersonalizationQuestionnaire,
  SurveyContextEnum,
  SurveyContextValueEnum,
} from '@/models/personalizationQuestionnaire';

import {
  addQuestionnaireData,
  deleteQuestionnaireData,
  getAllInterrogationData,
  getExistingFileSchema,
  getPublicEnemyDataFromPogues,
} from './personalization';

vi.mock('@/contexts/oidc', () => ({
  getOidc: () =>
    Promise.resolve({
      getTokens: () => ({
        accessToken: 'fake-token',
      }),
    }),
}));

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

const mockCsvData = {
  data: [
    { id: '1', name: 'Teemo' },
    { id: '2', name: 'Panda' },
  ],
  errors: [],
  meta: {
    fields: ['id', 'name'],
    delimiter: ',',
    linebreak: '\n',
    aborted: false,
    truncated: false,
    cursor: 42,
  },
};

it('Get personalization data works', async () => {
  console.log(
    'VITE_PERSONALIZATION_URL in test:',
    import.meta.env.VITE_PERSONALIZATION_URL,
  );

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

  await expect(
    deleteQuestionnaireData('my-questionnaire'),
  ).resolves.toBeUndefined();
});

it('Get interrogation data works', async () => {
  nock('https://mock-personalization-api')
    .get('/interrogations/my-questionnaire')
    .reply(200, mockInterrogationData);

  const res = await getAllInterrogationData('my-questionnaire');
  expect(res).toEqual(mockInterrogationData);
});

it('Get CSV data works', async () => {
  nock('https://mock-personalization-api')
    .get('/questionnaires/my-questionnaire/data')
    .reply(200, mockCsvData);

  const res = await getExistingFileSchema('my-questionnaire');
  expect(res).toEqual(mockCsvData);
});

it('Add questionnaire data works', async () => {
  nock('https://mock-personalization-api')
    .post('/questionnaires')
    .reply(201, mockData);

  const res = await addQuestionnaireData(mockData);
  expect(res).toEqual(mockData);
});
