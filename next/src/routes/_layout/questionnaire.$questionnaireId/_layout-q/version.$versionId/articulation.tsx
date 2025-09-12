import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { articulationFromVersionQueryOptions } from '@/api/articulation';
import { ErrorCodes, isPoguesAPIError } from '@/api/error';
import { ArticulationOverview } from '@/components/articulation/overview/ArticulationOverview';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';

/**
 * Main articulation page where we display the articulation items related to our
 * version of a questionnaire for information.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/articulation',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
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
    <ComponentWrapper>
      <ArticulationOverview
        questionnaireId={questionnaireId}
        articulationItems={articulation.items}
        readonly
      />
    </ComponentWrapper>
  );
}

function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  const { t } = useTranslation();
  let errorMessage = error.message;

  if (isPoguesAPIError(error)) {
    switch (error.response?.data.errorCode) {
      case ErrorCodes.QuestionnaireFormulaLanguageNotVTL:
        errorMessage = t('articulation.overview.error.formulaNotVtl');
        break;
      case ErrorCodes.QuestionnaireRoundaboutNotFound:
        errorMessage = t('articulation.overview.error.roundaboutNotFound');
        break;
    }
  }

  return (
    <ComponentWrapper>
      <div className="text-error">{errorMessage}</div>
    </ComponentWrapper>
  );
}

function ComponentWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { t } = useTranslation();
  const { questionnaireId, versionId } = Route.useParams();

  return (
    <>
      <ContentHeader
        isReadonly
        questionnaireId={questionnaireId}
        title={t('articulation.overview.title')}
        versionId={versionId}
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
