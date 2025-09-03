import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  ARTICULATION_ERROR_CODES,
  articulationQueryOptions,
  isArticulationApiError,
} from '@/api/articulation';
import { ArticulationOverview } from '@/components/articulation/overview/ArticulationOverview';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';

/**
 * Main articulation page where we display the articulation items of our
 * questionnaire and allow to create or edit it.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/articulation/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(articulationQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: articulation } = useSuspenseQuery(
    articulationQueryOptions(questionnaireId),
  );

  return (
    <ComponentWrapper>
      <ArticulationOverview
        questionnaireId={questionnaireId}
        articulationItems={articulation.items}
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

  return (
    <>
      <ContentHeader title={t('articulation.overview.title')} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
