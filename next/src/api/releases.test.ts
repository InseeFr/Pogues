import nock from 'nock'

import { TargetModes } from '@/models/questionnaires'

import type { CreateReleaseDTO, ReleaseRequestDTO } from './models/releaseDTO'
import {
  MOCK_PUBLICATIONS,
  deleteReleaseRequest,
  getPendingReleases,
  getReleases,
  postRelease,
} from './releases'

vi.mock('@/lib/auth/oidc')

it('Get releases works', async () => {
  // const releases: RegistryReleaseDTO[] = [registryReleaseDTO]

  // nock('https://mock-api')
  //   .get('/persistence/questionnaire/my-questionnaire/releases')
  //   .reply(200, releases)

  // const res = await getReleases('my-questionnaire')
  // expect(res).toEqual([registryRelease])

  const res = await getReleases('my-questionnaire')
  expect(res).toEqual(MOCK_PUBLICATIONS)
})

it('Get pending releases works', async () => {
  const requests: ReleaseRequestDTO[] = [
    {
      releaseRequestId: 1,
      author: 'xbeltv',
      requestDate: '2026-07-06T10:30:00.000Z',
      status: 'RUNNING',
      statusDescription: '',
      poguesVersionId: '550e8400-e29b-41d4-a716-446655440000',
      poguesId: 'SRCV_REINTERRO',
      releaseDescription: 'Release description',
      modes: ['CAWI'],
      context: 'HOUSEHOLD',
      overrideGenerationParameters: {
        questionNumberingMode: 'SEQUENCE',
        responseTimeQuestion: true,
      },
    },
  ]

  nock('https://mock-api')
    .get('/questionnaire/my-questionnaire/release-requests')
    .reply(200, requests)

  const res = await getPendingReleases('my-questionnaire')
  expect(res).toEqual([
    {
      ...requests[0],
      requestDate: new Date(requests[0].requestDate).getTime(),
      modes: [TargetModes.CAWI],
    },
  ])
})

it('Post release works', async () => {
  const createRelease: CreateReleaseDTO = {
    poguesId: 'my-questionnaire',
    releaseDescription: 'New release',
    mode: 'CAWI',
    context: 'HOUSEHOLD',
    overrideGenerationParameters: {
      questionNumberingMode: 'SEQUENCE',
      responseTimeQuestion: true,
    },
  }

  nock('https://mock-api')
    .post('/questionnaire/my-questionnaire/releases')
    .reply(201)

  const res = await postRelease('my-questionnaire', createRelease)
  expect(res.status).toEqual(201)
})

it('Delete release request works', async () => {
  nock('https://mock-api')
    .delete('/questionnaire/my-questionnaire/release-requests/42')
    .reply(204)

  const res = await deleteReleaseRequest('my-questionnaire', 42)
  expect(res.status).toEqual(204)
})
