import { useState } from 'react';

import { Dialog as UIDialog } from '@base-ui-components/react/dialog';
import { useTranslation } from 'react-i18next';

import Button, { ButtonStyle } from './Button';

interface DialogButtonProps {
  /** Body message in the dialog. */
  body: React.ReactNode;
  /**
   * Function to execute if the user click on "cancel".
   *
   * It will replace the default "cancel" button. It should only be used with a controlled dialog.
   */
  onCancel?: () => void;
  /**
   * Function to execute if the user click on "validate".
   *
   * The validate button is only present if this function is provided.
   */
  onValidate?: () => void;
  /** Children to render inside the dialog trigger button. */
  children?: React.ReactElement;
  /** Title of the dialog. */
  title: React.ReactNode;
  /** Whether or not the button to open the dialog is disabled. */
  disabled?: boolean;
  /** Optional open state and setter for controlled dialog behavior. */
  controlledOpen?: boolean;
  /** Optional setter for open state, useful for controlled components. */
  setControlledOpen?: (open: boolean) => void;
}

/** Display a button that opens a confirmation dialog. */
export default function Dialog({
  body,
  onCancel,
  onValidate,
  title,
  children,
  controlledOpen,
  setControlledOpen,
}: Readonly<DialogButtonProps>) {
  const { t } = useTranslation();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  return (
    <UIDialog.Root open={open} onOpenChange={setOpen}>
      {children && <UIDialog.Trigger render={children}></UIDialog.Trigger>}
      <UIDialog.Portal>
        <UIDialog.Backdrop className="fixed z-99 inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70" />
        <UIDialog.Popup className="fixed z-100 top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
          <UIDialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
            {title}
          </UIDialog.Title>
          <UIDialog.Description className="mb-6 text-base text-gray-600">
            {body}
          </UIDialog.Description>
          <div className="flex justify-end gap-4">
            {onCancel ? (
              <Button onClick={onCancel}>{t('common.cancel')}</Button>
            ) : (
              <UIDialog.Close render={<Button>{t('common.cancel')}</Button>} />
            )}
            {onValidate ? (
              <Button
                onClick={() => {
                  onValidate();
                  setOpen(false);
                }}
                buttonStyle={ButtonStyle.Primary}
              >
                {t('common.validate')}
              </Button>
            ) : null}
          </div>
        </UIDialog.Popup>
      </UIDialog.Portal>
    </UIDialog.Root>
  );
}
