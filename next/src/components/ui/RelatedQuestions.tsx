import { useTranslation } from 'react-i18next';

import Popover from '@/components/ui/Popover';

interface RelatedQuestionsProps {
  relatedQuestionNames?: string[];
}

/**
 * Display how many questions the code list in used in. Hovering will display
 * the questions' names.
 *
 * It is displayed differently when there are no questions to get user attention
 * since it should be deleted.
 */
export default function RelatedQuestions({
  relatedQuestionNames = [],
}: Readonly<RelatedQuestionsProps>) {
  const { t } = useTranslation();

  if (relatedQuestionNames.length === 0) {
    return (
      <Popover description={t('common.notUsedByQuestions')}>
        <div className="min-w-28 text-error">
          {t('common.question', {
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
            {t('common.usedByQuestion', {
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
        {t('common.question', {
          count: relatedQuestionNames.length,
        })}
      </div>
    </Popover>
  );
}
