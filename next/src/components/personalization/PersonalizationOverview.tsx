import { useTranslation } from 'react-i18next';

import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

import ButtonLink, { ButtonStyle } from '../ui/ButtonLink';

interface PersonalizationsProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
}

export default function PersonalizationsOverview({
  questionnaireId,
  data,
}: Readonly<PersonalizationsProps>) {
  const { t } = useTranslation();

  return data.surveyUnitData ? (
    <div>TODO</div>
  ) : (
    <div>
      <ButtonLink
        to="/questionnaire/$questionnaireId/personalize/new"
        params={{ questionnaireId }}
        buttonStyle={ButtonStyle.Primary}
      >
        {t('personalization.overview.create')}
      </ButtonLink>
    </div>
  );
}
