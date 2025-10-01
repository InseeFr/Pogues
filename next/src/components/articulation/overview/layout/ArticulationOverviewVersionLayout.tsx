import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
  questionnaireId: string;
  versionId: string;
};

/** Display "articulations", readonly banner and use default content style. */
export default function ArticulationOverviewVersionLayout({
  children,
  questionnaireId,
  versionId,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper
      isReadonly
      questionnaireId={questionnaireId}
      title={t('articulation.overview.title')}
      versionId={versionId}
    >
      {children}
    </ContentWrapper>
  );
}
