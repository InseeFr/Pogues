import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { multimodeQueryOptions } from '@/api/multimode';
import {
  roundaboutVariablesQueryOptions,
  variablesQueryOptions,
} from '@/api/variables';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import EditMultimode from '@/components/multimode/edit/EditMultimode';
import { MultimodeIsMovedRules } from '@/models/multimode';
import { Variable } from '@/models/variables';

/** Allow to set multimode rules for the questionnaire. */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/multimode/edit',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
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
    <ComponentWrapper>
      <EditMultimode
        questionnaireId={questionnaireId}
        isMovedRules={isMovedRules}
        roundaboutVariables={roundaboutVariables}
        variables={variables}
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
}: Readonly<{ children: React.ReactNode }>) {
  const { t } = useTranslation();

  return (
    <>
      <ContentHeader title={t('multimode.edit.title')} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
