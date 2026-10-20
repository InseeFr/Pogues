import { useTranslation } from 'react-i18next'

import DialogButton from '@/components/ui/DialogButton'

export type DeleteButtonProps = {
  body: string
  disabled?: boolean
  label?: string
  buttonTitle?: string
  onConfirm: () => void
  title: string
}

export default function DeleteButton({
  body,
  buttonTitle,
  disabled = false,
  label,
  onConfirm,
  title,
}: Readonly<DeleteButtonProps>) {
  const { t } = useTranslation()

  return (
    <DialogButton
      body={body}
      buttonTitle={buttonTitle}
      disabled={disabled}
      label={label ?? t('common.delete')}
      onValidate={onConfirm}
      title={title}
    />
  )
}
