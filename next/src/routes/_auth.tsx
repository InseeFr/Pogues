import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.user?.stamp) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
