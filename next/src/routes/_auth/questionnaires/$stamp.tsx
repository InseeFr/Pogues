import { createFileRoute, getRouteApi } from '@tanstack/react-router';

import { getQuestionnaires, getStamps } from '@/api/questionnaires';
import { getAccessToken } from '@/api/utils';
import Questionnaires from '@/components/questionnaires/Questionnaires';

export const Route = createFileRoute('/_auth/questionnaires/$stamp')({
  loader: async ({ /*context: { queryClient }, */ params: { stamp } }) => {
    const token = await getAccessToken();
    if (!token) {
      // 401 error
    }

    /*return queryClient.ensureQueryData({
      queryKey: ['questionnaires', { stamp }],
      queryFn: () => getQuestionnaires(stamp, token),
    });*/
    const questionnaires = await getQuestionnaires(stamp, token);
    const stamps = await getStamps(token);
    return { questionnaires, stamps };
  },
  component: () => {
    const routeApi = getRouteApi('/_auth/questionnaires/$stamp');
    const { questionnaires, stamps } = routeApi.useLoaderData();
    return <Questionnaires stamps={stamps} questionnaires={questionnaires} />;
  },
});
