import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { questionnaireQueryOptions } from '@/api/questionnaires'
import ErrorComponent from '@/components/layout/ErrorComponent'
import CreateRelease from '@/components/release/create/CreateRelease'
import CreateReleaseLayout from '@/components/release/create/CreateReleaseLayout'
import type { Questionnaire } from '@/models/questionnaires'

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/releases/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CreateReleaseLayout>
      <ErrorComponent error={error} />
    </CreateReleaseLayout>
  ),
  loader: async ({ context: { t } }) => {
    return { crumb: t('crumb.new') }
  },
})

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId

  const { data: questionnaire }: { data: Questionnaire } = useSuspenseQuery(
    questionnaireQueryOptions(questionnaireId),
  )

  return (
    <CreateReleaseLayout>
      <CreateRelease
        questionnaireId={questionnaireId}
        targetModes={questionnaire.targetModes}
      />
    </CreateReleaseLayout>
  )
}
