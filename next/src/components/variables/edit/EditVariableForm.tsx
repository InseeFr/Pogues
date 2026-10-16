import { useTranslation } from 'react-i18next'

import { postVariable, variablesKeys } from '@/api/variables'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import { Variable } from '@/models/variables'

import VariableForm from '../form/VariableForm'
import { type FormValues, schema } from '../form/schema'

type Props = {
  /** Initial variable value. */
  variable: Variable
  /** Related questionnaire id. */
  questionnaireId: string
  /** Scopes of the questionnaire with the mapping between id and name. */
  scopes: Map<string, string>
  /** List of variables used for auto-completion in VTL editor. */
  variables?: Variable[]
}

/** Form to edit an existing variable. */
export default function EditVariableForm({
  variable,
  questionnaireId,
  scopes,
  variables,
}: Readonly<Props>) {
  const { t } = useTranslation()

  const variableId = variable.id

  const { submit } = useFormSubmit({
    mutationFn: (formValues: FormValues) =>
      postVariable(questionnaireId, { id: variableId, ...formValues }),
    schema,
    invalidateKeys: [variablesKeys.all(questionnaireId)],
    successMessage: (formValues) =>
      t('variable.edit.success', { name: formValues.name }),
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
      variable={variable}
      questionnaireId={questionnaireId}
      onSubmit={onSubmit}
      submitLabel={t('common.edit')}
      scopes={scopes}
      variables={variables}
    />
  )
}
