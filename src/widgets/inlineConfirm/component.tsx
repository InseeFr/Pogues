import { Check, WarningTriangle, Xmark } from 'iconoir-react';

import Dictionary from '@/utils/dictionary/dictionary';

interface ConfirmInlineProps {
  onConfirm: () => void;
  onCancel: () => void;
  warningLabel?: string;
}

/**
 * Display an inline confirmation text which trigger when the appropriate icon
 * is clicked.
 *
 * `onCancel` should close this confirmation component.
 */
export default function ConfirmInline({
  onConfirm,
  onCancel,
  warningLabel = '',
}: Readonly<ConfirmInlineProps>) {
  return (
    <div>
      <span className="align-middle">{Dictionary.confirmQuestionMessage}</span>{' '}
      <button
        className="hover:text-green-400 align-middle font-bold"
        title={`${Dictionary.yes}`}
        onClick={onConfirm}
      >
        <Check height={16} width={16} strokeWidth={2} />
      </button>{' '}
      <button
        className="hover:text-red-400 align-middle"
        title={`${Dictionary.no}`}
        onClick={onCancel}
      >
        <Xmark height={16} width={16} strokeWidth={2} />
      </button>
      {warningLabel ? (
        <span className="ml-3 gap-x-2 align-middle inline-flex text-red-500">
          <WarningTriangle height={16} width={16} />
          <span>{warningLabel}</span>
        </span>
      ) : null}
    </div>
  );
}
