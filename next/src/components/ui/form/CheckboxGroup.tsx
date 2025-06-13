import { useId } from 'react';

import { Checkbox } from '@base-ui-components/react/checkbox';
import { CheckboxGroup as UICheckboxGroup } from '@base-ui-components/react/checkbox-group';

import Label from './Label';

interface CheckboxGroupProps {
  label?: string;
  onChange: (v: string[]) => void;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  options: { label: string; value: string }[];
  defaultValue?: string[];
}

export default function CheckboxGroup({
  label,
  disabled = false,
  required = false,
  onChange,
  options,
  defaultValue,
}: Readonly<CheckboxGroupProps>) {
  const id = useId();

  return (
    <UICheckboxGroup
      aria-labelledby={id}
      defaultValue={defaultValue}
      className="flex flex-col items-start gap-1 text-gray-900"
      disabled={disabled}
      onValueChange={onChange}
    >
      <Label className="flex items-center m-2 gap-2 text-default" id={id}>
        {label}
        {required ? ' *' : ''}
      </Label>
      <div className="flex gap-x-4">
        {options.map(({ label, value }) => (
          <label className="flex items-center gap-2" key={label}>
            <Checkbox.Root
              name={label}
              value={value}
              className="size-[1.125rem] p-2 flex items-center justify-center hover:shadow-sm rounded-xs outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-checked:bg-primary border-2 border-default hover:border-primary data-checked:border-primary"
            >
              <Checkbox.Indicator className="flex text-gray-50 data-[unchecked]:hidden">
                <CheckIcon className="size-3" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            {label}
          </label>
        ))}
      </div>
    </UICheckboxGroup>
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
