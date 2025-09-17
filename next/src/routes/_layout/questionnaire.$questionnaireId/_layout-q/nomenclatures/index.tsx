import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { nomenclaturesQueryOptions } from '@/api/nomenclatures';
import ErrorComponent from '@/components/layout/ErrorComponent';
import NomenclaturesOverview from '@/components/nomenclatures/NomenclatureOverview';
import NomenclatureOverviewLayout from '@/components/nomenclatures/NomenclatureOverviewLayout';
import { type Nomenclature } from '@/models/nomenclature';

/**
 * Main nomenclatures page where we display the various nomenclatures used by
 * our questionnaire for information.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/nomenclatures/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <NomenclatureOverviewLayout>
      <ErrorComponent error={error.message} />
    </NomenclatureOverviewLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(nomenclaturesQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data }: { data: Nomenclature[] } = useSuspenseQuery(
    nomenclaturesQueryOptions(questionnaireId),
  );

  return (
    <NomenclatureOverviewLayout>
      <NomenclaturesOverview nomenclatures={data} />
    </NomenclatureOverviewLayout>
  );
}
