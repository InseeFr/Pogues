import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import Login from '@/components/login/Login';

export const Route = createFileRoute('/_layout/login')({
  component: RouteComponent,
  loader: ({ context: { t, user } }) => ({
    crumb: t('common.login'),
    userStamp: user!.stamp!,
  }),
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <>
      <ContentHeader title={t('common.login')} />
      <ContentMain>
        <Login />
      </ContentMain>
    </>
  );
}
