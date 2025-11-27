import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';
import type { Variable } from '@/models/variables';

type Props = {
  children: React.ReactNode;
  /** Variable to edit. */
  variable?: Variable;
};

/** Display "edit variable" title and use default content style. */
export default function EditVariableLayout({
  children,
  variable,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <ContentWrapper title={t('variable.edit.title', { name: variable?.name })}>
      {children}
    </ContentWrapper>
  );
}
