import { useTranslation } from 'react-i18next';

import type { Variable } from '@/models/variables';

import VariablesTable from './VariablesTable';

interface Props {
  variables: Variable[];
}

export default function VariablesScopeOverviewItemDetails({
  variables = [],
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <div className="py-3">
      {variables.length > 0 ? (
        <VariablesTable variables={variables} />
      ) : (
        <div>
          <p>{t('variables.none')}</p>
        </div>
      )}
    </div>
  );
}
