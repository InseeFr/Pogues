import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { questionnairesQueryOptions } from '@/api/questionnaires';
import { stampsQueryOptions } from '@/api/stamps';
import Questionnaires from '@/components/questionnaires/overview/Questionnaires';

const questionnairesSchema = z.object({
  stamp: z.string().optional(),
});

export const Route = createFileRoute('/_layout/questionnaires/')({
  component: RouteComponent,
  loaderDeps: ({ search: { stamp } }) => ({ stamp }),
  loader: async ({ context: { queryClient, user }, deps: { stamp } }) => {
    const selectedStamp = stamp ?? user!.stamp ?? '';

    queryClient.ensureQueryData(questionnairesQueryOptions(selectedStamp));
    queryClient.ensureQueryData(stampsQueryOptions());

    return { selectedStamp };
  },
  validateSearch: questionnairesSchema,
});

function RouteComponent() {
  const { selectedStamp } = Route.useLoaderData();
  const { data: questionnaires } = useSuspenseQuery(
    questionnairesQueryOptions(selectedStamp),
  );
  const { data: stamps } = useSuspenseQuery(stampsQueryOptions());

  return (
    <Questionnaires
      selectedStamp={selectedStamp}
      stamps={stamps}
      questionnaires={questionnaires}
    />
  );
}
