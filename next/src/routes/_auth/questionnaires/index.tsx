import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/questionnaires/')({
  loader: ({ context }) => {
    // TODO get default stamp
    throw redirect({
      to: '/questionnaires/$stamp',
      params: { stamp: context.user?.stamp ?? '' },
    });
  },
});
