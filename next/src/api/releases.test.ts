import nock from 'nock'

import { TargetModes } from '@/models/questionnaires'

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
  author: 'xbeltv',
  releaseDate: '2026-07-06T10:30:00.000Z',
  poguesVersionId: '550e8400-e29b-41d4-a716-446655440000',
  releaseDescription: 'Release description',
  context: 'HOUSEHOLD',
  collectionInstruments: [
    {
      mode: 'CAWI',
      collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440001',
      version: 1,
      overrideGenerationParameters: {
        questionNumberingMode: 'SEQUENCE',
        responseTimeQuestion: true,
      },
      visualizeUrl: 'https://visu.example.com/test',
    },
  ],
}

it('Get releases works', async () => {
  nock('https://mock-api')
    .get('/questionnaire/my-questionnaire/releases')
    .reply(200, [registryReleaseDTO])

  const res = await getReleases('my-questionnaire')
  expect(res).toEqual([
    {
      author: 'xbeltv',
      releaseDate: new Date('2026-07-06T10:30:00.000Z').getTime(),
      poguesVersionId: '550e8400-e29b-41d4-a716-446655440000',
      releaseDescription: 'Release description',
      context: 'HOUSEHOLD',
      collectionInstruments: [
        {
          mode: TargetModes.CAWI,
          collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440001',
          version: 1,
          overrideGenerationParameters: {
            questionNumberingMode: 'SEQUENCE',
            responseTimeQuestion: true,
          },
          visualizeUrl: 'https://visu.example.com/test',
        },
      ],
    },
  ])
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
    modes: ['CAWI'],
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
