import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "edit personalization" title and use default content style. */
export default function EditPersonalizationLayout({
  children,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('personalization.edit.title')}>
      {children}
    </ContentWrapper>
  );
}
