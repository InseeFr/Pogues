import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { codesListsFromVersionQueryOptions } from '@/api/codesLists';
import CodesListOverviewVersionLayout from '@/components/codesLists/overview/CodesListOverviewVersionLayout';
import CodesListsOverview from '@/components/codesLists/overview/CodesListsOverview';
import ErrorComponent from '@/components/layout/ErrorComponent';

/**
 * Codes lists page that provide a recap of the the various codes lists used by
 * our questionnaire backup.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/codes-lists',
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
      codesListsFromVersionQueryOptions(questionnaireId, versionId),
    );
    return { crumb: t('crumb.codesLists') };
  },
});

function RouteComponent() {
  const { questionnaireId, versionId } = Route.useParams();
  const { data: codesLists } = useSuspenseQuery(
    codesListsFromVersionQueryOptions(questionnaireId, versionId),
  );

  return (
    <CustomLayout>
      <CodesListsOverview
        questionnaireId={questionnaireId}
        codesLists={codesLists}
        readonly
      />
    </CustomLayout>
  );
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId, versionId } = Route.useParams();

  return (
    <CodesListOverviewVersionLayout
      questionnaireId={questionnaireId}
      versionId={versionId}
    >
      {children}
    </CodesListOverviewVersionLayout>
  );
}
