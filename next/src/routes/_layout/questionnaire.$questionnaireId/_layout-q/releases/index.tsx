import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import {
  pendingReleasesQueryOptions,
  releasesQueryOptions,
} from '@/api/releases'
import { versionsQueryOptions } from '@/api/versions'
import ErrorComponent from '@/components/layout/ErrorComponent'
import ReleaseOverview from '@/components/release/ReleaseOverview'
import ReleaseOverviewLayout from '@/components/release/ReleasesOverviewLayout'
import {
  getLatestVersionId,
  hasReleaseForVersion,
} from '@/components/release/overview/utils/utils'

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/releases/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ErrorComponent error={error} />
    </CustomLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) => {
    await Promise.all([
      queryClient.ensureQueryData(releasesQueryOptions(questionnaireId)),
      queryClient.ensureQueryData(pendingReleasesQueryOptions(questionnaireId)),
      queryClient.ensureQueryData(versionsQueryOptions(questionnaireId)),
    ])
  },
})

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId

  const { data: requests } = useSuspenseQuery(
    pendingReleasesQueryOptions(questionnaireId),
  )
  const { data: releases } = useSuspenseQuery(
    releasesQueryOptions(questionnaireId),
  )
  const { data: versions = [] } = useSuspenseQuery(
    versionsQueryOptions(questionnaireId),
  )

  const latestVersionId = getLatestVersionId(versions)
  const isPublishDisabled = hasReleaseForVersion(
    latestVersionId,
    releases,
    requests,
  )

  return (
    <ReleaseOverviewLayout
      questionnaireId={questionnaireId}
      isPublishDisabled={isPublishDisabled}
    >
      <ReleaseOverview pendingRequests={requests} releases={releases} />
    </ReleaseOverviewLayout>
  )
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId } = Route.useParams()

  return (
    <ReleaseOverviewLayout
      questionnaireId={questionnaireId}
      isPublishDisabled={false}
    >
      {children}
    </ReleaseOverviewLayout>
  )
}
