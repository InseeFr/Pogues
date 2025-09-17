import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "new variable" title and use default content style. */
export default function CreateVariableLayout({ children }: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('variable.create.title')}>
      {children}
    </ContentWrapper>
  );
}
