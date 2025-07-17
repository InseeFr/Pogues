import { useTranslation } from 'react-i18next';

import type { Variable } from '@/models/variables';

interface Props {
  scope: string;
  variables: Variable[];
}

export default function VariablesScopeOverviewItemContent({
  scope,
  variables = [],
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-[1fr_auto]">
      <h3>{t('variables.scope', { scope })}</h3>
      <div className="m-auto px-3">
        {t('variables.variable', { count: variables.length })}
      </div>
    </div>
  );
}
