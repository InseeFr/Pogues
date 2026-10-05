import { useTranslation } from 'react-i18next'

import ContentWrapper from '@/components/layout/ContentWrapper'
import type { Loop } from '@/models/loops'

type Props = {
  children: React.ReactNode
  /** Loop to edit. */
  loop?: Loop
}

export default function EditLoopLayout({ children, loop }: Readonly<Props>) {
  const { t } = useTranslation()

  return (
    <ContentWrapper title={t('loop.edit.title', { name: loop?.name })}>
      {children}
    </ContentWrapper>
  )
}
