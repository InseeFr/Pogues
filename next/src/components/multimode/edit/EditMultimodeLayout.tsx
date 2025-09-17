import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "specify multimode rules" title and use default content style. */
export default function EditMultimodeLayout({ children }: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('multimode.edit.title')}>
      {children}
    </ContentWrapper>
  );
}
