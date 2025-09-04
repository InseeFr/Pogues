import nock from 'nock';

import { Articulation } from '@/models/articulation';

import {
  deleteArticulation,
  getArticulation,
  getArticulationFromVersion,
  putArticulation,
} from './articulation';

vi.mock('@/contexts/oidc');

const articulation: Articulation = {
  items: [
    { label: 'Prénom', value: 'first name formula' },
    { label: 'Sexe', value: 'gender formula' },
    { label: 'Age', value: 'age formula' },
  ],
};

it('Get articulation works', async () => {
  nock('https://mock-api')
    .get('/persistence/questionnaire/my-questionnaire/articulation')
    .reply(200, articulation);

  const res = await getArticulation('my-questionnaire');
  expect(res).toEqual(articulation);
});

it('Get articulation from version works', async () => {
  nock('https://mock-api')
    .get(
      '/persistence/questionnaire/my-questionnaire/version/my-version/articulation',
    )
    .reply(200, articulation);

  const res = await getArticulationFromVersion(
    'my-questionnaire',
    'my-version',
  );
  expect(res).toEqual(articulation);
});

it('Put articulation', async () => {
  nock('https://mock-api')
    .put(
      '/persistence/questionnaire/my-questionnaire/articulation',
      articulation,
    )
    .reply(200, { status: 'ok' });
  const res = await putArticulation('my-questionnaire', articulation);
  expect(res.status).toEqual(200);
});
