import nock from 'nock';

import { Version } from '@/models/version';

import { deleteAllVersions, getAllVersions, restoreVersion } from './versions';

vi.mock('@/contexts/oidc');

const version = {
  author: 'Guybrush Threepwood',
  day: '2025-07-01',
  id: 'id',
  poguesId: 'pogues-id',
  timestamp: '2025-07-01T17:42:39.822591+02:00',
};

it('Get versions works', async () => {
  const versions: Version[] = [version];

  nock('https://mock-api')
    .get('/persistence/questionnaire/my-questionnaire/versions')
    .reply(200, versions);

  const res = await getAllVersions('my-questionnaire');
  expect(res).toEqual([version]);
});

it('Delete all versions works', async () => {
  nock('https://mock-api')
    .delete('/persistence/questionnaire/my-questionnaire/versions')
    .reply(200);

  const res = await deleteAllVersions('my-questionnaire');
  expect(res.status).toEqual(200);
});

it('Restore version works', async () => {
  nock('https://mock-api')
    .post('/persistence/questionnaire/restore/my-version')
    .reply(200);

  const res = await restoreVersion('my-version');
  expect(res.status).toEqual(200);
});
