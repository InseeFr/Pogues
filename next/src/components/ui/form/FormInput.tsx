import { Field } from '@base-ui-components/react/field'
import { Input as UIInput } from '@base-ui-components/react/input'

import React from 'react'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  description?: string
  error?: string
  label?: string
  required?: boolean
  onValueChange?: UIInput.Props['onValueChange']
  showClearButton?: boolean
}

/** @deprecated Use `Field` and `Input` instead. */
const FormInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = '',
      description,
      disabled,
      error,
      label,
      required = false,
      style = {},
      defaultValue,
      onValueChange,
      ...props
    }: Readonly<Props>,
    ref,
  ) => {
    // Determine controlled vs uncontrolled mode once, based on whether a
    // `value` prop was explicitly provided. In controlled mode, normalize
    // `undefined` to '' so Base UI's FieldControl never switches modes
    // (e.g. during react-hook-form resets when using the `values` option).
    const hasValueProp = 'value' in props;
    const { value, ...restProps } = props;
    const controlledValue = hasValueProp ? (value ?? '') : undefined;

    return (
      <Field.Root
        invalid={!!error}
        disabled={disabled}
        className={`${className} flex w-full flex-col items-start gap-1`}
        style={style}
      >
        {label ? (
          <Field.Label className="text-sm ml-1">
            {label}
            {required ? ' *' : ''}
          </Field.Label>
        ) : null}
        <div className="relative w-full">
          <UIInput
            ref={ref}
            required={required}
            defaultValue={hasValueProp ? undefined : defaultValue}
            value={controlledValue}
            onValueChange={onValueChange}
            className="w-full text-sm font-sans font-normal p-4 rounded-lg shadow-xs border border-default hover:enabled:border-primary focus:enabled:border-primary bg-default text-default placeholder:text-placeholder disabled:text-disabled disabled:bg-disabled focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary"
            {...restProps}
          />
        </div>
        <Field.Error
          className="text-sm text-error ml-1"
          match={!!error}
          role="alert"
        >
          {error}
        </Field.Error>

        {description ? (
          <Field.Description className="text-sm text-default">
            {description}
          </Field.Description>
        ) : null}
      </Field.Root>
    )
  },
)

export default FormInput
