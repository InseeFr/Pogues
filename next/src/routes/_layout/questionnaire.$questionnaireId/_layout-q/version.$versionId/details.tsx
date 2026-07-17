import { createFileRoute } from '@tanstack/react-router'

import { questionnaireDetailsFromVersionQueryOptions } from '@/api/questionnaireDetails'
import { seriesQueryOptions } from '@/api/series'
import { computeQuestionnaireDetails } from '@/api/utils/questionnaireDetails'
import DetailsOverviewLayout from '@/components/details/QuestionnaireDetailsOverviewLayout'
import QuestionnaireDetailsForm from '@/components/details/form/QuestionnaireDetailsForm'
import ErrorComponent from '@/components/layout/ErrorComponent'

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/details',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ErrorComponent error={error} />
    </CustomLayout>
  ),
  loader: async ({
    params: { questionnaireId, versionId },
    context: { queryClient },
  }) => {
    const series = await queryClient.ensureQueryData(seriesQueryOptions())
    const questionnaireDetails = await queryClient.ensureQueryData(
      questionnaireDetailsFromVersionQueryOptions(questionnaireId, versionId),
    )
    return {
      series,
      questionnaireDetails,
    }
  },
})

function RouteComponent() {
  const { questionnaireDetails, series } = Route.useLoaderData()

  return (
    <CustomLayout>
      <QuestionnaireDetailsForm
        series={series}
        defaultValues={computeQuestionnaireDetails(questionnaireDetails)}
        onSubmit={() => {}}
        submitLabel=""
        readOnly
      />
    </CustomLayout>
  )
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DetailsOverviewLayout>{children}</DetailsOverviewLayout>
}
