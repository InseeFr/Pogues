import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { deleteReleaseRequest, releasesKeys } from '@/api/releases'

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

  const queryClient = useQueryClient()

  const publications = releases

  const hasAnyContent = pendingRequests.length > 0 || publications.length > 0

  const deleteMutation = useMutation({
    mutationFn: ({
      questionnaireId,
      trackerId,
    }: {
      questionnaireId: string
      trackerId: number
    }) => {
      return deleteReleaseRequest(questionnaireId, trackerId)
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: releasesKeys.pending(questionnaireId),
      }),
  })

  function onDelete(trackerId: number) {
    const promise = deleteMutation.mutateAsync({
      questionnaireId: pendingRequests[0].poguesId,
      trackerId: trackerId,
    })
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('release.deleteRequestSuccess', { label: trackerId }),
      error: t('release.deleteRequestError'),
    })
  }

  const sortedRequests = sortByRequestDateDesc(pendingRequests)
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
      <div className="relative bg-default border border-default shadow-md">
        <div className="border-b border-default px-4 py-3">
          <h3>{t('release.publicationRequests')}</h3>
        </div>
        {sortedRequests.length > 0 ? (
          sortedRequests.map((request) => (
            <ReleaseRequestTile
              key={request.releaseRequestId}
              request={request}
              onDelete={() => onDelete(request.releaseRequestId)}
            />
          ))
        ) : (
          <div className="px-4 py-3 text-color-secondary">
            {t('release.noReleaseRequests')}
          </div>
        )}
      </div>

      {sortedPublications.length > 0 ? (
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
      ) : (
        <div className="px-4 py-3 text-color-secondary">
          {t('release.noReleases')}
        </div>
      )}
    </div>
  )
}
