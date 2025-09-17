import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "edit the articulation" title and use default content style. */
export default function EditArticulationLayout({ children }: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('articulation.edit.title')}>
      {children}
    </ContentWrapper>
  );
}
