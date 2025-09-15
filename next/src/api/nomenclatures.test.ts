import nock from 'nock';

import { Nomenclature } from '@/models/nomenclature';

import { getNomenclatures, getNomenclaturesFromVersion } from './nomenclatures';

vi.mock('@/lib/auth/oidc');

const nomenclature = {
  id: 'id1',
  label: 'my nomenclature',
  version: 'my version',
  externalLink: { urn: 'my-external-link' },
  relatedQuestionNames: ['HOW_ARE_YOU', 'WHAT_IS_YOUR_NAME'],
};

it('Get nomenclatures works', async () => {
  const nomenclatures: Nomenclature[] = [nomenclature];

  nock('https://mock-api')
    .get('/questionnaires/my-questionnaire/nomenclatures')
    .reply(200, nomenclatures);

  const res = await getNomenclatures('my-questionnaire');
  expect(res).toEqual([nomenclature]);
});

it('Get nomenclatures from version works', async () => {
  const nomenclatures: Nomenclature[] = [nomenclature];

  nock('https://mock-api')
    .get('/questionnaires/my-questionnaire/version/my-version/nomenclatures')
    .reply(200, nomenclatures);

  const res = await getNomenclaturesFromVersion(
    'my-questionnaire',
    'my-version',
  );
  expect(res).toEqual([nomenclature]);
});
