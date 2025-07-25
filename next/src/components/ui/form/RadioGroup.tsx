import { useId } from 'react';

import { Radio } from '@base-ui-components/react/radio';
import { RadioGroup as UIRadioGroup } from '@base-ui-components/react/radio-group';

import Label from './Label';

interface RadioGroupProps {
  label?: string;
  onChange: (v: unknown) => void;
  disabled?: boolean;
  required?: boolean;
  options: { label: string; value: string }[];
  defaultValue?: string;
}

export default function RadioGroup({
  label,
  disabled = false,
  required = false,
  onChange,
  options,
  defaultValue,
}: Readonly<RadioGroupProps>) {
  const id = useId();

  return (
    <UIRadioGroup
      aria-labelledby={id}
      defaultValue={defaultValue}
      className="flex flex-col items-start gap-1 text-gray-900"
      disabled={disabled}
      onValueChange={onChange}
    >
      <Label className="flex items-center m-2 gap-2 text-md" id={id}>
        {label}
        {required ? ' *' : ''}
      </Label>
      <div className="flex gap-x-4">
        {options.map(({ label, value }) => (
          <label className="flex items-center gap-2" key={label}>
            <Radio.Root
              name={label}
              value={value}
              className="size-[1.125rem] p-2 flex items-center justify-center hover:shadow-sm rounded-full outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-checked:bg-primary border-2 border-default hover:border-primary data-checked:border-primary"
            >
              <Radio.Indicator className="flex text-gray-50 data-[unchecked]:hidden">
                <RadioIcon className="size-3" />
              </Radio.Indicator>
            </Radio.Root>
            {label}
          </label>
        ))}
      </div>
    </UIRadioGroup>
  );
}

function RadioIcon(props: Readonly<React.ComponentProps<'svg'>>) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <circle cx="5" cy="5" r="3" />
    </svg>
  );
}
