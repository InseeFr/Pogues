import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form'

import React from 'react'

import Field from './Field'

export type ControlledFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  children: (
    field: ControllerRenderProps<TFieldValues, TName>,
  ) => React.ReactNode
  control: Control<TFieldValues>
  defaultValue?: UseControllerProps<TFieldValues, TName>['defaultValue']
  description?: string
  disabled?: boolean
  label?: React.ReactNode
  name: TName
  required?: boolean
  rules?: UseControllerProps<TFieldValues, TName>['rules']
}

/**
 * Common form component that should be used in form accross the app
 *
 */
export default function ControlledField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  children,
  control,
  defaultValue,
  description,
  disabled = false,
  label,
  name,
  required = false,
  rules,
}: Readonly<ControlledFieldProps<TFieldValues, TName>>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field,
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <Field
          description={description}
          dirty={isDirty}
          disabled={disabled}
          error={error}
          invalid={invalid}
          label={label}
          name={name}
          required={required}
          touched={isTouched}
        >
          {children(field)}
        </Field>
      )}
    />
  )
}
