import nock from 'nock';

import { CodesList } from '@/models/codesLists';

import { deleteCodesList, getCodesLists, putCodesList } from './codesLists';

vi.mock('@/contexts/oidc');

const codeList = {
  id: 'id1',
  label: 'my code list',
  codes: [
    {
      label: 'my-label',
      value: 'my-code',
      codes: [
        {
          label: 'my-sublabel',
          value: 'my-subcode',
        },
      ],
    },
  ],
  relatedQuestionNames: ['HOW_ARE_YOU', 'WHAT_IS_YOUR_NAME'],
};

it('Get codes lists works', async () => {
  const codesLists: CodesList[] = [codeList];

  nock('https://mock-api')
    .get('/persistence/questionnaire/my-questionnaire/codes-lists')
    .reply(200, codesLists);

  const res = await getCodesLists('my-questionnaire');
  expect(res).toEqual([codeList]);
});

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
