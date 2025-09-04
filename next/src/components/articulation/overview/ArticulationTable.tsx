import { useTranslation } from 'react-i18next';

import {
  ARTICULATION_ITEMS_TRANSLATIONS,
  ArticulationItems,
} from '@/models/articulation';

interface ArticulationTableProps {
  articulationItems: ArticulationItems;
}

export function ArticulationTable({
  articulationItems,
}: Readonly<ArticulationTableProps>) {
  const { t } = useTranslation();

  return (
    <table className="border border-default w-full shadow-sm">
      <thead className="bg-accent">
        <tr className="*:font-semibold *:p-4 text-left">
          {articulationItems.map((item) => (
            <th key={item.label} className="w-1/3">
              {t(ARTICULATION_ITEMS_TRANSLATIONS[item.label])}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-default">
        <tr className="bg-default odd:bg-main *:p-4">
          {articulationItems.map((item) => (
            <td
              key={item.label}
              className="border px-3 py-2 font-mono text-gray-800 bg-gray-50"
            >
              <code className="whitespace-pre text-primary">{item.value}</code>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
