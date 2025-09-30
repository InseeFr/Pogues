import { useTranslation } from 'react-i18next';

import type { MultimodeIsMovedRules } from '@/models/multimode';

import MultimodeOverviewContent from './MultimodeOverviewContent';

interface Props {
  questionnaireId: string;
  isMovedRules?: MultimodeIsMovedRules;
  /** Whether we display the multimode as readonly (i.e. back-up version). */
  readonly?: boolean;
}

/**
 * Display the multimode of the selected questionnaire and allow to create or
 * edit it (if not set as readonly).
 *
 * Briefly explain when and how one should use multimode.
 */
export default function MultimodeOverview({
  questionnaireId,
  isMovedRules = {},
  readonly = false,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-gray-600">
        <p>{t('multimode.description')}</p>
        <p>{t('multimode.howToUse')}</p>
      </div>

      <MultimodeOverviewContent
        isMovedRules={isMovedRules}
        questionnaireId={questionnaireId}
        readonly={readonly}
      />
    </div>
  );
}
