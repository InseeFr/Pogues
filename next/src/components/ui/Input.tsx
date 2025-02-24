import React, { useRef } from 'react';

import { Field } from '@base-ui-components/react/field';
import { Input as UIInput } from '@base-ui-components/react/input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement>(
  (
    {
      className = '',
      description,
      disabled,
      error,
      label,
      required,
      style = {},
      defaultValue,
      ...props
    }: Readonly<InputProps>,
    ref,
  ) => {
    return (
      <Field.Root
        invalid={!!error}
        disabled={disabled}
        className={`${className} flex w-full flex-col items-start gap-1`}
        style={style}
        defaultValue={defaultValue}
      >
        {label ? (
          <Field.Label className="text-sm ml-1">
            {label}
            {required ? ' *' : ''}
          </Field.Label>
        ) : null}
        <UIInput
          ref={ref}
          required={required}
          className="w-full text-sm font-sans font-normal p-4 rounded-lg shadow-xs border border-default hover:enabled:border-primary focus:enabled:border-primary bg-default text-default placeholder:text-placeholder disabled:text-disabled disabled:bg-disabled focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary"
          {...props}
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
  },
);

export default Input;
