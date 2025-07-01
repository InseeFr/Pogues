import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import ContentHeader from '@/components/layout/ContentHeader';
import { LegacyComponent } from '@/components/legacy';

/**
 * Main questionnaire page where we display the various questions and allow to
 * edit them and create new ones.
 */
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/version/$versionId/',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const { questionnaireId, versionId } = Route.useParams();

  return (
    <>
      <ContentHeader
        isReadonly
        questionnaireId={questionnaireId}
        title={t('questionnaire.title', { id: questionnaireId })}
        versionId={versionId}
      />
      <LegacyComponent />
    </>
  );
}
