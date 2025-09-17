import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';
import ButtonLink from '@/components/ui/ButtonLink';

type Props = {
  children: React.ReactNode;
  questionnaireId: string;
};

/** Display "codes lists" title and use default content style. */
export default function CodesListOverviewLayout({
  children,
  questionnaireId,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper
      title={t('codesLists.title')}
      action={
        <ButtonLink
          to="/questionnaire/$questionnaireId/codes-lists/new"
          params={{ questionnaireId }}
        >
          {t('codesLists.create')}
        </ButtonLink>
      }
    >
      {children}
    </ContentWrapper>
  );
}
