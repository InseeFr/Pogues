import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';
import { CodesList } from '@/models/codesLists';

type Props = {
  children: React.ReactNode;
  codesList?: CodesList;
};

/** Display "edit code list" title and use default content style. */
export default function EditCodesListLayout({
  children,
  codesList,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper
      title={t('codesList.edit.title', { label: codesList?.label })}
    >
      {children}
    </ContentWrapper>
  );
}
