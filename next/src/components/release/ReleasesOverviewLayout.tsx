import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import ContentWrapper from '@/components/layout/ContentWrapper'
import Dialog from '@/components/ui/Dialog'

import ButtonLink from '../ui/ButtonLink'

type Props = {
  children: React.ReactNode
  questionnaireId?: string
  /** Set to true when a release already exists for the latest version, blocking publication. */
  isPublishDisabled: boolean
}

/** Display "release" title and use default content style. */
export default function ReleaseOverviewLayout({
  children,
  questionnaireId = '',
  isPublishDisabled,
}: Readonly<Props>) {
  const { t } = useTranslation()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function handlePublishClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!isPublishDisabled) {
      return
    }
    event.preventDefault()
    setIsDialogOpen(true)
  }

  return (
    <>
      <ContentWrapper
        action={
          <ButtonLink
            to="/questionnaire/$questionnaireId/releases/new"
            params={{ questionnaireId }}
            onClick={handlePublishClick}
          >
            {t('release.create')}
          </ButtonLink>
        }
        title={t('release.title')}
      >
        {children}
      </ContentWrapper>
      <Dialog
        title={t('release.create.alreadyPublishedTitle')}
        body={t('release.create.alreadyPublished')}
        controlledOpen={isDialogOpen}
        setControlledOpen={setIsDialogOpen}
        closeButtonTitle={t('common.close')}
      />
    </>
  )
}
