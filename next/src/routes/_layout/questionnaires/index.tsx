import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { z } from 'zod';

import { getQuestionnaires, getStamps } from '@/api/questionnaires';
import { getAPIToken } from '@/api/utils';
import Questionnaires from '@/components/questionnaires/Questionnaires';

const questionnairesSchema = z.object({
  stamp: z.string().optional(),
});

export const Route = createFileRoute('/_layout/questionnaires/')({
  component: RouteComponent,
  loaderDeps: ({ search: { stamp } }) => ({ stamp }),
  loader: async ({ context: { user }, deps: { stamp } }) => {
    const token = await getAPIToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const selectedStamp = stamp ?? user!.stamp ?? '';

    const questionnaires = await getQuestionnaires(selectedStamp, token);
    const stamps = await getStamps(token);

    return { questionnaires, stamps, selectedStamp };
  },
  validateSearch: questionnairesSchema,
});

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/questionnaires/');
  const { questionnaires, stamps, selectedStamp } = routeApi.useLoaderData();
  return (
    <Questionnaires
      selectedStamp={selectedStamp}
      stamps={stamps}
      questionnaires={questionnaires}
    />
  );
}
