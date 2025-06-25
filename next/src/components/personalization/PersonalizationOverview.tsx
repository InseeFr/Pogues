import { useTranslation } from 'react-i18next';

interface PersonalizationsProps {
  questionnaireId: string;
}

export default function PersonalizationsOverview({
  questionnaireId,
}: Readonly<PersonalizationsProps>) {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t('personalization.title')}</p>
      <p>{questionnaireId}</p>
    </div>
  );
}
