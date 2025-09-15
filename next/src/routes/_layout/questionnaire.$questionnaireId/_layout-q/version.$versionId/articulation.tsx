import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { articulationFromVersionQueryOptions } from '@/api/articulation';
import { ErrorCodes, isPoguesAPIError } from '@/api/error';
import { ArticulationOverview } from '@/components/articulation/overview/ArticulationOverview';
import ArticulationOverviewVersionLayout from '@/components/articulation/overview/ArticulationOverviewVersionLayout';
import ErrorComponent from '@/components/layout/ErrorComponent';

/**
 * Main articulation page where we display the articulation items related to our
 * version of a questionnaire for information.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/articulation',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <CustomErrorComponent error={error} />,
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, versionId },
  }) => {
    queryClient.ensureQueryData(
      articulationFromVersionQueryOptions(questionnaireId, versionId),
    );
    return { crumb: t('crumb.articulation') };
  },
});

function RouteComponent() {
  const { questionnaireId, versionId } = Route.useParams();
  const { data: articulation } = useSuspenseQuery(
    articulationFromVersionQueryOptions(questionnaireId, versionId),
  );

  return (
    <CustomLayout>
      <ArticulationOverview
        questionnaireId={questionnaireId}
        articulationItems={articulation.items}
        readonly
      />
    </CustomLayout>
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

  return <ErrorComponent ContentLayout={CustomLayout} error={errorMessage} />;
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId, versionId } = Route.useParams();

  return (
    <ArticulationOverviewVersionLayout
      questionnaireId={questionnaireId}
      versionId={versionId}
    >
      {children}
    </ArticulationOverviewVersionLayout>
  );
}
