import { useTranslation } from 'react-i18next';

import ButtonLink from '@/components/ui/ButtonLink';
import OpenInNewIcon from '@/components/ui/icons/OpenInNewIcon';
import type { Version } from '@/models/version';
import {
  computeDateFromNow,
  computeDayFromDate,
  computeFullDateFromDate,
  computeTimeFromDate,
} from '@/utils/date';

const trombiUrl = import.meta.env.VITE_TROMBI_URL;

interface VersionsTileProps {
  questionnaireId: string;
  versions: Version[];
}

/** Display versions as a table. */
export default function VersionTile({
  questionnaireId,
  versions,
}: Readonly<VersionsTileProps>) {
  const { t } = useTranslation();

  return (
    <table className="border border-default w-full shadow-sm">
      <thead className="bg-accent">
        <tr className="*:font-semibold *:p-4 text-left">
          <th>{t('version.id')}</th>
          <th>{t('common.lastUpdated')}</th>
          <th>{t('common.date')}</th>
          <th>{t('version.author')}</th>
          <th />
        </tr>
      </thead>
      <tbody className="text-default">
        {versions.map((version) => (
          <tr key={version.id} className="bg-default odd:bg-main *:p-4">
            <td>{version.id}</td>
            <td>
              <div className="first-letter:capitalize">
                {computeDateFromNow(version.timestamp)}
              </div>
            </td>
            <td>
              <div title={computeFullDateFromDate(version.timestamp)}>
                {computeDayFromDate(version.timestamp)}{' '}
                {computeTimeFromDate(version.timestamp)}
              </div>
            </td>
            <td>
              <a
                href={`${trombiUrl}/${version.author}`}
                target="_blank"
                className="text-action-primary fill-action-primary inline-flex items-center space-x-1"
              >
                <span className="hover:underline">{version.author}</span>
                <div>
                  <OpenInNewIcon height="16" width="16" />
                </div>
              </a>
            </td>
            <td>
              <ButtonLink
                to="/questionnaire/$questionnaireId/version/$versionId"
                params={{ questionnaireId, versionId: version.id }}
              >
                {t('version.view')}
              </ButtonLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
