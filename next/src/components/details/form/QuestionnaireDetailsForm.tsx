import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useEffect, useState } from 'react'

import type { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import { getSerieById } from '@/api/series'
import ButtonIcon from '@/components/ui/ButtonIcon'
import Tooltip from '@/components/ui/Tooltip'
import Autocomplete from '@/components/ui/form/Autocomplete'
import Field from '@/components/ui/form/Field'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import RadioGroup from '@/components/ui/form/RadioGroup'
import SelectTargetMode from '@/components/ui/form/SelectTargetMode'
import DeleteIcon from '@/components/ui/icons/DeleteIcon'
import InfoIcon from '@/components/ui/icons/InfoIcon'
import { FlowLogics, FormulasLanguages } from '@/models/questionnaires'
import { SerieItem } from '@/models/series'

import { type FormValues, schema } from './schema'

type Props = {
  defaultValues?: Partial<FormValues>
  onSubmit: SubmitHandler<FormValues>
  submitLabel: string
  series?: SerieItem[]
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

  const [isSerieOpen, setIsSerieOpen] = useState(false)
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

  const seriesOptions: { label: string; value: string }[] = (series ?? []).map(
    (s: SerieItem) => ({ label: s.label, value: s.id }),
  )

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data)
    reset(data)
  }

  const handleCancel = () => {
    reset()
  }

  const handleSerieChange = (value: string) => {
    setValue('serie', value)
    setValue('operation', '')
  }

  const formFields = (
    <>
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
            label={
              <div className="flex items-bottom gap-1">
                <i> {t('details.agency')}</i>

                <Tooltip title={<div>{t('details.form.nameHintLabel')}</div>}>
                  <InfoIcon
                    height="12"
                    width="12"
                    className="cursor-help"
                    role="img"
                    aria-label={`${t('details.form.nameHintLabel')}`}
                  />
                </Tooltip>
              </div>
            }
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
            touched={isTouched}
            disabled={readOnly}
          >
            <div className="flex items-center gap-1">
              <div className="flex-1">
                <Autocomplete
                  options={seriesOptions}
                  value={value || undefined}
                  disabled={readOnly}
                  open={isSerieOpen}
                  onOpenChange={setIsSerieOpen}
                  onChange={(serieValue = '') => {
                    onChange(serieValue)
                    handleSerieChange(serieValue)
                  }}
                />
              </div>
              {value ? (
                <ButtonIcon
                  Icon={DeleteIcon}
                  title={t('common.delete')}
                  onClick={() => {
                    onChange('')
                    handleSerieChange('')
                    setIsSerieOpen(false)
                  }}
                />
              ) : null}
            </div>
            {serieDetails ? (
              <div className="ml-4 mt-3 text-sm border-l-2 border-gray-300 pl-3">
                <div className="m-2 text-stone-500 italic">{`${t('details.altLabel')} : ${serieDetails.altLabel ?? t('details.altLabelUndefined')}`}</div>
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
          <SelectTargetMode
            value={field.value}
            onChange={field.onChange}
            multiple
            disabled={readOnly}
            error={error?.message}
          />
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
