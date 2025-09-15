import { createFileRoute, useNavigate } from '@tanstack/react-router';

import ContentMain from '@/components/layout/ContentMain';
import Login from '@/components/login/Login';
import { useOidc } from '@/contexts/oidc';

export const Route = createFileRoute('/_layout/login')({
  component: RouteComponent,
  loader: ({ context: { t, user } }) => ({
    crumb: t('common.login'),
    userStamp: user!.stamp!,
  }),
});

function RouteComponent() {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useOidc();

  if (isUserLoggedIn) {
    navigate({ to: '/questionnaires' });
  }

  return (
    <ContentMain>
      <Login />
    </ContentMain>
  );
}
