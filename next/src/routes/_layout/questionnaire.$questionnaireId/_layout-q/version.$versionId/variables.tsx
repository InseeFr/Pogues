import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { variablesFromVersionQueryOptions } from '@/api/variables';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import VariablesOverview from '@/components/variables/overview/VariablesOverview';
import type { Variable } from '@/models/variables';

/**
 * Main variables page where we display the various variables used by
 * our version of a questionnaire for information.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/variables',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, versionId },
  }) => {
    queryClient.ensureQueryData(
      variablesFromVersionQueryOptions(questionnaireId, versionId),
    );
    return { crumb: t('crumb.variables') };
  },
});

function RouteComponent() {
  const { questionnaireId, versionId } = Route.useParams();
  const { data }: { data: Variable[] } = useSuspenseQuery(
    variablesFromVersionQueryOptions(questionnaireId, versionId),
  );

  return (
    <ComponentWrapper>
      <VariablesOverview questionnaireId={questionnaireId} variables={data} />
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
  const { questionnaireId, versionId } = Route.useParams();

  return (
    <>
      <ContentHeader
        isReadonly
        questionnaireId={questionnaireId}
        title={t('variables.title')}
        versionId={versionId}
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
