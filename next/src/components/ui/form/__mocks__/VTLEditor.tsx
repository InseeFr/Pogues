import { FieldError } from 'react-hook-form'

import { Variable } from '@/models/variables'

import FormInput, { Props } from '../FormInput'

export default function VTLEditor({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  suggestionsVariables,
  error,
  ...props
}: Readonly<{ suggestionsVariables: Variable[]; error: FieldError } & Props>) {
  return <FormInput className="col-start-2" error={error?.message} {...props} />
}
