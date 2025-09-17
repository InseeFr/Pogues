import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { articulationFromVersionQueryOptions } from '@/api/articulation';
import { ArticulationOverview } from '@/components/articulation/overview/ArticulationOverview';
import ArticulationOverviewErrorComponent from '@/components/articulation/overview/ArticulationOverviewErrorComponent';
import ArticulationOverviewVersionLayout from '@/components/articulation/overview/ArticulationOverviewVersionLayout';

/**
 * Articulation page that provide a recap of the the articulation items used by
 * our questionnaire backup.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/articulation',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ArticulationOverviewErrorComponent error={error} />
    </CustomLayout>
  ),
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, versionId },
  }) => {
    queryClient.ensureQueryData(
      articulationFromVersionQueryOptions(questionnaireId, versionId),
    );
    return { crumb: t('crumb.articulation') };
  },
});

function RouteComponent() {
  const { questionnaireId, versionId } = Route.useParams();
  const { data: articulation } = useSuspenseQuery(
    articulationFromVersionQueryOptions(questionnaireId, versionId),
  );

  return (
    <CustomLayout>
      <ArticulationOverview
        questionnaireId={questionnaireId}
        articulationItems={articulation.items}
        readonly
      />
    </CustomLayout>
  );
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId, versionId } = Route.useParams();

  return (
    <ArticulationOverviewVersionLayout
      questionnaireId={questionnaireId}
      versionId={versionId}
    >
      {children}
    </ArticulationOverviewVersionLayout>
  );
}
