import { useTranslation } from 'react-i18next'

import ContentWrapper from '@/components/layout/ContentWrapper'

type Props = {
  children: React.ReactNode
}

/** Display questionnaire details. */
export default function DetailsOverviewLayout({ children }: Readonly<Props>) {
  const { t } = useTranslation()

  return <ContentWrapper title={t('details.title')}>{children}</ContentWrapper>
}
