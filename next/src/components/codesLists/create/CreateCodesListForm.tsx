import { useTranslation } from 'react-i18next'

import { codesListsKeys, putCodesList } from '@/api/codesLists'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import { FormulasLanguages } from '@/models/questionnaires'
import { Variable } from '@/models/variables'
import { uid } from '@/utils/utils'

import CodesListForm from '../form/CodesListForm'
import { FormValues, schema } from '../form/schema'

interface CreateCodesListFormProps {
  questionnaireId: string
  formulasLanguage?: FormulasLanguages
  variables: Variable[]
}

export default function CreateCodesListForm({
  questionnaireId,
  formulasLanguage,
  variables,
}: Readonly<CreateCodesListFormProps>) {
  const { t } = useTranslation()

  const { submit } = useFormSubmit({
    mutationFn: (values: FormValues) => {
      const id = uid()
      return putCodesList(questionnaireId, id, { id, ...values })
    },
    schema,
    invalidateKeys: [codesListsKeys.all(questionnaireId)],
    successMessage: t('codesList.create.success'),
    navigateFunction: {
      to: '/questionnaire/$questionnaireId/codes-lists',
      params: { questionnaireId },
    },
  })

  const submitForm = (values: FormValues) => {
    return submit(values)
  }

  return (
    <CodesListForm
      questionnaireId={questionnaireId}
      formulasLanguage={formulasLanguage}
      variables={variables}
      onSubmit={submitForm}
    />
  )
}
