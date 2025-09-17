import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "create personalization" title and use default content style. */
export default function CreatePersonalizationLayout({
  children,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('personalization.create.title')}>
      {children}
    </ContentWrapper>
  );
}
