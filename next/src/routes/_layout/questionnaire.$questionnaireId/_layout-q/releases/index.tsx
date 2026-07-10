import { createFileRoute } from '@tanstack/react-router'

import ErrorComponent from '@/components/layout/ErrorComponent'
import ReleaseOverview from '@/components/release/ReleaseOverview'
import ReleaseOverviewLayout from '@/components/release/ReleasesOverviewLayout'

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/releases/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ErrorComponent error={error} />
    </CustomLayout>
  ),
})

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId

  return (
    <ReleaseOverviewLayout questionnaireId={questionnaireId}>
      <ReleaseOverview />
    </ReleaseOverviewLayout>
  )
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId } = Route.useParams()

  return (
    <ReleaseOverviewLayout questionnaireId={questionnaireId}>
      {children}
    </ReleaseOverviewLayout>
  )
}
