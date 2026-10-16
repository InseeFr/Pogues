import { type SubmitHandler } from 'react-hook-form'

import ControlledVTLEditor from '@/components/ui/form/ControlledVTLEditor'
import Form from '@/components/ui/form/Form'
import { useFormCancel } from '@/hooks/form/useFormCancel'
import { useReactHookfForm } from '@/hooks/form/useReactHookfForm'
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
  const cancel = useFormCancel()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted },
    setError,
  } = useReactHookfForm<FormValues>({
    schema,
    defaultValues: { items: defaultArticulationItems },
    values: { items: articulationItems },
  })

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() =>
        cancel({
          to: '/questionnaire/$questionnaireId/articulation',
          params: { questionnaireId },
        })
      }
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
    >
      {articulationItems.map((item, index) => (
        <ControlledVTLEditor
          key={item.label}
          control={control}
          // not clean, but by default it does not understand there are only those 3 index values
          name={`items.${index as 0 | 1 | 2}.value`}
          label={<ArticulationVariableLabel label={item.label} />}
          required
          setError={setError}
          suggestionsVariables={variables}
        />
      ))}
    </Form>
  )
}
