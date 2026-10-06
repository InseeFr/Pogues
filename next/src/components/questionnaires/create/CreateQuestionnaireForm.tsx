import { useTranslation } from 'react-i18next'

import { postQuestionnaire, questionnairesKeys } from '@/api/questionnaires'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import { uid } from '@/utils/utils'

import QuestionnaireForm from '../form/QuestionnaireForm'
import { type FormValues, schema } from '../form/schema'

interface CreateQuestionnaireFormProps {
  /** Stamp to add the questionnaire to. */
  stamp: string
}

/** Form to create a questionnaire. */
export default function CreateQuestionnaireForm({
  stamp,
}: Readonly<CreateQuestionnaireFormProps>) {
  const { t } = useTranslation()

  const { submit } = useFormSubmit({
    mutationFn: async (values: FormValues): Promise<string> => {
      const id = uid()
      await postQuestionnaire({ id, ...values }, stamp)
      return id
    },
    schema,
    invalidateKeys: [questionnairesKeys.allByStamp(stamp)],
    successMessage: (values) =>
      t('questionnaire.create.success', { title: values.title }),
    navigateFunction: (questionnaireId) => ({
      to: '/questionnaire/$questionnaireId',
      params: { questionnaireId },
    }),
  })

  const onSubmit = (values: FormValues) => {
    return submit(values)
  }

  return (
    <QuestionnaireForm onSubmit={onSubmit} submitLabel={t('common.create')} />
  )
}
