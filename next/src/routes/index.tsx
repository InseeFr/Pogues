import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { loginLoader } from '@/utils/loginLoader';

export const Route = createFileRoute('/')({
  beforeLoad: () => loginLoader(),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  navigate({ to: '/questionnaires' });
  return null;
}
