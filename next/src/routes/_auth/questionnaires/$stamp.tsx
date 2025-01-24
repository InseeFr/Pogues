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
    return { questionnaires, stamps, selectedStamp: stamp };
  },
  component: () => {
    const routeApi = getRouteApi('/_auth/questionnaires/$stamp');
    const { questionnaires, stamps, selectedStamp } = routeApi.useLoaderData();
    return (
      <Questionnaires
        selectedStamp={selectedStamp}
        stamps={stamps}
        questionnaires={questionnaires}
      />
    );
  },
});
