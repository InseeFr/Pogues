import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import Form from '@/components/ui/form/Form'
import FormField from '@/components/ui/form/FormField'
import Input from '@/components/ui/form/Input'
import RadioGroup from '@/components/ui/form/RadioGroup'
import {
  FlowLogics,
  FormulasLanguages,
  type Questionnaire,
} from '@/models/questionnaires'

import SelectTargetMode from '../../ui/form/SelectTargetMode'
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
 * Create or edit a codes list.
 *
 * A code list has a label and codes (defined by a label and value).
 *
 * A code can have subcodes.
 *
 * {@link CodesList}
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
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: questionnaire,
    resolver: zodResolver(schema),
  })

  const handleCancel = () => {
    navigate({
      to: '/questionnaires',
      ignoreBlocker: true,
    })
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
      validateLabel={submitLabel}
    >
      <FormField
        control={control}
        name="title"
        label={t('common.title')}
        required
      >
        {({ field: { value, onChange } }) => (
          <Input autoFocus value={value} onValueChange={onChange} />
        )}
      </FormField>

      <FormField
        control={control}
        name="targetModes"
        rules={{ required: true }}
        noField
      >
        {({ field, fieldState: { error } }) => (
          <SelectTargetMode
            value={field.value}
            onChange={field.onChange}
            multiple
            error={error?.message}
          />
        )}
      </FormField>

      <div>
        <FormField
          control={control}
          name="flowLogic"
          label={t('questionnaire.common.dynamicField')}
          required
          rules={{ required: true }}
        >
          {({ field: { value, onBlur, onChange } }) => (
            <RadioGroup
              options={[
                { label: 'Filtre', value: FlowLogics.Filter },
                { label: 'Redirection', value: FlowLogics.Redirection },
              ]}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            />
          )}
        </FormField>
      </div>

      <div>
        <FormField
          control={control}
          name="formulasLanguage"
          label={t('questionnaire.common.formulaField')}
          required
          rules={{ required: true }}
        >
          {({ field: { value, onBlur, onChange } }) => (
            <RadioGroup
              options={[
                { label: 'VTL', value: FormulasLanguages.VTL },
                { label: 'XPath', value: FormulasLanguages.XPath },
              ]}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            />
          )}
        </FormField>
      </div>
    </Form>
  )
}
