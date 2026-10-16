import { useTranslation } from 'react-i18next'

import DialogButton from '@/components/ui/DialogButton'

type Props = {
  body: React.ReactNode
  disabled?: boolean
  label?: string
  onConfirm: () => void
  title: React.ReactNode
}
export default function DuplicateButton({
  body,
  disabled = false,
  label,
  onConfirm,
  title,
}: Readonly<Props>) {
  const { t } = useTranslation()

  return (
    <DialogButton
      body={body}
      disabled={disabled}
      label={label ?? t('common.duplicate')}
      onValidate={onConfirm}
      title={title}
    />
  )
}
