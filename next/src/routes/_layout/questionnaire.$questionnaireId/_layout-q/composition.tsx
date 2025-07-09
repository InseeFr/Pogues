import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import ContentHeader from '@/components/layout/ContentHeader';
import { LegacyComponent } from '@/components/legacy';

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/composition',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <>
      <ContentHeader title={t('questionnaire.title')} />
      <LegacyComponent />
    </>
  );
}
