import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { multimodeQueryOptions } from '@/api/multimode';
import {
  roundaboutVariablesQueryOptions,
  variablesQueryOptions,
} from '@/api/variables';
import ErrorComponent from '@/components/layout/ErrorComponent';
import EditMultimode from '@/components/multimode/edit/EditMultimode';
import EditMultimodeLayout from '@/components/multimode/edit/EditMultimodeLayout';
import { MultimodeIsMovedRules } from '@/models/multimode';
import { Variable } from '@/models/variables';

/** Allow to set multimode rules for the questionnaire. */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/multimode/edit',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <EditMultimodeLayout>
      <ErrorComponent error={error.message} />
    </EditMultimodeLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId },
  }) => {
    await Promise.all([
      queryClient.ensureQueryData(multimodeQueryOptions(questionnaireId)),
      queryClient.ensureQueryData(
        roundaboutVariablesQueryOptions(questionnaireId),
      ),
      queryClient.ensureQueryData(variablesQueryOptions(questionnaireId)),
    ]);
    return { crumb: t('crumb.edit') };
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: isMovedRules }: { data: MultimodeIsMovedRules } =
    useSuspenseQuery(multimodeQueryOptions(questionnaireId));
  const { data: roundaboutVariables }: { data: Variable[] } = useSuspenseQuery(
    roundaboutVariablesQueryOptions(questionnaireId),
  );
  const { data: variables }: { data: Variable[] } = useSuspenseQuery(
    variablesQueryOptions(questionnaireId),
  );

  return (
    <EditMultimodeLayout>
      <EditMultimode
        questionnaireId={questionnaireId}
        isMovedRules={isMovedRules}
        roundaboutVariables={roundaboutVariables}
        variables={variables}
      />
    </EditMultimodeLayout>
  );
}
