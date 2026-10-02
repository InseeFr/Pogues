import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { SurveyModeEnum } from '@/api/models/poguesModel'
import { questionnaireDetailsQueryOptions } from '@/api/questionnaireDetails'
import { computeTargetModes } from '@/api/utils/targetModes'
import {
  pendingReleasesQueryOptions,
  releasesQueryOptions,
} from '@/api/releases'
import { latestVersionQueryOptions } from '@/api/versions'
import ErrorComponent from '@/components/layout/ErrorComponent'
import CreateRelease from '@/components/release/create/CreateRelease'
import CreateReleaseLayout from '@/components/release/create/CreateReleaseLayout'
import { hasReleaseForVersion } from '@/components/release/overview/utils/utils'

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
      queryClient.ensureQueryData(latestVersionQueryOptions(questionnaireId)),
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
  const { data: latestVersion } = useSuspenseQuery(
    latestVersionQueryOptions(questionnaireId),
  )

  const latestVersionId = latestVersion?.id
  const isPublishDisabled = hasReleaseForVersion(
    latestVersionId,
    releases,
    pendingRequests,
  )

  return (
    <CreateReleaseLayout>
      <CreateRelease
        questionnaireId={questionnaireId}
        targetModes={Array.from(
          computeTargetModes(
            questionnaireDetails.targetMode as SurveyModeEnum[],
          ),
        )}
        serie={questionnaireDetails.dataCollection?.serie}
        isPublishDisabled={isPublishDisabled}
      />
    </CreateReleaseLayout>
  )
}
