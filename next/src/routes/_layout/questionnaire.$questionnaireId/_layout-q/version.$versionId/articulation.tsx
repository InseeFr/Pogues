import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  ARTICULATION_ERROR_CODES,
  articulationFromVersionQueryOptions,
  isArticulationApiError,
} from '@/api/articulation';
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
    context: { queryClient },
    params: { questionnaireId, versionId },
  }) => {
    queryClient.ensureQueryData(
      articulationFromVersionQueryOptions(questionnaireId, versionId),
    );
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

  if (isArticulationApiError(error)) {
    switch (error.response?.data.errorCode) {
      case ARTICULATION_ERROR_CODES.FORMULA_NOT_VTL:
        errorMessage = t('articulation.overview.error.formulaNotVtl');
        break;
      case ARTICULATION_ERROR_CODES.ROUNDABOUT_NOT_FOUND:
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
        title={t('codesLists.title')}
        versionId={versionId}
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
