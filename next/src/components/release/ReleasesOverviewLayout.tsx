import { useTranslation } from 'react-i18next'

import ContentWrapper from '@/components/layout/ContentWrapper'

import ButtonLink from '../ui/ButtonLink'

type Props = {
  children: React.ReactNode
  questionnaireId?: string
}

/** Display "release" title and use default content style. */
export default function ReleaseOverviewLayout({
  children,
  questionnaireId = '',
}: Readonly<Props>) {
  const { t } = useTranslation()

  return (
    <ContentWrapper
      action={
        <ButtonLink
          to="/questionnaire/$questionnaireId/releases/new"
          params={{ questionnaireId }}
        >
          {t('release.create')}
        </ButtonLink>
      }
      title={t('release.title')}
    >
      {children}
    </ContentWrapper>
  )
}
