import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { loopMembersQueryOptions, loopQueryOptions } from '@/api/loops'
import { scopesQueryOptions } from '@/api/scopes'
import ErrorComponent from '@/components/layout/ErrorComponent'
import EditLoop from '@/components/loop/edit/EditLoop'
import EditLoopLayout from '@/components/loop/edit/EditLoopLayout'

/**
 * Page that allow to update an existing loop.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/loops/loop/$loopId',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <EditLoopLayout>
      <ErrorComponent error={error} />
    </EditLoopLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, loopId },
  }) => {
    queryClient.ensureQueryData(loopQueryOptions(questionnaireId, loopId))
    queryClient.ensureQueryData(scopesQueryOptions(questionnaireId))
    queryClient.ensureQueryData(loopMembersQueryOptions(questionnaireId))
    return { crumb: t('crumb.loop', { id: loopId }) }
  },
})

function RouteComponent() {
  const { questionnaireId, loopId } = Route.useParams()

  const { data: loop } = useSuspenseQuery(
    loopQueryOptions(questionnaireId, loopId),
  )
  const { data: scopes } = useSuspenseQuery(scopesQueryOptions(questionnaireId))
  const { data: loopMembers } = useSuspenseQuery(
    loopMembersQueryOptions(questionnaireId),
  )

  return (
    <EditLoopLayout loop={loop}>
      <EditLoop
        questionnaireId={questionnaireId}
        loop={loop}
        scopes={scopes}
        loopMembers={loopMembers}
      />
    </EditLoopLayout>
  )
}
