import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
  children: React.ReactNode;
};

/** Display "new code list" title and use default content style. */
export default function CreateCodesListLayout({ children }: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('codesList.create.title')}>
      {children}
    </ContentWrapper>
  );
}
