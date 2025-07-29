import { createFileRoute, redirect } from '@tanstack/react-router';

const logoutEnabled = import.meta.env.VITE_ENABLE_LOGOUT === 'true';
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (logoutEnabled) {
      return redirect({ to: '/login' });
    }
    throw redirect({ to: '/questionnaires' });
  },
});
