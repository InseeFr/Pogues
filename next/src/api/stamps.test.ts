import nock from 'nock';

import { getStamps } from './stamps';

vi.mock('@/contexts/oidc');

it('Get stamps works', async () => {
  const stamps = [{ label: 'my-stamp', value: 'stamp-1' }];

  nock('https://mock-api')
    .get('/persistence/questionnaires/stamps')
    .reply(200, stamps);

  const res = await getStamps();
  expect(res).toEqual(stamps);
});
