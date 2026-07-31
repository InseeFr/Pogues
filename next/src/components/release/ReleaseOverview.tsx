import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import type { RegistryRelease, ReleaseRequest } from '../../models/releases'
import { RegistryReleaseTile } from './overview/RegistryReleaseTile'
import { ReleaseRequestTile } from './overview/ReleaseRequestTile'

interface ReleaseOveriewProps {
  pendingRequests: ReleaseRequest[]
  releases: RegistryRelease[]
}

function sortByRequestDateDesc(items: ReleaseRequest[]): ReleaseRequest[] {
  return [...items].sort((a, b) => b.requestDate - a.requestDate)
}

function sortByReleaseDateDesc(items: RegistryRelease[]): RegistryRelease[] {
  return [...items].sort((a, b) => b.releaseDate - a.releaseDate)
}

export default function ReleaseOverview({
  pendingRequests,
  releases,
}: Readonly<ReleaseOveriewProps>) {
  const { t } = useTranslation()

  const [requests, setRequests] = useState<ReleaseRequest[]>(pendingRequests)
  const publications = releases

  const hasAnyContent = requests.length > 0 || publications.length > 0

  function handleDeleteRequest(releaseRequestId: number) {
    setRequests((prev) =>
      prev.filter((d) => d.releaseRequestId !== releaseRequestId),
    )
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
              key={request.releaseRequestId}
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
              key={release.poguesVersionId}
              release={release}
            />
          ))}
        </div>
      )}
    </div>
  )
}
