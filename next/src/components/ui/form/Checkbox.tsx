import * as React from 'react';

import { Checkbox as BaseUICheckbox } from '@base-ui-components/react/checkbox';

import Label from './Label';

type Props = {
  /**
   * Whether the checkbox is currently ticked.
   *
   * To render an uncontrolled checkbox, use the `defaultChecked` prop instead.
   */
  checked?: BaseUICheckbox.Root.Props['checked'];
  /** Whether the component should ignore user interaction. */
  disabled?: BaseUICheckbox.Root.Props['disabled'];
  /** Meaningful text label about the value the checkbox entails. */
  label?: string;
  onChange?: (v: boolean) => void;
  /** Event handler called when the checkbox is ticked or unticked. */
  onCheckedChange?: BaseUICheckbox.Root.Props['onCheckedChange'];
  /** Whether the user must tick the checkbox before submitting a form. */
  required?: BaseUICheckbox.Root.Props['required'];
};

export default function Checkbox({
  checked,
  disabled,
  label,
  onChange,
  required,
}: Readonly<Props>) {
  return (
    <Label className="flex items-center m-2 gap-2 text-default">
      <BaseUICheckbox.Root
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
        required={required}
        className="size-[1.125rem] p-2 flex items-center justify-center hover:shadow-sm rounded-xs outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-checked:bg-primary border-2 border-default hover:border-primary data-checked:border-primary"
      >
        <BaseUICheckbox.Indicator className="flex text-negative data-unchecked:hidden">
          <CheckIcon className="size-3" />
        </BaseUICheckbox.Indicator>
      </BaseUICheckbox.Root>
      <span className="text-sm ml-1">{label}</span>
    </Label>
  );
}

function CheckIcon(props: Readonly<React.ComponentProps<'svg'>>) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
