import nock from 'nock'

import { type InitialLoopMember, LoopMemberType } from '@/models/loops'

import { getLoopMembers } from './loops'

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
