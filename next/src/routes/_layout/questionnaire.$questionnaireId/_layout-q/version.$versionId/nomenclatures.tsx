import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { nomenclaturesFromVersionQueryOptions } from '@/api/nomenclatures';
import ErrorComponent from '@/components/layout/ErrorComponent';
import NomenclaturesOverview from '@/components/nomenclatures/NomenclatureOverview';
import NomenclatureOverviewVersionLayout from '@/components/nomenclatures/NomenclatureOverviewVersionLayout';
import { type Nomenclature } from '@/models/nomenclature';

/**
 * Nomenclatures page that provide a recap of the the various nomenclatures used
 * by our questionnaire backup.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/nomenclatures',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ErrorComponent error={error.message} />
    </CustomLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, versionId },
  }) => {
    queryClient.ensureQueryData(
      nomenclaturesFromVersionQueryOptions(questionnaireId, versionId),
    );
    return { crumb: t('crumb.nomenclatures') };
  },
});

function RouteComponent() {
  const { questionnaireId, versionId } = Route.useParams();
  const { data }: { data: Nomenclature[] } = useSuspenseQuery(
    nomenclaturesFromVersionQueryOptions(questionnaireId, versionId),
  );

  return (
    <CustomLayout>
      <NomenclaturesOverview nomenclatures={data} />
    </CustomLayout>
  );
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId, versionId } = Route.useParams();

  return (
    <NomenclatureOverviewVersionLayout
      questionnaireId={questionnaireId}
      versionId={versionId}
    >
      {children}
    </NomenclatureOverviewVersionLayout>
  );
}
