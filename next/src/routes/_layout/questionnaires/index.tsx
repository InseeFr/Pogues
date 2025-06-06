import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { questionnairesQueryOptions } from '@/api/questionnaires';
import { stampsQueryOptions } from '@/api/stamps';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import Questionnaires from '@/components/questionnaires/overview/Questionnaires';
import ButtonLink from '@/components/ui/ButtonLink';

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
  errorComponent: ErrorComponent,
});

function RouteComponent() {
  const { selectedStamp } = Route.useLoaderData();
  const { data: questionnaires } = useSuspenseQuery(
    questionnairesQueryOptions(selectedStamp),
  );
  const { data: stamps } = useSuspenseQuery(stampsQueryOptions());

  return (
    <ComponentWrapper>
      <Questionnaires
        selectedStamp={selectedStamp}
        stamps={stamps}
        questionnaires={questionnaires}
      />
    </ComponentWrapper>
  );
}

function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  return (
    <ComponentWrapper>
      <div className="text-error">{error.message}</div>
    </ComponentWrapper>
  );
}

function ComponentWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { t } = useTranslation();
  return (
    <>
      <ContentHeader
        title={t('questionnaires.title')}
        action={
          <ButtonLink to="/questionnaires/new">
            {t('questionnaires.create')}
          </ButtonLink>
        }
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
