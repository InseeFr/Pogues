import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { codesListsFromVersionQueryOptions } from '@/api/codesLists';
import CodesListsOverview from '@/components/codesLists/overview/CodesListsOverview';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';

/**
 * Main code lists page where we display the various codes lists related to our
 * version of a questionnaire for information.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/codes-lists',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId, versionId },
  }) => {
    queryClient.ensureQueryData(
      codesListsFromVersionQueryOptions(questionnaireId, versionId),
    );
    return { crumb: t('codesList.title') };
  },
});

function RouteComponent() {
  const { questionnaireId, versionId } = Route.useParams();
  const { data: codesLists } = useSuspenseQuery(
    codesListsFromVersionQueryOptions(questionnaireId, versionId),
  );

  return (
    <ComponentWrapper codesListsCount={codesLists.length}>
      <CodesListsOverview
        questionnaireId={questionnaireId}
        codesLists={codesLists}
        readonly
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
  codesListsCount,
}: Readonly<{
  children: React.ReactNode;
  codesListsCount?: number;
}>) {
  const { t } = useTranslation();
  const { questionnaireId, versionId } = Route.useParams();

  const codesListsAffix = codesListsCount ? `: ${codesListsCount}` : '';

  return (
    <>
      <ContentHeader
        isReadonly
        questionnaireId={questionnaireId}
        title={`${t('codesList.title')} ${codesListsAffix}`}
        versionId={versionId}
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
