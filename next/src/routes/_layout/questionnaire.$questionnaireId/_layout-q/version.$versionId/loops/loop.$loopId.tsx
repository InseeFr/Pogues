import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import {
  loopFromVersionQueryOptions,
  loopMembersFromVersionQueryOptions,
} from '@/api/loops'
import { scopesFromVersionQueryOptions } from '@/api/scopes'
import { variablesFromVersionQueryOptions } from '@/api/variables'
import ErrorComponent from '@/components/layout/ErrorComponent'
import EditLoop from '@/components/loop/edit/EditLoop'
import EditLoopLayout from '@/components/loop/edit/EditLoopLayout'
import type { Loop } from '@/models/loops'

/**
 * Page that display a loop of an older version of the questionnaire, which
 * can be neither updated nor deleted.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/loops/loop/$loopId',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ErrorComponent error={error} />
    </CustomLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, versionId, loopId },
  }) => {
    await Promise.all([
      queryClient.ensureQueryData(
        loopFromVersionQueryOptions(questionnaireId, versionId, loopId),
      ),
      queryClient.ensureQueryData(
        scopesFromVersionQueryOptions(questionnaireId, versionId),
      ),
      queryClient.ensureQueryData(
        loopMembersFromVersionQueryOptions(questionnaireId, versionId),
      ),
      queryClient.ensureQueryData(
        variablesFromVersionQueryOptions(questionnaireId, versionId),
      ),
    ])
    return { crumb: t('crumb.loop', { id: loopId }) }
  },
})

function RouteComponent() {
  const { questionnaireId, versionId, loopId } = Route.useParams()

  const { data: loop } = useSuspenseQuery(
    loopFromVersionQueryOptions(questionnaireId, versionId, loopId),
  )
  const { data: scopes } = useSuspenseQuery(
    scopesFromVersionQueryOptions(questionnaireId, versionId),
  )
  const { data: loopMembers } = useSuspenseQuery(
    loopMembersFromVersionQueryOptions(questionnaireId, versionId),
  )
  const { data: variables } = useSuspenseQuery(
    variablesFromVersionQueryOptions(questionnaireId, versionId),
  )

  return (
    <CustomLayout loop={loop}>
      <EditLoop
        questionnaireId={questionnaireId}
        loop={loop}
        scopes={scopes}
        loopMembers={loopMembers}
        variables={variables}
        versionId={versionId}
      />
    </CustomLayout>
  )
}

function CustomLayout({
  children,
  loop,
}: Readonly<{ children: React.ReactNode; loop?: Loop }>) {
  const { questionnaireId, versionId } = Route.useParams()

  return (
    <EditLoopLayout
      loop={loop}
      questionnaireId={questionnaireId}
      versionId={versionId}
    >
      {children}
    </EditLoopLayout>
  )
}
