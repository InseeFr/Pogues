import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import type { RegistryRelease, ReleaseRequest } from '../../models/releases'
import { RegistryReleaseTile } from './overview/RegistryReleaseTile'
import { ReleaseRequestTile } from './overview/ReleaseRequestTile'

const MOCK_REQUESTS: ReleaseRequest[] = [
  {
    trackerId: 1,
    author: 'xbeltv',
    requestDate: new Date('2026-07-06T10:30:00').getTime(),
    currentStep: 'BUILD_PARAMETERS',
    status: 'RUNNING',
    statusDescription: '',
    poguesVersionId: '550e8400-e29b-41d4-a716-446655440000',
    poguesId: 'SRCV_REINTERRO',
    releaseDescription: 'Recette intégrée oct 2025 pour SRCV_REINTERRO 2026',
    mode: 'CAPI',
    context: 'HOUSEHOLD',
    overrideGenerationParameters: {
      questionNumberingMode: 'SEQUENCE',
      responseTimeQuestion: true,
    },
  },
  {
    trackerId: 2,
    author: 'nazdsn',
    requestDate: new Date('2026-07-05T14:15:00').getTime(),
    currentStep: 'GENERATE_DDI',
    status: 'FAILED',
    statusDescription: 'Erreur lors de la génération Eno',
    poguesVersionId: '550e8400-e29b-41d4-a716-446655440001',
    poguesId: 'SRCV_REINTERRO',
    releaseDescription: 'Autre demande de publication pour SRCV_REINTERRO 2026',
    mode: 'CAPI',
    context: 'BUSINESS',
    overrideGenerationParameters: {
      questionNumberingMode: 'NONE',
      responseTimeQuestion: false,
    },
  },
  {
    trackerId: 3,
    author: 'bcbab8',
    requestDate: new Date('2026-07-04T09:00:00').getTime(),
    currentStep: 'PUBLISH_DDI',
    status: 'FAILED',
    statusDescription: 'Erreur 409 - Conflit de version',
    poguesVersionId: '550e8400-e29b-41d4-a716-446655440002',
    poguesId: 'SRCV_REINTERRO',
    releaseDescription: 'Recette intégrée oct 2025 pour SRCV_REINTERRO 2026',
    mode: 'CAPI',
    context: 'HOUSEHOLD',
    overrideGenerationParameters: {
      questionNumberingMode: 'ALL',
      responseTimeQuestion: true,
    },
  },
]

const MOCK_PUBLICATIONS: RegistryRelease[] = [
  {
    collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440001',
    version: 3,
    author: 'xbeltv',
    releaseDate: new Date('2026-07-04T08:00:00').getTime(),
    poguesVersionId: '93d1e85c-327d-4153-a5fa-e04f54ca0e3e',
    releaseDescription: 'ESA 2026 PROD',
    mode: 'CAWI',
    context: 'HOUSEHOLD',
    overrideGenerationParameters: {
      questionNumberingMode: 'NONE',
      responseTimeQuestion: false,
    },
    visualizeUrl: 'https://visu.example.com/esa-2026-prod',
  },
  {
    collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440002',
    version: 2,
    author: 'nazdsn',
    releaseDate: new Date('2026-06-28T10:00:00').getTime(),
    poguesVersionId: '5ddf61df-00c8-4018-a763-fa7bc91b0162',
    releaseDescription: 'ESA 2026 TEST TERRAIN',
    mode: 'CAPI',
    context: 'BUSINESS',
    overrideGenerationParameters: {
      questionNumberingMode: 'NONE',
      responseTimeQuestion: false,
    },
    visualizeUrl: 'https://visu.example.com/esa-2026-test',
  },
  {
    collectionInstrumentId: '550e8400-e29b-41d4-a716-446655440003',
    version: 1,
    author: 'bcbab8',
    releaseDate: new Date('2026-06-15T11:30:00').getTime(),
    poguesVersionId: 'b77e7cad-475d-4d83-b036-fa7a98a84a8a',
    releaseDescription: "Publication la plus ancienne d'ESA",
    mode: 'CAWI',
    context: 'HOUSEHOLD',
    overrideGenerationParameters: null,
    visualizeUrl: 'https://visu.example.com/esa-2026-old',
  },
]

function sortByRequestDateDesc(items: ReleaseRequest[]): ReleaseRequest[] {
  return [...items].sort((a, b) => b.requestDate - a.requestDate)
}

function sortByReleaseDateDesc(items: RegistryRelease[]): RegistryRelease[] {
  return [...items].sort((a, b) => b.releaseDate - a.releaseDate)
}

export default function ReleaseOverview() {
  const { t } = useTranslation()

  const [requests, setRequests] = useState<ReleaseRequest[]>(MOCK_REQUESTS)
  const publications = MOCK_PUBLICATIONS

  const hasAnyContent = requests.length > 0 || publications.length > 0

  function handleDeleteRequest(trackerId: number) {
    setRequests((prev) => prev.filter((d) => d.trackerId !== trackerId))
  }

  const sortedRequests = sortByRequestDateDesc(requests)
  const sortedPublications = sortByReleaseDateDesc(publications)

  if (!hasAnyContent) {
    return (
      <div className="text-center">
        <p>{t('release.noPublication')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {sortedRequests.length > 0 && (
        <div className="relative bg-default border border-default shadow-md">
          <div className="border-b border-default px-4 py-3">
            <h3>{t('release.publicationRequests')}</h3>
          </div>
          {sortedRequests.map((request) => (
            <ReleaseRequestTile
              key={request.trackerId}
              request={request}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      )}

      {sortedPublications.length > 0 && (
        <div className="relative bg-default border border-default shadow-md">
          <div className="border-b border-default px-4 py-3">
            <h3>{t('release.myPublications')}</h3>
          </div>
          {sortedPublications.map((release) => (
            <RegistryReleaseTile
              key={release.collectionInstrumentId}
              release={release}
            />
          ))}
        </div>
      )}
    </div>
  )
}
