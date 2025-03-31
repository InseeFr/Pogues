import { useTranslation } from 'react-i18next';

import Popover from '@/components/ui/Popover';

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
      <Popover description={t('codesList.overview.notUsedByQuestions')}>
        <div className="min-w-28 text-error">
          {t('codesList.overview.question', {
            count: 0,
          })}
        </div>
      </Popover>
    );
  }

  return (
    <Popover
      description={
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
      <div className="min-w-28">
        {t('codesList.overview.question', {
          count: relatedQuestionNames.length,
        })}
      </div>
    </Popover>
  );
}
