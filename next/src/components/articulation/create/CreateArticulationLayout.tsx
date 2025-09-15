import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "new articulation" title and use default content style. */
export default function CreateArticulationLayout({
  children,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('articulation.create.title')}>
      {children}
    </ContentWrapper>
  );
}
