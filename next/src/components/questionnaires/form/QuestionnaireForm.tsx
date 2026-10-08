import { Controller, type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import ControlledField from '@/components/ui/form/ControlledField'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import RadioGroup from '@/components/ui/form/RadioGroup'
import SelectTargetMode from '@/components/ui/form/SelectTargetMode'
import { useFormCancel } from '@/hooks/form/useFormCancel'
import { useReactHookfForm } from '@/hooks/form/useReactHookfForm'
import {
  FlowLogics,
  FormulasLanguages,
  type Questionnaire,
} from '@/models/questionnaires'

import { type FormValues, schema } from './schema'

type Props = {
  /** In an update case, initial questionnaire value. */
  questionnaire?: Omit<Omit<Questionnaire, 'id'>, 'scopes'>
  /** Function that will be called with form data when the user submit the form. */
  onSubmit: SubmitHandler<FormValues>
  /** Label to display on the submit button */
  submitLabel: string
}

/**
 * Create or edit a questionnaire.
 *
 * A questionnaire has a title, target modes, a flow logic and a language
 * formula.
 *
 * {@link Questionnaire}
 */
export default function QuestionnaireForm({
  questionnaire = {
    title: '',
    targetModes: new Set(),
    flowLogic: FlowLogics.Filter,
    formulasLanguage: FormulasLanguages.VTL,
  },
  onSubmit,
  submitLabel,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const cancel = useFormCancel()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
  } = useReactHookfForm<FormValues>({
    defaultValues: questionnaire,
    schema,
  })

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => cancel({ to: '/questionnaires' })}
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
      validateLabel={submitLabel}
    >
      <ControlledField
        control={control}
        name="title"
        label={t('common.title')}
        required
      >
        {(field) => (
          <Input autoFocus value={field.value} onValueChange={field.onChange} />
        )}
      </ControlledField>
      <Controller
        name="targetModes"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <SelectTargetMode
            value={field.value}
            onChange={field.onChange}
            multiple
            error={error?.message}
          />
        )}
      />
      <div>
        <ControlledField
          control={control}
          name="flowLogic"
          label={t('questionnaire.common.dynamicField')}
          required
          rules={{ required: true }}
        >
          {(field) => (
            <RadioGroup
              options={[
                { label: 'Filtre', value: FlowLogics.Filter },
                { label: 'Redirection', value: FlowLogics.Redirection },
              ]}
              value={field.value}
              onBlur={field.onBlur}
              onValueChange={field.onChange}
            />
          )}
        </ControlledField>
      </div>
      <div>
        <ControlledField
          control={control}
          name="formulasLanguage"
          label={t('questionnaire.common.formulaField')}
          required
          rules={{ required: true }}
        >
          {(field) => (
            <RadioGroup
              options={[
                { label: 'VTL', value: FormulasLanguages.VTL },
                { label: 'XPath', value: FormulasLanguages.XPath },
              ]}
              value={field.value}
              onBlur={field.onBlur}
              onValueChange={field.onChange}
            />
          )}
        </ControlledField>
      </div>
    </Form>
  )
}
