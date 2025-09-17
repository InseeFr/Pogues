import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "multimode" title and use default content style. */
export default function MultimodeOverviewLayout({ children }: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('multimode.title')}>{children}</ContentWrapper>
  );
}
