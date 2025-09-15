import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { articulationQueryOptions } from '@/api/articulation';
import { ErrorCodes, isPoguesAPIError } from '@/api/error';
import { ArticulationOverview } from '@/components/articulation/overview/ArticulationOverview';
import ArticulationOverviewLayout from '@/components/articulation/overview/ArticulationOverviewLayout';
import ErrorComponent from '@/components/layout/ErrorComponent';

/**
 * Main articulation page where we display the articulation items of our
 * questionnaire and allow to set them.
 *
 * This functionality is only available to questionnaire in CATI or CAPI,
 * with a roundabout.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/articulation/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <CustomErrorComponent error={error} />,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(articulationQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: articulation } = useSuspenseQuery(
    articulationQueryOptions(questionnaireId),
  );

  return (
    <ArticulationOverviewLayout>
      <ArticulationOverview
        questionnaireId={questionnaireId}
        articulationItems={articulation.items}
      />
    </ArticulationOverviewLayout>
  );
}

function computeErrorMessage(error: Error, t: TFunction): string {
  if (isPoguesAPIError(error)) {
    switch (error.response?.data.errorCode) {
      case ErrorCodes.QuestionnaireFormulaLanguageNotVTL:
        return t('articulation.overview.error.formulaNotVtl');
      case ErrorCodes.QuestionnaireRoundaboutNotFound:
        return t('articulation.overview.error.roundaboutNotFound');
    }
  }

  return error.message;
}

function CustomErrorComponent({ error }: Readonly<{ error: Error }>) {
  const { t } = useTranslation();
  const errorMessage = computeErrorMessage(error, t);

  return (
    <ErrorComponent
      ContentLayout={ArticulationOverviewLayout}
      error={errorMessage}
    />
  );
}
