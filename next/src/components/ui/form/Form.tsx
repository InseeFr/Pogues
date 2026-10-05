import { useBlocker } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import React, { FormEventHandler } from 'react'

import DirtyStateDialog from '@/components/layout/DirtyStateDialog'
import Button, { ButtonStyle } from '@/components/ui/Button'
import DialogButton from '@/components/ui/DialogButton'
import Tooltip from '@/components/ui/Tooltip'

export type DeleteButtonProps = {
  /** Title of the confirmation dialog. */
  dialogTitle: React.ReactNode
  /** Body of the confirmation dialog. */
  dialogBody: React.ReactNode
  /** Action executed when the user confirms the deletion. */
  onDelete: () => void
  /**
   * If provided, the button is disabled and this content explains why in a
   * tooltip.
   */
  disabledTooltip?: React.ReactNode
}

type Props = {
  /** Form. */
  children?: React.ReactNode
  /** Set to true after the user modifies any of the inputs. */
  isDirty?: boolean
  /** Set to true after the form is submitted. Will remain true until the reset method is invoked. */
  isSubmitted?: boolean
  /** Set to true if the form doesn't have any errors. */
  isValid?: boolean
  /** Override the default validate label (e.g. "modify"). */
  validateLabel?: string
  /** If provided, display a delete button on the left of the form buttons. */
  deleteButton?: DeleteButtonProps
  /**
   * Action executed when the user click on Cancel button. Should redirect to
   * previous page.
   */
  onCancel: () => void
  /** Action executed when the user submit the form. */
  onSubmit: FormEventHandler<HTMLFormElement>
}

/**
 * A component that provides the form layout with cancel and confirm buttons,
 * and dirty state control.
 */
export default function Form({
  children = null,
  isDirty,
  isSubmitted,
  isValid,
  validateLabel = '',
  deleteButton,
  onCancel,
  onSubmit,
}: Readonly<Props>) {
  const { t } = useTranslation()

  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => !!isDirty && !isSubmitted,
    withResolver: true,
  })

  const isSubmitEnabled = isValid && isDirty

  const getSubmitTooltip = (): string | null => {
    if (isSubmitEnabled) {
      return null
    }
    if (!isValid) {
      return t('common.form.submitInvalid')
    }
    return t('common.form.submitUnchanged')
  }

  const submitTooltip = getSubmitTooltip()

  const submitButton = (
    <Button
      type="submit"
      buttonStyle={ButtonStyle.Primary}
      disabled={!isSubmitEnabled}
      data-testid="form-submit-button"
    >
      {validateLabel || t('common.validate')}
    </Button>
  )

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <div className="flex gap-x-2 mt-6 justify-end">
          {deleteButton ? (
            <div className="mr-auto">
              <FormDeleteButton {...deleteButton} />
            </div>
          ) : null}
          <Button type="button" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
          {submitTooltip ? (
            <Tooltip title={submitTooltip}>
              <span className="inline-block">{submitButton}</span>
            </Tooltip>
          ) : (
            submitButton
          )}
        </div>
      </form>
      {status === 'blocked' ? (
        <DirtyStateDialog onValidate={proceed} onCancel={reset} />
      ) : null}
    </>
  )
}

/**
 * Button opening a confirmation dialog before deleting the edited element, or
 * disabled with a tooltip explaining why the element cannot be deleted.
 */
function FormDeleteButton({
  dialogTitle,
  dialogBody,
  onDelete,
  disabledTooltip,
}: Readonly<DeleteButtonProps>) {
  const { t } = useTranslation()

  if (disabledTooltip) {
    return (
      <Tooltip title={disabledTooltip}>
        <span className="inline-block">
          <Button type="button" disabled>
            {t('common.delete')}
          </Button>
        </span>
      </Tooltip>
    )
  }

  return (
    <DialogButton
      label={t('common.delete')}
      title={dialogTitle}
      body={dialogBody}
      onValidate={onDelete}
    />
  )
}
