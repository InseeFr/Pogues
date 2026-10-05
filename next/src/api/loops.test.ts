import nock from 'nock'

import { type InitialLoopMember, LoopMemberType } from '@/models/loops'

import { deleteLoop, getLoop, getLoopMembers, postLoop } from './loops'
import type { LoopDTO } from './models/loopDTO'

vi.mock('@/lib/auth/oidc')

it('Get loop members works', async () => {
  const members: InitialLoopMember[] = [
    {
      id: 'S1',
      name: 'S1',
      type: LoopMemberType.Sequence,
      finalMembers: [
        { id: 'S1', name: 'S1', type: LoopMemberType.Sequence },
        { id: 'E1', name: 'E1', type: LoopMemberType.ExternalElement },
      ],
    },
  ]

  nock('https://mock-api')
    .get('/questionnaires/my-questionnaire/loops/members')
    .reply(200, members)

  const res = await getLoopMembers('my-questionnaire')
  expect(res).toEqual(members)
})

it('Get loop works', async () => {
  const loop: LoopDTO = {
    id: 'my-loop',
    name: 'MY_LOOP',
    initialMember: 'S1',
    finalMember: 'E1',
    basedOn: 'my-scope',
    filter: 'true',
    relatedLoopNames: ['OTHER_LOOP'],
  }

  nock('https://mock-api')
    .get('/questionnaires/my-questionnaire/loops/my-loop')
    .reply(200, loop)

  const res = await getLoop('my-questionnaire', 'my-loop')
  expect(res).toEqual(loop)
})

it('Post loop works', async () => {
  const loop: LoopDTO = {
    id: 'my-loop',
    name: 'MY_LOOP',
    initialMember: 'S1',
    finalMember: 'E1',
    isFixedLength: false,
    minimum: '1',
    maximum: '2',
  }

  nock('https://mock-api')
    .post('/questionnaires/my-questionnaire/loop', loop)
    .reply(201)

  const res = await postLoop('my-questionnaire', loop)
  expect(res.status).toEqual(201)
})

it('Delete loop works', async () => {
  nock('https://mock-api')
    .delete('/questionnaires/my-questionnaire/loops/my-loop')
    .reply(204)

  const res = await deleteLoop('my-questionnaire', 'my-loop')
  expect(res.status).toEqual(204)
})
