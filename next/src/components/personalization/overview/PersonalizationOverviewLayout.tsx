import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "personalization" title and use default content style. */
export default function PersonalizationOverviewLayout({
  children,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('personalization.title')}>
      {children}
    </ContentWrapper>
  );
}
