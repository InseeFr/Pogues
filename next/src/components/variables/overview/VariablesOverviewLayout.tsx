import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';
import ButtonLink from '@/components/ui/ButtonLink';

type Props = {
  children: React.ReactNode;
  questionnaireId?: string;
};

/** Display "variables" title and use default content style. */
export default function VariablesOverviewLayout({
  children,
  questionnaireId = '',
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper
      action={
        <ButtonLink
          to="/questionnaire/$questionnaireId/variables/new"
          params={{ questionnaireId }}
        >
          {t('variables.create')}
        </ButtonLink>
      }
      title={t('variables.title')}
    >
      {children}
    </ContentWrapper>
  );
}
