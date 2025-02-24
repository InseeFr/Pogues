import { useTranslation } from 'react-i18next';

import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';

import CreateQuestionnaireForm from './CreateQuestionnaireForm';

interface CreateQuestionnaireProps {
  /** Stamp of the user who creates a questionnaire. */
  userStamp: string;
}

/**
 * Create a new questionnaire.
 *
 * A questionnaire must have a title, target modes, a flow logic and a language
 * formula.
 *
 * The latter two have default values whose use should be encouraged.
 *
 * {@link Questionnaire}
 */
export default function CreateQuestionnaire({
  userStamp,
}: Readonly<CreateQuestionnaireProps>) {
  const { t } = useTranslation();

  return (
    <div>
      <ContentHeader title={t('questionnaire.create.title')} />
      <ContentMain>
        <div className="bg-default p-4 border border-default shadow-xl">
          <CreateQuestionnaireForm stamp={userStamp} />
        </div>
      </ContentMain>
    </div>
  );
}
