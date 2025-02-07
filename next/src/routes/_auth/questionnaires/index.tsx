import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { z } from 'zod';

import { getQuestionnaires, getStamps } from '@/api/questionnaires';
import { getAccessToken } from '@/api/utils';
import Questionnaires from '@/components/questionnaires/Questionnaires';

const questionnairesSchema = z.object({
  stamp: z.string().optional(),
});

export const Route = createFileRoute('/_auth/questionnaires/')({
  validateSearch: questionnairesSchema,
  loaderDeps: ({ search: { stamp } }) => ({ stamp }),
  loader: async ({ context: { user }, deps: { stamp } }) => {
    const token = await getAccessToken();
    if (!token) {
      // 401 error
    }
    const selectedStamp = (stamp ?? user!.stamp) || '';

    /*return queryClient.ensureQueryData({
      queryKey: ['questionnaires', { stamp }],
      queryFn: () => getQuestionnaires(stamp, token),
    });*/
    const questionnaires = await getQuestionnaires(selectedStamp, token);
    const stamps = await getStamps(token);
    return { questionnaires, stamps, selectedStamp };
  },
  component: QuestionnairesWrapper,
});

function QuestionnairesWrapper() {
  const routeApi = getRouteApi('/_auth/questionnaires/');
  const { questionnaires, stamps, selectedStamp } = routeApi.useLoaderData();
  return (
    <Questionnaires
      selectedStamp={selectedStamp}
      stamps={stamps}
      questionnaires={questionnaires}
    />
  );
}
