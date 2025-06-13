import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import CreateQuestionnaire from '@/components/questionnaires/create/CreateQuestionnaire';

export const Route = createFileRoute('/_layout/questionnaires/new')({
  component: RouteComponent,
  loader: ({ context: { t, user } }) => ({
    crumb: t('common.new'),
    userStamp: user!.stamp!,
  }),
});

function RouteComponent() {
  const { t } = useTranslation();
  const { userStamp } = Route.useLoaderData();
  return (
    <>
      <ContentHeader title={t('questionnaire.create.title')} />
      <ContentMain>
        <CreateQuestionnaire userStamp={userStamp} />;
      </ContentMain>
    </>
  );
}
