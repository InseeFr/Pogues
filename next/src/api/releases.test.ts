import nock from 'nock'

import type { CreateReleaseDTO } from './models/releaseDTO'
import {
  MOCK_PUBLICATIONS,
  MOCK_REQUESTS,
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
  // const requests: ReleaseRequestDTO[] = [releaseRequestDTO]

  // nock('https://mock-api')
  //   .get('/persistence/questionnaire/my-questionnaire/release-requests')
  //   .reply(200, requests)

  // const res = await getPendingReleases('my-questionnaire')
  // expect(res).toEqual([releaseRequest])
  const res = await getPendingReleases('my-questionnaire')
  expect(res).toEqual(MOCK_REQUESTS)
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
    .post('/persistence/questionnaire/my-questionnaire/releases')
    .reply(201)

  const res = await postRelease('my-questionnaire', createRelease)
  expect(res.status).toEqual(201)
})

it('Delete release request works', async () => {
  nock('https://mock-api')
    .delete('/persistence/questionnaire/my-questionnaire/release-requests/42')
    .reply(204)

  const res = await deleteReleaseRequest('my-questionnaire', 42)
  expect(res.status).toEqual(204)
})
