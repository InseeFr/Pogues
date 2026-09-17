import { TargetModes } from '@/models/questionnaires'
import type { RegistryRelease, ReleaseRequest } from '@/models/releases'
import type { Version } from '@/models/version'

import { getLatestVersionId, hasReleaseForVersion } from './utils'

const LATEST_VERSION_ID = '550e8400-e29b-41d4-a716-446655440003'
const OLDER_VERSION_ID = '550e8400-e29b-41d4-a716-446655440000'

const versions: Version[] = [
  {
    id: OLDER_VERSION_ID,
    poguesId: 'quid',
    timestamp: '2024-01-01T10:00:00Z',
    day: '01/01/2024',
    author: 'testuser',
  },
  {
    id: LATEST_VERSION_ID,
    poguesId: 'quid',
    timestamp: '2026-01-01T10:00:00Z',
    day: '01/01/2026',
    author: 'testuser',
  },
]

const release: RegistryRelease = {
  author: 'testuser',
  releaseDate: new Date('2026-01-02T10:00:00Z').getTime(),
  poguesVersionId: LATEST_VERSION_ID,
  releaseDescription: 'ESA 2026 PROD',
  context: 'HOUSEHOLD',
  collectionInstruments: [],
}

const request: ReleaseRequest = {
  releaseRequestId: 1,
  author: 'xbeltv',
  requestDate: new Date('2026-01-03T10:30:00Z').getTime(),
  status: 'RUNNING',
  statusDescription: '',
  poguesVersionId: LATEST_VERSION_ID,
  poguesId: 'quid',
  releaseDescription: 'Recette intégrée oct 2025',
  modes: [TargetModes.CAPI],
  context: 'HOUSEHOLD',
  overrideGenerationParameters: {
    questionNumberingMode: 'SEQUENCE',
    responseTimeQuestion: true,
  },
}

describe('getLatestVersionId', () => {
  it('returns the id of the most recent version', () => {
    expect(getLatestVersionId(versions)).toBe(LATEST_VERSION_ID)
  })

  it('returns undefined when there is no version', () => {
    expect(getLatestVersionId([])).toBeUndefined()
  })
})

describe('hasReleaseForVersion', () => {
  it('returns true when a release targets the version', () => {
    expect(hasReleaseForVersion(LATEST_VERSION_ID, [release], [])).toBe(true)
  })

  it('returns true when a release request targets the version', () => {
    expect(hasReleaseForVersion(LATEST_VERSION_ID, [], [request])).toBe(true)
  })

  it('returns false when no release or request targets the version', () => {
    expect(hasReleaseForVersion(OLDER_VERSION_ID, [release], [request])).toBe(
      false,
    )
  })

  it('returns false when the version id is undefined', () => {
    expect(hasReleaseForVersion(undefined, [release], [request])).toBe(false)
  })
})
