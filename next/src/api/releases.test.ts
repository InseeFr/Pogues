import nock from 'nock'

import { TargetModes } from '@/models/questionnaires'
import type { RegistryRelease, ReleaseRequest } from '@/models/releases'

import type {
  CreateReleaseDTO,
  RegistryReleaseDTO,
  ReleaseRequestDTO,
} from './models/releaseDTO'
import {
  deleteReleaseRequest,
  getPendingReleases,
  getReleases,
  postRelease,
} from './releases'

vi.mock('@/lib/auth/oidc')

const registryReleaseDTO: RegistryReleaseDTO = {
  collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440001',
  version: 3,
  author: 'xbeltv',
  releaseDate: 1780560000000,
  poguesVersionId: '93d1e85c-327d-4153-a5fa-e04f54ca0e3e',
  releaseDescription: 'ESA 2026 PROD',
  mode: 'CAWI',
  context: 'HOUSEHOLD',
  overrideGenerationParameters: {
    questionNumberingMode: 'NONE',
    responseTimeQuestion: false,
  },
  visualizeUrl: 'https://visu.example.com/esa-2026-prod',
}

const registryRelease: RegistryRelease = {
  ...registryReleaseDTO,
  mode: TargetModes.CAWI,
}

const releaseRequestDTO: ReleaseRequestDTO = {
  trackerId: 1,
  author: 'xbeltv',
  requestDate: 1780560000000,
  currentStep: 'BUILD_PARAMETERS',
  status: 'RUNNING',
  statusDescription: '',
  poguesVersionId: '550e8400-e29b-41d4-a716-446655440000',
  poguesId: 'SRCV_REINTERRO',
  releaseDescription: 'Release description',
  mode: 'CAPI',
  context: 'HOUSEHOLD',
  overrideGenerationParameters: {
    questionNumberingMode: 'SEQUENCE',
    responseTimeQuestion: true,
  },
}

const releaseRequest: ReleaseRequest = {
  ...releaseRequestDTO,
  mode: TargetModes.CAPI,
}

it('Get releases works', async () => {
  const releases: RegistryReleaseDTO[] = [registryReleaseDTO]

  nock('https://mock-api')
    .get('/persistence/questionnaire/my-questionnaire/releases')
    .reply(200, releases)

  const res = await getReleases('my-questionnaire')
  expect(res).toEqual([registryRelease])
})

it('Get pending releases works', async () => {
  const requests: ReleaseRequestDTO[] = [releaseRequestDTO]

  nock('https://mock-api')
    .get('/persistence/questionnaire/my-questionnaire/release-requests')
    .reply(200, requests)

  const res = await getPendingReleases('my-questionnaire')
  expect(res).toEqual([releaseRequest])
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
