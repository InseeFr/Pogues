import { createFileRoute } from '@tanstack/react-router'

import { questionnaireDetailsQueryOptions } from '@/api/questionnaireDetails'
import { seriesQueryOptions } from '@/api/series'
import { stampsQueryOptions } from '@/api/stamps'
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
    const series = await queryClient.fetchQuery(seriesQueryOptions())
    //const agencies = await queryClient.fetchQuery(agencyQueryOptions())
    const questionnaireDetails = await queryClient.fetchQuery(
      questionnaireDetailsQueryOptions(questionnaireId),
    )
    const stamps = await queryClient.fetchQuery(stampsQueryOptions())
    return {
      series,
      questionnaireDetails,
      stamps,
      //agencies
    }
  },
})

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId
  const { questionnaireDetails, series, stamps } = Route.useLoaderData()

  return (
    <CustomLayout>
      <DetailsOverview
        questionnaireId={questionnaireId}
        questionnaireDetails={questionnaireDetails}
        series={series}
        stamps={stamps}
      />
    </CustomLayout>
  )
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DetailsOverviewLayout>{children}</DetailsOverviewLayout>
}
