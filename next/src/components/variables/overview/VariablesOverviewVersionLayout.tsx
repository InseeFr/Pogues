import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
  questionnaireId: string;
  versionId: string;
};

/** Display "variables", readonly banner and use default content style. */
export default function VariablesOverviewVersionLayout({
  children,
  questionnaireId,
  versionId,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper
      isReadonly
      questionnaireId={questionnaireId}
      title={t('variables.title')}
      versionId={versionId}
    >
      {children}
    </ContentWrapper>
  );
}
