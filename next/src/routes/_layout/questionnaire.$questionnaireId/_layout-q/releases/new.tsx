import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { questionnaireDetailsQueryOptions } from '@/api/questionnaireDetails'
import {
  pendingReleasesQueryOptions,
  releasesQueryOptions,
} from '@/api/releases'
import { versionsQueryOptions } from '@/api/versions'
import ErrorComponent from '@/components/layout/ErrorComponent'
import CreateRelease from '@/components/release/create/CreateRelease'
import CreateReleaseLayout from '@/components/release/create/CreateReleaseLayout'
import {
  getLatestVersionId,
  hasReleaseForVersion,
} from '@/components/release/overview/utils/utils'

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/releases/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CreateReleaseLayout>
      <ErrorComponent error={error} />
    </CreateReleaseLayout>
  ),
  loader: async ({ params: { questionnaireId }, context: { queryClient } }) => {
    const questionnaireDetails = await queryClient.fetchQuery(
      questionnaireDetailsQueryOptions(questionnaireId),
    )
    await Promise.all([
      queryClient.ensureQueryData(releasesQueryOptions(questionnaireId)),
      queryClient.ensureQueryData(pendingReleasesQueryOptions(questionnaireId)),
      queryClient.ensureQueryData(versionsQueryOptions(questionnaireId)),
    ])
    return {
      questionnaireDetails,
    }
  },
})

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId

  const { questionnaireDetails } = Route.useLoaderData()
  const { data: releases = [] } = useSuspenseQuery(
    releasesQueryOptions(questionnaireId),
  )
  const { data: pendingRequests = [] } = useSuspenseQuery(
    pendingReleasesQueryOptions(questionnaireId),
  )
  const { data: versions = [] } = useSuspenseQuery(
    versionsQueryOptions(questionnaireId),
  )

  const latestVersionId = getLatestVersionId(versions)
  const isPublishDisabled = hasReleaseForVersion(
    latestVersionId,
    releases,
    pendingRequests,
  )

  return (
    <CreateReleaseLayout>
      <CreateRelease
        questionnaireId={questionnaireId}
        targetModes={questionnaireDetails.targetMode}
        serie={questionnaireDetails.dataCollection?.serie}
        isPublishDisabled={isPublishDisabled}
      />
    </CreateReleaseLayout>
  )
}
