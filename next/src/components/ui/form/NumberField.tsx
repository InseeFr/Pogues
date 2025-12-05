import { NumberField as BaseUINumberField } from '@base-ui-components/react/number-field';

import { MinusIcon } from '../icons/MinusIcon';
import { PlusIcon } from '../icons/PlusIcon';

type Props = {
  /**
   * The uncontrolled value of the field when it’s initially rendered.
   *
   * To render a controlled number field, use the value prop instead.
   */
  defaultValue?: BaseUINumberField.Root.Props['defaultValue'];
  /** A ref to access the hidden input element. */
  inputRef?: BaseUINumberField.Root.Props['inputRef'];
  /** The raw numeric value of the field. */
  value?: BaseUINumberField.Root.Props['value'];
  /** Callback fired when the number value changes. */
  onValueChange?: BaseUINumberField.Root.Props['onValueChange'];
};

/**
 * A numeric input element with increment and decrement buttons, and a scrub
 * area.
 */
export default function NumberField({
  defaultValue,
  inputRef,
  value,
  onValueChange,
}: Readonly<Props>) {
  return (
    <BaseUINumberField.Root
      className="flex flex-col items-start gap-1 font-normal"
      defaultValue={defaultValue}
      inputRef={inputRef}
      value={value}
      onValueChange={onValueChange}
    >
      <BaseUINumberField.Group className="flex">
        <BaseUINumberField.Decrement className="flex size-10 items-center justify-center rounded-tl-md rounded-bl-md border border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100">
          <MinusIcon />
        </BaseUINumberField.Decrement>
        <BaseUINumberField.Input className="h-10 w-24 border-t border-b border-gray-200 text-center text-base text-gray-900 tabular-nums focus:z-1 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800" />
        <BaseUINumberField.Increment className="flex size-10 items-center justify-center rounded-tr-md rounded-br-md border border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100">
          <PlusIcon />
        </BaseUINumberField.Increment>
      </BaseUINumberField.Group>
    </BaseUINumberField.Root>
  );
}
