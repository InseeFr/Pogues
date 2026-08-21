import { useTranslation } from 'react-i18next'

import ContentWrapper from '@/components/layout/ContentWrapper'

type Props = {
  children: React.ReactNode
  isReadonly?: boolean
  questionnaireId?: string
  versionId?: string
}

/** Display questionnaire details. */
export default function DetailsOverviewLayout({
  children,
  isReadonly = false,
  questionnaireId,
  versionId,
}: Readonly<Props>) {
  const { t } = useTranslation()

  return (
    <ContentWrapper
      isReadonly={isReadonly}
      questionnaireId={questionnaireId}
      title={t('details.title')}
      versionId={versionId}
    >
      {children}
    </ContentWrapper>
  )
}
