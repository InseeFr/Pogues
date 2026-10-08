import { useTranslation } from 'react-i18next'

import { postVariable, variablesKeys } from '@/api/variables'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import { Variable } from '@/models/variables'
import { uid } from '@/utils/utils'

import VariableForm from '../form/VariableForm'
import { type FormValues, schema } from '../form/schema'

type Props = {
  /** Questionnaire to add the variable to. */
  questionnaireId: string
  /** Scopes of the questionnaire with the mapping between id and name. */
  scopes: Map<string, string>
  /** List of variables used for auto-completion in VTL editor. */
  variables?: Variable[]
}

/** Form to create a questionnaire. */
export default function CreateVariableForm({
  questionnaireId,
  scopes,
  variables,
}: Readonly<Props>) {
  const { t } = useTranslation()

  const { submit } = useFormSubmit({
    mutationFn: (formValues: FormValues) =>
      postVariable(questionnaireId, { id: uid(), ...formValues }),
    schema,
    invalidateKeys: [variablesKeys.all(questionnaireId)],
    successMessage: (formValues) =>
      t('variable.create.success', { name: formValues.name }),
    navigateFunction: {
      to: '/questionnaire/$questionnaireId/variables',
      params: { questionnaireId },
    },
  })

  const onSubmit = (formValues: FormValues) => {
    return submit(formValues)
  }

  return (
    <VariableForm
      questionnaireId={questionnaireId}
      onSubmit={onSubmit}
      submitLabel={t('common.create')}
      scopes={scopes}
      variables={variables}
    />
  )
}
