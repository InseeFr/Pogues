import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { nomenclaturesQueryOptions } from '@/api/nomenclatures';
import NomenclaturesOverview from '@/components/nomenclatures/NomenclatureOverview';
import { Nomenclature } from '@/models/nomenclature';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/nomenclatures/',
)({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(nomenclaturesQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data }: { data: Nomenclature[] } = useSuspenseQuery(
    nomenclaturesQueryOptions(questionnaireId),
  );

  return (
    <NomenclaturesOverview
      questionnaireId={questionnaireId}
      nomenclatures={data}
    />
  );
}
