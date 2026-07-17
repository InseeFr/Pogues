import { createFileRoute } from '@tanstack/react-router'

import { questionnaireDetailsQueryOptions } from '@/api/questionnaireDetails'
import { seriesQueryOptions } from '@/api/series'
import DetailsOverview from '@/components/details/QuestionnaireDetailsOverview'
import DetailsOverviewLayout from '@/components/details/QuestionnaireDetailsOverviewLayout'
import ErrorComponent from '@/components/layout/ErrorComponent'

//import { agencyQueryOptions } from '@/api/agency'

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/details/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ErrorComponent error={error} />
    </CustomLayout>
  ),
  loader: async ({ params: { questionnaireId }, context: { queryClient } }) => {
    const series = await queryClient.ensureQueryData(seriesQueryOptions())
    //const agencies = await queryClient.ensureQueryData(agencyQueryOptions())
    const questionnaireDetails = await queryClient.ensureQueryData(
      questionnaireDetailsQueryOptions(questionnaireId),
    )
    return {
      series,
      questionnaireDetails,
      //agencies
    }
  },
})

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId
  const { questionnaireDetails, series } = Route.useLoaderData()

  return (
    <CustomLayout>
      <DetailsOverview
        questionnaireId={questionnaireId}
        questionnaireDetails={questionnaireDetails}
        series={series}
      />
    </CustomLayout>
  )
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DetailsOverviewLayout>{children}</DetailsOverviewLayout>
}
