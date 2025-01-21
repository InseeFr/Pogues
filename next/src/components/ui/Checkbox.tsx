import { useState } from 'react';

import { FormControl } from '@mui/base/FormControl';
import { Input as MuiInput } from '@mui/base/Input';

import { uuid } from '@/utils/utils';

import Label from './Label';

interface CheckboxProps {
  autoFocus?: boolean;
  label?: string;
  labelPosition?: 'right' | 'top';
  onChange: (newValue: string) => void;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export default function Checkbox({
  autoFocus = false,
  label = '',
  labelPosition = 'right',
  onChange,
  disabled = false,
  required = false,
}: Readonly<CheckboxProps>) {
  const [id] = useState(uuid());
  return (
    <FormControl
      disabled={disabled}
      className="grid grid-cols-2 items-center"
      required={required}
    >
      <MuiInput
        id={id}
        type={'checkbox'}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          input: {
            className:
              'cursor-pointer size-[1.125rem] m-2 text-sm border border-solid bg-white focus-visible:outline-0',
          },
        }}
        aria-label={label}
      />
      {label && labelPosition === 'right' ? (
        <Label>
          <label htmlFor={id}>{label}</label>
        </Label>
      ) : null}
    </FormControl>
  );
}
