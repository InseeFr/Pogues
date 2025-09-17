import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
  questionnaireId: string;
  versionId: string;
};

/** Display "codes lists" title, readonly banner and use default content style. */
export default function CodesListOverviewVersionLayout({
  children,
  questionnaireId,
  versionId,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper
      isReadonly
      questionnaireId={questionnaireId}
      title={t('codesLists.title')}
      versionId={versionId}
    >
      {children}
    </ContentWrapper>
  );
}
