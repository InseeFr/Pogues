import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "history" title and use default content style. */
export default function VersionsOverviewLayout({ children }: Readonly<Props>) {
  const { t } = useTranslation();

  return <ContentWrapper title={t('history.title')}>{children}</ContentWrapper>;
}
