import nock from 'nock';

import { deleteCodesList, putCodesList } from './codesLists';

vi.mock('@/contexts/oidc');

it('Delete codes list', async () => {
  nock('https://mock-api')
    .delete('/persistence/questionnaire/my-q-id/codes-list/my-code-list-id')
    .reply(204);

  const res = await deleteCodesList('my-q-id', 'my-code-list-id');
  expect(res.status).toEqual(204);
});

it('Create codes list', async () => {
  nock('https://mock-api')
    .put('/persistence/questionnaire/my-q-id/codes-list/my-code-list-id')
    .reply(201);

  const res = await putCodesList('my-q-id', 'my-code-list-id', {
    codes: [],
    id: 'id',
    label: 'label',
  });
  expect(res.status).toEqual(201);
});
