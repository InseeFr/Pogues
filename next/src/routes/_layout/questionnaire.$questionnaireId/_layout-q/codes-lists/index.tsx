import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { codesListsQueryOptions } from '@/api/codesLists';
import CodesListsOverview from '@/components/codesLists/overview/CodesListsOverview';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import ButtonLink from '@/components/ui/ButtonLink';

/**
 * Main code lists page where we display the various codes lists related to our
 * questionnaire and allow to edit them and create new ones.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/codes-lists/',
)({
  component: RouteComponent,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  loader: async ({ context: { queryClient }, params: { questionnaireId } }) =>
    queryClient.ensureQueryData(codesListsQueryOptions(questionnaireId)),
});

function RouteComponent() {
  const questionnaireId = Route.useParams().questionnaireId;
  const { data: codesLists } = useSuspenseQuery(
    codesListsQueryOptions(questionnaireId),
  );

  return (
    <ComponentWrapper>
      <CodesListsOverview
        questionnaireId={questionnaireId}
        codesLists={codesLists}
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
  const questionnaireId = Route.useParams().questionnaireId;

  return (
    <>
      <ContentHeader
        title={t('questionnaire.navigation.codesLists')}
        action={
          <ButtonLink
            to="/questionnaire/$questionnaireId/codes-lists/new"
            params={{ questionnaireId }}
          >
            {t('codesLists.create')}
          </ButtonLink>
        }
      />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
