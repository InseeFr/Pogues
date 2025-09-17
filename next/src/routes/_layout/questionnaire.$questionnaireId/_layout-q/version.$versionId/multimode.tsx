import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { multimodeFromVersionQueryOptions } from '@/api/multimode';
import MultimodeOverview from '@/components/multimode/MultimodeOverview';
import MultimodeOverviewErrorComponent from '@/components/multimode/MultimodeOverviewErrorComponent';
import MultimodeOverviewVersionLayout from '@/components/multimode/MultimodeOverviewVersionLayout';

/**
 * Multimode page that provide a recap of the the multimode rules used by our
 * questionnaire backup.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/multimode',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <MultimodeOverviewErrorComponent error={error} />
    </CustomLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, versionId },
  }) => {
    queryClient.ensureQueryData(
      multimodeFromVersionQueryOptions(questionnaireId, versionId),
    );
    return { crumb: t('crumb.multimode') };
  },
});

function RouteComponent() {
  const { questionnaireId, versionId } = Route.useParams();
  const { data } = useSuspenseQuery(
    multimodeFromVersionQueryOptions(questionnaireId, versionId),
  );

  return (
    <CustomLayout>
      <MultimodeOverview
        questionnaireId={questionnaireId}
        isMovedRules={data}
        readonly
      />
    </CustomLayout>
  );
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId, versionId } = Route.useParams();

  return (
    <MultimodeOverviewVersionLayout
      questionnaireId={questionnaireId}
      versionId={versionId}
    >
      {children}
    </MultimodeOverviewVersionLayout>
  );
}
