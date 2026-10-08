import { useTranslation } from 'react-i18next'

import { multimodeKeys, putMultimode } from '@/api/multimode'
import FormComponent from '@/components/ui/form/FormComponent'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import type { MultimodeIsMovedRules } from '@/models/multimode'
import type { Variable } from '@/models/variables'

import IsMovedRulesForm from '../form/IsMovedRulesForm'
import { type FormValues, schema } from '../form/schema'

interface Props {
  questionnaireId: string
  isMovedRules: MultimodeIsMovedRules
  roundaboutVariables?: Variable[]
  variables?: Variable[]
}

/** Allow to edit multimode. */
export default function EditMultimode({
  questionnaireId,
  isMovedRules = { questionnaireFormula: '', leafFormula: '' },
  roundaboutVariables = [],
  variables = [],
}: Readonly<Props>) {
  const { t } = useTranslation()

  const { submit } = useFormSubmit({
    mutationFn: (updatedRules: FormValues) =>
      putMultimode(questionnaireId, updatedRules),
    schema,
    invalidateKeys: [multimodeKeys.all(questionnaireId)],
    successMessage: t('multimode.edit.success'),
    navigateFunction: {
      to: '/questionnaire/$questionnaireId/multimode',
      params: { questionnaireId },
    },
  })

  const submitForm = (updatedRules: FormValues) => {
    return submit(updatedRules)
  }

  return (
    <FormComponent>
      <IsMovedRulesForm
        questionnaireId={questionnaireId}
        isMovedRules={isMovedRules}
        roundaboutVariables={roundaboutVariables}
        variables={variables}
        onSubmit={submitForm}
      />
    </FormComponent>
  )
}
