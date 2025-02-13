import { Field } from '@base-ui-components/react/field';

interface InputProps {
  autoFocus?: boolean;
  description?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  onChange?: (v: string | number | readonly string[] | undefined) => void;
  placeholder?: string;
  required?: boolean;
  value: string | number | readonly string[] | undefined;
}

export default function Input({
  autoFocus,
  description,
  disabled,
  error,
  label,
  onChange = () => {},
  placeholder,
  required,
  value,
}: Readonly<InputProps>) {
  return (
    <Field.Root
      invalid={!!error}
      disabled={disabled}
      className="flex w-full flex-col items-start gap-1"
    >
      {label ? (
        <Field.Label className="text-sm ml-1">
          {label}
          {required ? ' *' : ''}
        </Field.Label>
      ) : null}
      <Field.Control
        autoFocus={autoFocus}
        onValueChange={(v, _) => onChange(v)}
        value={value}
        required={required}
        placeholder={placeholder}
        className="w-full text-sm font-sans font-normal p-4 rounded-lg shadow-xs border border-default hover:enabled:border-primary focus:enabled:border-primary bg-default text-default placeholder:text-placeholder disabled:text-disabled disabled:bg-disabled focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary"
      />
      <Field.Error className="text-sm text-error ml-1" forceShow={!!error}>
        {error}
      </Field.Error>

      {description ? (
        <Field.Description className="text-sm text-default">
          {description}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}
