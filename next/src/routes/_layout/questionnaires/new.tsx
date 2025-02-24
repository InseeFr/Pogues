import { createFileRoute } from '@tanstack/react-router';

import CreateQuestionnaire from '@/components/questionnaires/create/CreateQuestionnaire';

export const Route = createFileRoute('/_layout/questionnaires/new')({
  component: RouteComponent,
  loader: async ({ context: { user } }) => {
    return { crumb: 'Nouveau', userStamp: user!.stamp! };
  },
});

function RouteComponent() {
  const { userStamp } = Route.useLoaderData();

  return <CreateQuestionnaire userStamp={userStamp} />;
}
