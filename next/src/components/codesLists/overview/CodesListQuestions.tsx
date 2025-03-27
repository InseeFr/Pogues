import { useTranslation } from 'react-i18next';

import Tooltip from '@/components/ui/Tooltip';

interface CodesListQuestionsProps {
  relatedQuestionNames?: string[];
}

/**
 * Display how many questions the code list in used in. Hovering will display
 * the questions' names.
 *
 * It is displayed differently when there are no questions to get user attention
 * since it should be deleted.
 */
export default function CodesListQuestions({
  relatedQuestionNames = [],
}: Readonly<CodesListQuestionsProps>) {
  const { t } = useTranslation();

  if (relatedQuestionNames.length === 0) {
    return (
      <Tooltip title={t('codesList.overview.notUsedByQuestions')}>
        <div className="text-error">
          {t('codesList.overview.question', {
            count: 0,
          })}
        </div>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      title={
        <div>
          <div>
            {t('codesList.overview.usedByQuestion', {
              count: relatedQuestionNames.length,
            })}
          </div>
          <ul className="list-inside list-disc">
            {relatedQuestionNames.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      }
    >
      {t('codesList.overview.question', {
        count: relatedQuestionNames.length,
      })}
    </Tooltip>
  );
}
