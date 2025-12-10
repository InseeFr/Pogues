import React, { FormEventHandler } from 'react';

import { useBlocker } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import DirtyStateDialog from '@/components/layout/DirtyStateDialog';
import Button, { ButtonStyle } from '@/components/ui/Button';

type Props = {
  /** Form. */
  children: React.ReactNode;
  /** Set to true after the user modifies any of the inputs. */
  isDirty?: boolean;
  /** Set to true after the form is submitted. Will remain true until the reset method is invoked. */
  isSubmitted?: boolean;
  /** Set to true if the form doesn't have any errors. */
  isValid?: boolean;
  /** Override the default validate label (e.g. "modify"). */
  validateLabel?: string;
  /**
   * Action executed when the user click on Cancel button. Should redirect to
   * previous page.
   */
  onCancel: () => void;
  /** Action executed when the user submit the form. */
  onSubmit: FormEventHandler<HTMLFormElement>;
};

/**
 * A component that provides the form layout with cancel and confirm buttons,
 * and dirty state control.
 */
export default function Form({
  children,
  isDirty,
  isSubmitted,
  isValid,
  validateLabel = '',
  onCancel,
  onSubmit,
}: Readonly<Props>) {
  const { t } = useTranslation();

  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => isDirty && !isSubmitted,
    withResolver: true,
  });

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <div className="flex gap-x-2 mt-6 justify-end">
          <Button type="button" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            buttonStyle={ButtonStyle.Primary}
            disabled={!isDirty || !isValid}
          >
            {validateLabel ?? t('common.validate')}
          </Button>
        </div>
      </form>
      {status === 'blocked' ? (
        <DirtyStateDialog onValidate={proceed} onCancel={reset} />
      ) : null}
    </>
  );
}
