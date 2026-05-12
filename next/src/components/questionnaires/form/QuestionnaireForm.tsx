import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import Checkbox from '@/components/ui/form/Checkbox'
import Field from '@/components/ui/form/Field'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import Label from '@/components/ui/form/Label'
import RadioGroup from '@/components/ui/form/RadioGroup'
import {
  FlowLogics,
  FormulasLanguages,
  type Questionnaire,
  TargetModes,
} from '@/models/questionnaires'

import { type FormValues, schema } from './schema'
import { changeSetValue } from './utils/set'

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
      <Controller
        name="title"
        control={control}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={t('common.title')}
            name={name}
            required
            touched={isTouched}
          >
            <Input autoFocus value={value} onValueChange={onChange} />
          </Field>
        )}
      />
      <Controller
        name="targetModes"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Label required>{t('questionnaire.common.targetMode')}</Label>
            <div className="flex gap-x-4">
              <Checkbox
                label={'CAPI'}
                checked={field.value?.has(TargetModes.CAPI)}
                {...field}
                onChange={(v) =>
                  field.onChange(
                    changeSetValue(field.value, TargetModes.CAPI, v),
                  )
                }
              />
              <Checkbox
                label={'CAWI'}
                checked={field.value?.has(TargetModes.CAWI)}
                {...field}
                onChange={(v) =>
                  field.onChange(
                    changeSetValue(field.value, TargetModes.CAWI, v),
                  )
                }
              />
              <Checkbox
                label={'CATI'}
                checked={field.value?.has(TargetModes.CATI)}
                {...field}
                onChange={(v) =>
                  field.onChange(
                    changeSetValue(field.value, TargetModes.CATI, v),
                  )
                }
              />
              <Checkbox
                label={'PAPI'}
                checked={field.value?.has(TargetModes.PAPI)}
                {...field}
                onChange={(v) =>
                  field.onChange(
                    changeSetValue(field.value, TargetModes.PAPI, v),
                  )
                }
              />
            </div>
            {error ? (
              <div className="text-sm text-error ml-1">{error.message}</div>
            ) : null}
          </>
        )}
      />
      <div>
        <Controller
          name="flowLogic"
          control={control}
          rules={{ required: true }}
          render={({
            field: { name, value, onBlur, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Field
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={t('questionnaire.common.dynamicField')}
              name={name}
              required
              touched={isTouched}
            >
              <RadioGroup
                options={[
                  { label: 'Filtre', value: FlowLogics.Filter },
                  { label: 'Redirection', value: FlowLogics.Redirection },
                ]}
                value={value}
                onBlur={onBlur}
                onValueChange={onChange}
              />
            </Field>
          )}
        />
      </div>
      <div>
        <Controller
          name="formulasLanguage"
          control={control}
          rules={{ required: true }}
          render={({
            field: { name, value, onBlur, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Field
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={t('questionnaire.common.formulaField')}
              name={name}
              required
              touched={isTouched}
            >
              <RadioGroup
                options={[
                  { label: 'VTL', value: FormulasLanguages.VTL },
                  { label: 'XPath', value: FormulasLanguages.XPath },
                ]}
                value={value}
                onBlur={onBlur}
                onValueChange={onChange}
              />
            </Field>
          )}
        />
      </div>
    </Form>
  )
}
