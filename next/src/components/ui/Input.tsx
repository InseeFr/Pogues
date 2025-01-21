import { FormControl } from '@mui/base/FormControl';
import { Input as MuiInput } from '@mui/base/Input';
import { TextMagnifyingGlass } from 'iconoir-react';

import HelperText from './HelperText';
import Label from './Label';

interface InputProps {
  autoFocus?: boolean;
  displaySearchIcon?: boolean;
  label?: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: unknown;
  disabled?: boolean;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
}

export default function Input({
  autoFocus = false,
  displaySearchIcon = false,
  label = '',
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  value,
  type,
}: Readonly<InputProps>) {
  return (
    <FormControl
      value={value}
      required={required}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      {label ? <Label>{label}</Label> : null}
      <MuiInput
        type={type}
        autoFocus={autoFocus}
        slotProps={{
          root: {
            className: 'flex',
          },
          input: {
            className:
              'w-full text-sm font-sans font-normal leading-5 p-4 rounded-lg shadow-md shadow-slate-100 focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 focus:border-purple-500 bg-white text-slate-900 focus-visible:outline-0',
          },
        }}
        aria-label={label}
        placeholder={placeholder}
        endAdornment={
          displaySearchIcon ? (
            <div className="text-disabled inline-flex items-center text-center -ml-8">
              <TextMagnifyingGlass />
            </div>
          ) : undefined
        }
      />
      <HelperText />
    </FormControl>
  );
}
