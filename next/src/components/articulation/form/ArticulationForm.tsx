import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { type SubmitHandler, useForm } from 'react-hook-form'

import Form from '@/components/ui/form/Form'
import FormField from '@/components/ui/form/FormField'
import VTLEditor from '@/components/ui/form/VTLEditor'
import {
  type ArticulationItems,
  defaultArticulationItems,
} from '@/models/articulation'
import type { Variable } from '@/models/variables'

import ArticulationVariableLabel from '../ArticulationVariableLabel'
import { type FormValues, schema } from './schema'

interface ArticulationFormProps {
  questionnaireId: string
  articulationItems?: ArticulationItems
  variables?: Variable[]
  onSubmit: SubmitHandler<FormValues>
}

export default function ArticulationForm({
  questionnaireId,
  articulationItems = defaultArticulationItems,
  variables = [],
  onSubmit,
}: Readonly<ArticulationFormProps>) {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted },
    setError,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { items: defaultArticulationItems },
    values: { items: articulationItems },
  })

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/articulation',
      params: { questionnaireId },
      ignoreBlocker: true,
    })
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
    >
      {articulationItems.map((item, index) => (
        <FormField
          key={item.label}
          control={control}
          name={`items.${index as 0 | 1 | 2}.value`}
          noField
        >
          {({
            field: { name, value, onChange },
            fieldState: { isDirty, error, invalid, isTouched },
          }) => (
            <VTLEditor
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={<ArticulationVariableLabel label={item.label} />}
              name={name}
              onChange={onChange}
              required
              setError={(error) => setError(name, error)}
              suggestionsVariables={variables}
              touched={isTouched}
              value={value}
            />
          )}
        </FormField>
      ))}
    </Form>
  )
}
