import { useTranslation } from 'react-i18next';

export function ArticulationOverviewContent() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-[1fr_auto]">
      <h3>{t('articulation.overview.variableTable')}</h3>
    </div>
  );
}
