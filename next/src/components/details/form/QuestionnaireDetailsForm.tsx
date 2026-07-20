import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useEffect, useState } from 'react'

import type { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import { getSerieById } from '@/api/series'
import Tooltip from '@/components/ui/Tooltip'
import Checkbox from '@/components/ui/form/Checkbox'
import Field from '@/components/ui/form/Field'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import Label from '@/components/ui/form/Label'
import RadioGroup from '@/components/ui/form/RadioGroup'
import Select from '@/components/ui/form/Select'
import InfoIcon from '@/components/ui/icons/InfoIcon'
import {
  FlowLogics,
  FormulasLanguages,
  TargetModes,
} from '@/models/questionnaires'
import { SerieItem } from '@/models/series'

import { type FormValues, schema } from './schema'

type Props = {
  defaultValues?: Partial<FormValues>
  onSubmit: SubmitHandler<FormValues>
  submitLabel: string
  series: SerieItem[]
  readOnly?: boolean
}

export default function QuestionnaireDetailsForm({
  defaultValues = {
    name: '',
    title: '',
    targetModes: [],
    flowLogic: FlowLogics.Filter,
    formulasLanguage: FormulasLanguages.VTL,
    agency: 'fr.insee',
    serie: '',
  },
  onSubmit,
  submitLabel,
  series,
  readOnly = false,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(schema),
  })

  const selectedSerie = watch('serie')
  const selectedOperation = watch('operation')

  const [serieDetails, setSerieDetails] = useState<SerieDetailDTO | null>(null)

  useEffect(() => {
    if (!selectedSerie) {
      setSerieDetails(null)
      return
    }
    getSerieById(selectedSerie)
      .then(setSerieDetails)
      .catch(() => {
        setSerieDetails(null)
      })
  }, [selectedSerie])

  const seriesOptions: { label: string; value: string }[] = series.map(
    (s: SerieItem) => ({ label: s.label, value: s.id }),
  )

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data)
    reset(data)
  }

  const handleCancel = () => {
    navigate({
      to: '/questionnaires',
      ignoreBlocker: true,
    })
  }

  const handleSerieChange = (value: string) => {
    setValue('serie', value)
    setValue('operation', '')
  }

  const formFields = (
    <>
      <Controller
        name="name"
        control={control}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={t('details.id')}
            name={name}
            disabled
            touched={isTouched}
          >
            <Input disabled value={value} onValueChange={onChange} />
          </Field>
        )}
      />
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
            label={t('details.questionnaireTitle')}
            name={name}
            required
            touched={isTouched}
          >
            <Input
              autoFocus
              value={value}
              onValueChange={onChange}
              disabled={readOnly}
            />
          </Field>
        )}
      />
      <Controller
        name="serie"
        control={control}
        rules={{ required: true }}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={t('details.serie')}
            name={name}
            required
            touched={isTouched}
            disabled={readOnly}
          >
            <Select
              options={seriesOptions}
              value={value || undefined}
              disabled={readOnly}
              onChange={(v) => {
                const serieValue = v ?? ''
                onChange(serieValue)
                handleSerieChange(serieValue)
              }}
            />
            {serieDetails ? (
              <div className="ml-4 mt-3 text-sm border-l-2 border-gray-300 pl-3">
                {serieDetails.operations.length > 0 ? (
                  <>
                    <div>{t('details.operation')}</div>
                    <div className="mt-1">
                      <Select
                        options={serieDetails.operations.map((op) => ({
                          label: op.label,
                          value: op.id,
                        }))}
                        value={selectedOperation || undefined}
                        disabled={readOnly}
                        onChange={(v) => setValue('operation', v ?? '')}
                      />
                    </div>
                  </>
                ) : null}

                <div className="m-2 text-stone-500 italic">{`${t('details.altLabel')} : ${serieDetails.altLabel}`}</div>
              </div>
            ) : null}
          </Field>
        )}
      />
      <Controller
        name="agency"
        control={control}
        render={({
          field: { name, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={
              <div className="flex items-bottom gap-1">
                <i> {t('details.agency')}</i>

                <Tooltip
                  title={
                    <div className="flex flex-row">
                      <div>{t('details.agencyTooltip')}</div>
                      <a
                        href={t('details.agencyDetailLink')}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="text-blue-5">
                          {t('details.agencyDetailLink')}
                        </i>
                      </a>
                    </div>
                  }
                >
                  <InfoIcon
                    height="12"
                    width="12"
                    className="cursor-help"
                    role="img"
                    aria-label={`${t('details.agencyTooltip')} ${t('details.agencyDetailLink')}`}
                  />
                </Tooltip>
              </div>
            }
            name={name}
            touched={isTouched}
            disabled
          >
            <Input
              autoFocus
              value={'fr.insee'}
              onValueChange={onChange}
              disabled
            />
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
                checked={field.value?.includes(TargetModes.CAPI)}
                disabled={readOnly}
                onChange={(v) =>
                  field.onChange(
                    v
                      ? [...(field.value ?? []), TargetModes.CAPI]
                      : (field.value ?? []).filter(
                          (mode) => mode !== TargetModes.CAPI,
                        ),
                  )
                }
              />
              <Checkbox
                label={'CAWI'}
                checked={field.value?.includes(TargetModes.CAWI)}
                disabled={readOnly}
                onChange={(v) =>
                  field.onChange(
                    v
                      ? [...(field.value ?? []), TargetModes.CAWI]
                      : (field.value ?? []).filter(
                          (mode) => mode !== TargetModes.CAWI,
                        ),
                  )
                }
              />
              <Checkbox
                label={'CATI'}
                checked={field.value?.includes(TargetModes.CATI)}
                disabled={readOnly}
                onChange={(v) =>
                  field.onChange(
                    v
                      ? [...(field.value ?? []), TargetModes.CATI]
                      : (field.value ?? []).filter(
                          (mode) => mode !== TargetModes.CATI,
                        ),
                  )
                }
              />
              <Checkbox
                label={'PAPI'}
                checked={field.value?.includes(TargetModes.PAPI)}
                disabled={readOnly}
                onChange={(v) =>
                  field.onChange(
                    v
                      ? [...(field.value ?? []), TargetModes.PAPI]
                      : (field.value ?? []).filter(
                          (mode) => mode !== TargetModes.PAPI,
                        ),
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
              disabled={readOnly}
            >
              <RadioGroup
                options={[
                  { label: 'Filtre', value: FlowLogics.Filter },
                  { label: 'Redirection', value: FlowLogics.Redirection },
                ]}
                value={value}
                onBlur={onBlur}
                onValueChange={onChange}
                disabled={readOnly}
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
              disabled={readOnly}
            >
              <RadioGroup
                options={[
                  { label: 'VTL', value: FormulasLanguages.VTL },
                  { label: 'XPath', value: FormulasLanguages.XPath },
                ]}
                value={value}
                onBlur={onBlur}
                onValueChange={onChange}
                disabled={readOnly}
              />
            </Field>
          )}
        />
      </div>
    </>
  )

  if (readOnly) {
    return <div className="space-y-4">{formFields}</div>
  }

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      onCancel={handleCancel}
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
      validateLabel={submitLabel}
    >
      {formFields}
    </Form>
  )
}
