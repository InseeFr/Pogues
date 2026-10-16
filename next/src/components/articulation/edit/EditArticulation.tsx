import { useTranslation } from 'react-i18next'

import { articulationKeys, putArticulation } from '@/api/articulation'
import FormComponent from '@/components/ui/form/FormComponent'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import { ArticulationItems } from '@/models/articulation'
import { Variable } from '@/models/variables'

import ArticulationForm from '../form/ArticulationForm'
import { type FormValues, schema } from '../form/schema'

interface EditArticulationProps {
  questionnaireId: string
  variables?: Variable[]
  articulationItems?: ArticulationItems
}

/** Allow to edit articulation variables */
export default function EditArticulation({
  questionnaireId,
  variables,
  articulationItems,
}: Readonly<EditArticulationProps>) {
  const { t } = useTranslation()

  const { submit } = useFormSubmit({
    mutationFn: (articulation: FormValues) =>
      putArticulation(questionnaireId, articulation),
    schema,
    invalidateKeys: [articulationKeys.all(questionnaireId)],
    successMessage: t('articulation.edit.success'),
    navigateFunction: {
      to: '/questionnaire/$questionnaireId/articulation',
      params: { questionnaireId },
    },
  })

  const submitForm = (articulation: FormValues) => {
    return submit(articulation)
  }

  return (
    <FormComponent>
      <ArticulationForm
        questionnaireId={questionnaireId}
        articulationItems={articulationItems}
        variables={variables}
        onSubmit={submitForm}
      />
    </FormComponent>
  )
}
