import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { codesListsQueryOptions } from '@/api/codesLists';
import CodesListOverviewLayout from '@/components/codesLists/overview/CodesListOverviewLayout';
import CodesListsOverview from '@/components/codesLists/overview/CodesListsOverview';
import ErrorComponent from '@/components/layout/ErrorComponent';

/**
 * Main code lists page where we display the various codes lists related to our
 * questionnaire and allow to edit them and create new ones.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => (
    <CustomLayout>
      <ErrorComponent error={error.message} />
    </CustomLayout>
  ),
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(codesListsQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: codesLists } = useSuspenseQuery(
    codesListsQueryOptions(questionnaireId),
  );

  return (
    <CustomLayout>
      <CodesListsOverview
        questionnaireId={questionnaireId}
        codesLists={codesLists}
      />
    </CustomLayout>
  );
}

function CustomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { questionnaireId } = Route.useParams();

  return (
    <CodesListOverviewLayout questionnaireId={questionnaireId}>
      {children}
    </CodesListOverviewLayout>
  );
}
