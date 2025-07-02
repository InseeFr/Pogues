import { useTranslation } from 'react-i18next';

import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

import ButtonLink, { ButtonStyle } from '../ui/ButtonLink';
import PersonalizationContent from './PersonalizationContent';
import { ParseResult } from 'papaparse';

interface PersonalizationsProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
  csvData: ParseResult | null;
}

export default function PersonalizationsOverview({
  questionnaireId,
  data,
  csvData
}: Readonly<PersonalizationsProps>) {
  const { t } = useTranslation();
  return data ? (
    <PersonalizationContent data={data} questionnaireId={questionnaireId} csvData={csvData} />
  ) : (
    <div>
      <ButtonLink
        to="/questionnaire/$questionnaireId/personalize/new"
        params={{ questionnaireId }}
        buttonStyle={ButtonStyle.Primary}
      >
        {t('personalization.create.title')}
      </ButtonLink>
    </div>
  );
}
