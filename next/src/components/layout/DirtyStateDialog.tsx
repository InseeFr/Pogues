import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import Dialog from '@/components/ui/Dialog'

interface DirtyStateDialogProps {
  onValidate: () => void
  onCancel: () => void
}

/**
 * A confirmation dialog used to warn the user they might lose data if they
 * leave the page.
 */
export default function DirtyStateDialog({
  onValidate,
  onCancel,
}: Readonly<DirtyStateDialogProps>) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(true)

  return (
    <Dialog
      controlledOpen={open}
      setControlledOpen={setOpen}
      title={t('common.unsavedModification.title')}
      body={t('common.unsavedModification.body')}
      onValidate={() => {
        setOpen(false)
        onValidate()
      }}
      onCancel={() => {
        setOpen(false)
        onCancel()
      }}
    />
  )
}
