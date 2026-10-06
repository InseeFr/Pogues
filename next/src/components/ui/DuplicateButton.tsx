import DialogButton from '@/components/ui/DialogButton'

type Props = {
  body: React.ReactNode
  disabled?: boolean
  label: string
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
  return (
    <DialogButton
      body={body}
      disabled={disabled}
      label={label}
      onValidate={onConfirm}
      title={title}
    />
  )
}
