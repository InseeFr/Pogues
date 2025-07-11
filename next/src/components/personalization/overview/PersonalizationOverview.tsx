import { ParseResult } from 'papaparse';
import { useTranslation } from 'react-i18next';

import {
  PersonalizationQuestionnaire,
  SurveyUnitModeData,
} from '@/models/personalizationQuestionnaire';

import ButtonLink, { ButtonStyle } from '../../ui/ButtonLink';
import PersonalizationContent from './PersonalizationContent';

interface PersonalizationsProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
  csvData: ParseResult | null;
  surveyUnitData: SurveyUnitModeData[] | null;
}

export default function PersonalizationsOverview({
  questionnaireId,
  data,
  csvData,
  surveyUnitData,
}: Readonly<PersonalizationsProps>) {
  const { t } = useTranslation();
  return data ? (
    <PersonalizationContent
      data={data}
      questionnaireId={questionnaireId}
      csvData={csvData}
      surveyUnitData={surveyUnitData}
    />
  ) : (
    <div>
      <ButtonLink
        to="/questionnaire/$questionnaireId/personalization/new"
        params={{ questionnaireId }}
        buttonStyle={ButtonStyle.Primary}
      >
        {t('personalization.create.title')}
      </ButtonLink>
    </div>
  );
}
