import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "articulations" title and use default content style. */
export default function ArticulationOverviewLayout({
  children,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('articulation.overview.title')}>
      {children}
    </ContentWrapper>
  );
}
