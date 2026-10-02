import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { loopMembersQueryOptions } from '@/api/loops'
import { scopesQueryOptions } from '@/api/scopes'
import ErrorComponent from '@/components/layout/ErrorComponent'
import CreateLoop from '@/components/loop/create/CreateLoop'
import CreateLoopLayout from '@/components/loop/create/CreateLoopLayout'

/**
 * Page for creating a loop in a questionnaire.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/loops/new',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CreateLoopLayout>
      <ErrorComponent error={error} />
    </CreateLoopLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId },
  }) => {
    queryClient.ensureQueryData(scopesQueryOptions(questionnaireId))
    queryClient.ensureQueryData(loopMembersQueryOptions(questionnaireId))
    return { crumb: t('crumb.new') }
  },
})

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId

  const { data: scopes } = useSuspenseQuery(scopesQueryOptions(questionnaireId))
  const { data: loopMembers } = useSuspenseQuery(
    loopMembersQueryOptions(questionnaireId),
  )

  return (
    <CreateLoopLayout>
      <CreateLoop
        questionnaireId={questionnaireId}
        scopes={scopes}
        loopMembers={loopMembers}
      />
    </CreateLoopLayout>
  )
}
