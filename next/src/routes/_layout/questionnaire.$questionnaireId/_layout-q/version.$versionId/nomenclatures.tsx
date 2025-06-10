import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { nomenclaturesFromVersionQueryOptions } from '@/api/nomenclatures';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import NomenclaturesOverview from '@/components/nomenclatures/NomenclatureOverview';
import { Nomenclature } from '@/models/nomenclature';

/**
 * Main nomenclatures page where we display the various nomenclatures used by
 * our version of a questionnaire for information.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/nomenclatures',
)({
  component: RouteComponent,
  loader: async ({
    context: { queryClient },
    params: { questionnaireId, versionId },
  }) => {
    queryClient.ensureQueryData(
      nomenclaturesFromVersionQueryOptions(questionnaireId, versionId),
    );
    return { crumb: 'Nomenclatures' };
  },
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
});

function RouteComponent() {
  const { questionnaireId, versionId } = Route.useParams();
  const { data }: { data: Nomenclature[] } = useSuspenseQuery(
    nomenclaturesFromVersionQueryOptions(questionnaireId, versionId),
  );

  return (
    <ComponentWrapper nomenclaturesCount={data.length}>
      <NomenclaturesOverview
        questionnaireId={questionnaireId}
        nomenclatures={data}
      />
    </ComponentWrapper>
  );
}

function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  return (
    <ComponentWrapper>
      <div className="text-error">{error.message}</div>
    </ComponentWrapper>
  );
}

function ComponentWrapper({
  children,
  nomenclaturesCount,
}: Readonly<{ children: React.ReactNode; nomenclaturesCount?: number }>) {
  const { t } = useTranslation();
  const nomenclaturesAffix = nomenclaturesCount
    ? `: ${nomenclaturesCount}`
    : '';
  return (
    <>
      <ContentHeader
        isReadonly
        title={`${t('nomenclatures.title')} ${nomenclaturesAffix}`}
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
