import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { z } from 'zod';

import { questionnairesQueryOptions } from '@/api/questionnaires';
import { stampsQueryOptions } from '@/api/stamps';
import { getAPIToken } from '@/api/utils';
import Questionnaires from '@/components/questionnaires/Questionnaires';

const questionnairesSchema = z.object({
  stamp: z.string().optional(),
});

export const Route = createFileRoute('/_layout/questionnaires/')({
  component: RouteComponent,
  loaderDeps: ({ search: { stamp } }) => ({ stamp }),
  loader: async ({ context: { queryClient, user }, deps: { stamp } }) => {
    const token = await getAPIToken();
    const selectedStamp = stamp ?? user!.stamp ?? '';

    const questionnaires = await queryClient.ensureQueryData(
      questionnairesQueryOptions(selectedStamp, token),
    );
    const stamps = await queryClient.ensureQueryData(stampsQueryOptions(token));

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
