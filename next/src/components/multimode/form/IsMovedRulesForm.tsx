import { type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import ControlledVTLEditor from '@/components/ui/form/ControlledVTLEditor'
import Form from '@/components/ui/form/Form'
import Label from '@/components/ui/form/Label'
import { useFormCancel } from '@/hooks/form/useFormCancel'
import { useReactHookfForm } from '@/hooks/form/useReactHookfForm'
import type { MultimodeIsMovedRules } from '@/models/multimode'
import { Variable } from '@/models/variables'

import { type FormValues, schema } from './schema'

interface Props {
  questionnaireId: string
  isMovedRules?: MultimodeIsMovedRules
  roundaboutVariables?: Variable[]
  variables?: Variable[]
  onSubmit: SubmitHandler<FormValues>
}

/**
 * Form component used to set multimode rules for the "IS_MOVED" rule.
 *
 * The leaf part should only be accessible if the questionnaire has a
 * roundabout.
 */
export default function MultimodeIsMovedRulesForm({
  questionnaireId,
  isMovedRules = { questionnaireFormula: '', leafFormula: '' },
  roundaboutVariables = [],
  variables = [],
  onSubmit,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const cancel = useFormCancel()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted },
    setError,
  } = useReactHookfForm<FormValues>({
    schema,
    defaultValues: isMovedRules,
  })

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() =>
        cancel({
          to: '/questionnaire/$questionnaireId/multimode',
          params: { questionnaireId },
        })
      }
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
    >
      <ControlledVTLEditor
        control={control}
        name="questionnaireFormula"
        label={t('multimode.form.questionnaireFormula')}
        setError={setError}
        suggestionsVariables={variables}
      />
      {roundaboutVariables.length > 0 ? (
        <ControlledVTLEditor
          control={control}
          name="leafFormula"
          label={t('multimode.form.leafFormula')}
          setError={setError}
          // Warning : it should be roundaboutVariables but currently VTLEditor can't be rendered twice
          // with different suggestionsVariables else every field has the suggestionsVariables of the last field.
          // Until we find a solution, we prefer to use the questionnaire variables.
          suggestionsVariables={variables}
        />
      ) : (
        <div>
          <Label>{t('multimode.form.leafFormula')}</Label>
          <div className="py-3 text-disabled text-sm italic">
            {t('multimode.form.noRoundaboutVariables')}
          </div>
        </div>
      )}
    </Form>
  )
}
