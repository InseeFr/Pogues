import { useTranslation } from 'react-i18next';

import type { CodesList } from '@/models/codesLists';

import CodeLine from './CodeLine';

interface CodesTableProps {
  codesList: CodesList;
}

/** Display codes of a codes list as a table. */
export default function CodesTable({ codesList }: Readonly<CodesTableProps>) {
  const { t } = useTranslation();

  return (
    <table className="border border-default w-full shadow-sm">
      <thead className="bg-accent">
        <tr className="*:font-semibold *:p-4 text-left">
          <th className="w-1/4">{t('codesList.common.codeValue')}</th>
          <th className="w-3/4">{t('codesList.common.codeLabel')}</th>
        </tr>
      </thead>
      <tbody className="text-default">
        {codesList.codes.map((code) => (
          <CodeLine key={code.value} code={code} />
        ))}
      </tbody>
    </table>
  );
}
