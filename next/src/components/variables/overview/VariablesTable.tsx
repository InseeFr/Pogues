import { useTranslation } from 'react-i18next';

import type { Variable } from '@/models/variables';

import VariableLine from './VariableLine';

interface Props {
  variables: Variable[];
}

/** Display variables as a table. */
export default function VariablesTable({ variables }: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <table className="border border-default w-full shadow-sm">
      <thead className="bg-accent">
        <tr className="*:font-semibold *:p-4 text-left">
          <th className="w-1/6">{t('variable.name')}</th>
          <th className="w-3/6">{t('variable.description')}</th>
          <th className="w-1/6">{t('variable.datatype.label')}</th>
          <th className="w-1/6">{t('variable.type.label')}</th>
        </tr>
      </thead>
      <tbody className="text-default">
        {variables.map((variable) => (
          <VariableLine key={variable.id} variable={variable} />
        ))}
      </tbody>
    </table>
  );
}
