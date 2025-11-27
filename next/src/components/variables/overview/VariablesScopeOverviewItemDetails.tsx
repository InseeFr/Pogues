import { useTranslation } from 'react-i18next';

import type { Variable } from '@/models/variables';

import VariablesTable from './VariablesTable';

interface Props {
  questionnaireId: string;
  readonly?: boolean;
  variables: Variable[];
}

/**
 * Used as content of variables scope overview. Display the variables related to
 * the scope.
 */
export default function VariablesScopeOverviewItemDetails({
  questionnaireId,
  readonly = false,
  variables = [],
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <div className="py-3">
      {variables.length > 0 ? (
        <VariablesTable
          questionnaireId={questionnaireId}
          readonly={readonly}
          variables={variables}
        />
      ) : (
        <div>
          <p>{t('variables.none')}</p>
        </div>
      )}
    </div>
  );
}
