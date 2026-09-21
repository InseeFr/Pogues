import { createFileRoute } from '@tanstack/react-router'

import { SurveyModeEnum } from '@/api/models/poguesModel'
import { questionnaireDetailsQueryOptions } from '@/api/questionnaireDetails'
import { computeTargetModes } from '@/api/utils/targetModes'
import ErrorComponent from '@/components/layout/ErrorComponent'
import CreateRelease from '@/components/release/create/CreateRelease'
import CreateReleaseLayout from '@/components/release/create/CreateReleaseLayout'

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
    return {
      questionnaireDetails,
    }
  },
})

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId

  const { questionnaireDetails } = Route.useLoaderData()

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
      />
    </CreateReleaseLayout>
  )
}
