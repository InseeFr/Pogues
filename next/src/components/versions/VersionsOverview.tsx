import { useTranslation } from 'react-i18next';

import { Version } from '@/models/version';

import VersionContent from './VersionContent';

interface VersionsProps {
  questionnaireId: string;
  versions: Version[];
}

/**
 * Display the versions of the selected questionnaire and allow to restore them.
 */
export default function VersionsOverview({
  questionnaireId,
  versions = [],
}: Readonly<VersionsProps>) {
  const { t } = useTranslation();

  const todayString = new Date().toISOString().split('T')[0];

  const todaysVersions = versions.filter((item) =>
    item.day.startsWith(todayString),
  );
  const olderVersions = versions.filter(
    (item) => !item.day.startsWith(todayString),
  );

  return (
    <div>
      {versions.length > 0 ? (
        <>
          <VersionContent
            versions={todaysVersions}
            questionnaireId={questionnaireId}
            label={t('history.versionToday', {
              count: todaysVersions.length,
            })}
          />
          <VersionContent
            versions={olderVersions}
            questionnaireId={questionnaireId}
            label={t('history.oldVersions', { count: olderVersions.length })}
          />
        </>
      ) : (
        <div className="text-center">
          <p>{t('history.noVersions')}</p>
        </div>
      )}
    </div>
  );
}
