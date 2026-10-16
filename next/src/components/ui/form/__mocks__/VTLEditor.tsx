import { FieldError } from 'react-hook-form'

import React from 'react'

import { Variable } from '@/models/variables'

import Field from '../Field'
import Input from '../Input'

type Props = {
  'data-testid'?: string
  description?: string
  dirty?: boolean
  disabled?: boolean
  error?: FieldError
  invalid?: boolean
  label?: React.ReactNode
  name?: string
  onChange?: (value: string) => void
  required?: boolean
  suggestionsVariables?: Variable[]
  touched?: boolean
  value?: string
}

export default function VTLEditor({
  'data-testid': testId,
  description,
  dirty,
  disabled,
  error,
  invalid,
  label,
  name,
  onChange,
  required = false,
  suggestionsVariables: _,
  touched,
  value,
}: Readonly<Props>) {
  return (
    <Field
      description={description}
      dirty={dirty}
      disabled={disabled}
      error={error}
      invalid={invalid}
      label={label}
      name={name}
      required={required}
      touched={touched}
    >
      <Input
        data-testid={testId}
        disabled={disabled}
        value={value}
        onValueChange={onChange}
      />
    </Field>
  )
}
