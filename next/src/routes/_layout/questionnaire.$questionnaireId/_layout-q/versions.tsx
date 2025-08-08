import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { versionsQueryOptions } from '@/api/versions';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import VersionsOverview from '@/components/versions/VersionsOverview';
import { Version } from '@/models/version';

/**
 * Versions page where we display the previous questionnaire save and allow to
 * access them in readonly.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/versions',
)({
  component: RouteComponent,
  loader: async ({
    context: { queryClient, t },
    params: { questionnaireId },
  }) => {
    queryClient.ensureQueryData(versionsQueryOptions(questionnaireId));
    return { crumb: t('crumb.history') };
  },
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data }: { data: Version[] } = useSuspenseQuery(
    versionsQueryOptions(questionnaireId),
  );

  return (
    <ComponentWrapper>
      <VersionsOverview questionnaireId={questionnaireId} versions={data} />
    </ComponentWrapper>
  );
}

function ComponentWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
  return (
    <>
      <ContentHeader title={`${t('history.title')}`} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
