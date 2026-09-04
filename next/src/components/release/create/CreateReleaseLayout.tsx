import { useTranslation } from 'react-i18next'

import ContentWrapper from '@/components/layout/ContentWrapper'

type Props = {
  children: React.ReactNode
}

export default function CreateReleaseLayout({ children }: Readonly<Props>) {
  const { t } = useTranslation()

  return (
    <ContentWrapper title={t('release.create.title')}>
      {children}
    </ContentWrapper>
  )
}
