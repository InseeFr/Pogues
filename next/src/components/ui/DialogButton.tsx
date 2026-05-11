import Button, { ButtonSize } from './Button'
import Dialog from './Dialog'

interface DialogButtonProps {
  /** Body message in the dialog. */
  body: React.ReactNode
  /** Label of the button that opens the dialog.  */
  label: string
  /**
   * Function to execute if the user click on "validate".
   *
   * The validate button is only present if this function is provided.
   */
  onValidate?: () => void
  /** Title of the dialog. */
  title: React.ReactNode
  /** Size of the button (defaults to medium). */
  buttonSize?: ButtonSize
  /** Title to be displayed on top of the button. */
  buttonTitle?: string
  /** Whether or not the button to open the dialog is disabled. */
  disabled?: boolean
}

/** Display a button that opens a confirmation dialog. */
export default function DialogButton({
  body,
  buttonSize,
  buttonTitle = '',
  disabled = false,
  label,
  onValidate,
  title,
}: Readonly<DialogButtonProps>) {
  return (
    <Dialog title={title} body={body} onValidate={onValidate}>
      <Button buttonSize={buttonSize} title={buttonTitle} disabled={disabled}>
        {label}
      </Button>
    </Dialog>
  )
}
