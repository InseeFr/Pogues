import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import CreateVariable from '@/components/variables/create/CreateVariable';

/**
 * Page that allow to create a new code list.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/variables/new',
)({
  component: RouteComponent,
  loader: ({ context: { t } }) => ({ crumb: t('crumb.new') }),
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <>
      <ContentHeader title={t('variable.create.title')} />
      <ContentMain>
        <CreateVariable />
      </ContentMain>
    </>
  );
}
