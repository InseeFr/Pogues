import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
  type UseFormSetError,
} from 'react-hook-form'

import React from 'react'

import type { Variable } from '@/models/variables'

import VTLEditor from './VTLEditor'

export type ControlledVTLEditorProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>
  disabled?: boolean
  label?: React.ReactNode
  name: TName
  required?: boolean
  setError: UseFormSetError<TFieldValues>
  suggestionsVariables?: Variable[]
  testId?: string
  blockOnSyntaxErrors?: boolean
}

/**
 * Specific controlled form component for VTL editor
 */

//TODO: check if its compatible with react-19 pull request
export default function ControlledVTLEditor<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  disabled,
  label,
  name,
  required = false,
  setError,
  suggestionsVariables = [],
  testId,
  blockOnSyntaxErrors,
}: Readonly<ControlledVTLEditorProps<TFieldValues, TName>>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name: fieldName, value, onChange },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <VTLEditor
          data-testid={testId}
          dirty={isDirty}
          disabled={disabled}
          error={error}
          invalid={invalid}
          label={label}
          name={fieldName}
          onChange={onChange}
          required={required}
          blockOnSyntaxErrors={blockOnSyntaxErrors}
          setError={(errorOption) => setError(name, errorOption)}
          suggestionsVariables={suggestionsVariables}
          touched={isTouched}
          value={value as string | undefined}
        />
      )}
    />
  )
}
