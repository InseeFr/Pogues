import { useTranslation } from 'react-i18next'

import ContentWrapper from '@/components/layout/ContentWrapper'
import type { Loop } from '@/models/loops'

type Props = {
  children: React.ReactNode
  /** Loop to edit. */
  loop?: Loop
  questionnaireId?: string
  /**
   * If provided, the loop comes from this older version of the questionnaire:
   * display a readonly warning allowing to restore this version.
   */
  versionId?: string
}

export default function EditLoopLayout({
  children,
  loop,
  questionnaireId,
  versionId,
}: Readonly<Props>) {
  const { t } = useTranslation()

  return (
    <ContentWrapper
      isReadonly={!!versionId}
      questionnaireId={questionnaireId}
      title={t('loop.edit.title', { name: loop?.name })}
      versionId={versionId}
    >
      {children}
    </ContentWrapper>
  )
}
