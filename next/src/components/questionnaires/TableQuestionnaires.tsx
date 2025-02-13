import type { Questionnaire } from '@/models/questionnaires';

import { useTranslation } from '../../i18n';
import QuestionnaireLine from './QuestionnaireLine';

interface TableQuestionnaireProps {
  questionnaires: Questionnaire[];
}

/** Display questionnaires in a table format. */
export default function TableQuestionnaires({
  questionnaires,
}: Readonly<TableQuestionnaireProps>) {
  const { t } = useTranslation('questionnairesMessage');
  return (
    <table className="table-auto border border-default w-full shadow-xl">
      <thead className="bg-accent">
        <tr className="*:font-semibold *:p-4 text-left">
          <th>{t('title')}</th>
          <th>{t('lastUpdate')}</th>
          <th className="w-0" />
        </tr>
      </thead>
      <tbody className="text-default">
        {questionnaires
          .toSorted((a, b) => {
            return b.lastUpdatedDate && a.lastUpdatedDate
              ? b.lastUpdatedDate.getTime() - a.lastUpdatedDate.getTime()
              : 0;
          })
          .map((questionnaire) => (
            <QuestionnaireLine
              questionnaire={questionnaire}
              key={questionnaire.id}
            />
          ))}
      </tbody>
    </table>
  );
}
