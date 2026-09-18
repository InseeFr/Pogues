import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form'

import Field, { type Props as FieldProps } from './Field'

type RenderProps<T extends FieldValues, N extends FieldPath<T>> = {
  field: ControllerRenderProps<T, N>
  fieldState: {
    invalid: boolean
    isDirty: boolean
    isTouched: boolean
    error?: FieldProps['error']
  }
}

type FormFieldProps<T extends FieldValues, N extends FieldPath<T>> = {
  control: Control<T>
  name: N
  defaultValue?: FieldPathValue<T, N>
  label?: FieldProps['label']
  description?: FieldProps['description']
  required?: boolean
  disabled?: boolean
  rules?: Omit<
    RegisterOptions<T, N>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  noField?: boolean
  /** Input component such as Select, NumberFieldm etc.. */
  children: (props: RenderProps<T, N>) => React.ReactNode
}

/**
 * A component that encapsulate both form and controller layout
 */
export default function FormField<
  T extends FieldValues,
  N extends FieldPath<T>,
>({
  control,
  name,
  defaultValue,
  label,
  description,
  required = false,
  disabled = false,
  rules,
  noField = false,
  children,
}: Readonly<FormFieldProps<T, N>>) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({
        field,
        fieldState: { invalid, isTouched, isDirty, error },
      }) => {
        const renderProps: RenderProps<T, N> = {
          field,
          fieldState: { invalid, isTouched, isDirty, error },
        }
        // VTL editor field do not have <Field>
        if (noField) {
          return <>{children(renderProps)}</>
        }
        return (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={label}
            name={field.name}
            required={required}
            touched={isTouched}
            description={description}
            disabled={disabled}
          >
            {children(renderProps)}
          </Field>
        )
      }}
    />
  )
}
