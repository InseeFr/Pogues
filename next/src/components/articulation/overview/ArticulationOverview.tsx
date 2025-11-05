import { useTranslation } from 'react-i18next';

import { ArticulationItems } from '@/models/articulation';

import { ArticulationOverviewContent } from './ArticulationOverviewContent';

interface ArticulationOverviewProps {
  questionnaireId: string;
  articulationItems?: ArticulationItems;
  readonly?: boolean;
}

/**
 * Display the articulation of the selected questionnaire and allow to create or
 * edit it (if not set as readonly).
 *
 * Briefly explain when and how one should use articulation.
 */
export function ArticulationOverview({
  questionnaireId,
  articulationItems,
  readonly = false,
}: Readonly<ArticulationOverviewProps>) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-gray-600 whitespace-pre-line">
        {t('articulation.overview.description')}
      </div>

      <ArticulationOverviewContent
        questionnaireId={questionnaireId}
        articulationItems={articulationItems}
        readonly={readonly}
      />
    </div>
  );
}
