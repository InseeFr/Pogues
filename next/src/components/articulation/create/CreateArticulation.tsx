import { useTranslation } from 'react-i18next'

import { articulationKeys, putArticulation } from '@/api/articulation'
import FormComponent from '@/components/ui/form/FormComponent'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import { defaultArticulationItems } from '@/models/articulation'
import { Variable } from '@/models/variables'

import ArticulationForm from '../form/ArticulationForm'
import { type FormValues, schema } from '../form/schema'

interface CreateArticulationProps {
  questionnaireId: string
  variables?: Variable[]
}

/** Allow to create articulation */
export default function CreateArticulation({
  questionnaireId,
  variables,
}: Readonly<CreateArticulationProps>) {
  const { t } = useTranslation()

  const { submit } = useFormSubmit({
    mutationFn: (articulation: FormValues) =>
      putArticulation(questionnaireId, articulation),
    schema,
    invalidateKeys: [articulationKeys.all(questionnaireId)],
    successMessage: t('articulation.create.success'),
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
        articulationItems={defaultArticulationItems}
        variables={variables}
        onSubmit={submitForm}
      />
    </FormComponent>
  )
}
