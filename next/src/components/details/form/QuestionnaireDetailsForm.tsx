import { Controller, type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useEffect, useRef, useState } from 'react'

import type { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import { getSerieById } from '@/api/series'
import ButtonIcon from '@/components/ui/ButtonIcon'
import Tooltip from '@/components/ui/Tooltip'
import Autocomplete from '@/components/ui/form/Autocomplete'
import ControlledField from '@/components/ui/form/ControlledField'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import SelectTargetMode from '@/components/ui/form/SelectTargetMode'
import DeleteIcon from '@/components/ui/icons/DeleteIcon'
import InfoIcon from '@/components/ui/icons/InfoIcon'
import { useReactHookfForm } from '@/hooks/form/useReactHookfForm'
import { SerieItem } from '@/models/series'
import { Stamp } from '@/models/stamps'

import { type FormValues, schema } from './schema'

type Props = {
  defaultValues?: Partial<FormValues>
  onSubmit: SubmitHandler<FormValues>
  submitLabel: string
  series?: SerieItem[]
  stamps?: Stamp[]
  readOnly?: boolean
}

export default function QuestionnaireDetailsForm({
  defaultValues = {
    name: '',
    title: '',
    targetModes: [],
    agency: 'fr.insee',
    owner: '',
    serie: '',
  },
  onSubmit,
  submitLabel,
  series,
  stamps,
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
    trigger,
  } = useReactHookfForm<FormValues>({
    defaultValues,
    schema,
  })

  useEffect(() => {
    if (readOnly) {
      return
    }
    trigger()
  }, [readOnly, trigger])

  //  Did that to force refresh the form when quickly go back to the form after validation
  //  (due to multiples request made at the same time when opening the form)
  const previousDefaultValuesRef = useRef(JSON.stringify(defaultValues))

  useEffect(() => {
    const nextKey = JSON.stringify(defaultValues)
    if (nextKey === previousDefaultValuesRef.current) {
      return
    }
    previousDefaultValuesRef.current = nextKey
    reset(defaultValues)
  }, [defaultValues, reset])

  const selectedSerie = watch('serie')

  const [isSerieOpen, setIsSerieOpen] = useState(false)
  const [isStampOpen, setIsStampOpen] = useState(false)
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

  const stampsOptions: { label: string; value: string }[] = [
    ...(stamps?.map((s) => ({ label: s.label, value: s.id })) || []),
  ].sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }))

  const handleFormSubmit = (data: FormValues) => {
    const submittedData = { ...data, name: data.name.toUpperCase() }
    onSubmit(submittedData)
    reset(submittedData)
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
      <ControlledField
        control={control}
        name="title"
        label={t('details.questionnaireTitle')}
        required
      >
        {(field) => (
          <Input
            autoFocus
            value={field.value}
            onValueChange={field.onChange}
            disabled={readOnly}
          />
        )}
      </ControlledField>
      <ControlledField
        control={control}
        name="name"
        label={t('details.questionnaireName')}
        required
      >
        {(field) => (
          <Input
            value={field.value}
            onValueChange={field.onChange}
            disabled={readOnly}
          />
        )}
      </ControlledField>
      <ControlledField
        control={control}
        name="serie"
        label={t('details.serie')}
        disabled={readOnly}
      >
        {(field) => (
          <>
            <div className="flex items-center gap-1">
              <div className="flex-1">
                <Autocomplete
                  options={seriesOptions}
                  value={field.value || undefined}
                  disabled={readOnly}
                  open={isSerieOpen}
                  onOpenChange={setIsSerieOpen}
                  onChange={(serieValue = '') => {
                    field.onChange(serieValue)
                    handleSerieChange(serieValue)
                  }}
                  placeholder={t('details.seriesSearch')}
                />
              </div>
              {field.value ? (
                <ButtonIcon
                  Icon={DeleteIcon}
                  title={t('common.delete')}
                  onClick={() => {
                    field.onChange('')
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
          </>
        )}
      </ControlledField>
      <ControlledField
        control={control}
        name="agency"
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
        disabled
      >
        {(field) => (
          <Input value={'fr.insee'} onValueChange={field.onChange} disabled />
        )}
      </ControlledField>
      <ControlledField
        control={control}
        name="owner"
        label={t('details.stamp')}
        disabled={readOnly}
      >
        {(field) => (
          <Autocomplete
            options={stampsOptions}
            value={field.value || undefined}
            disabled={readOnly}
            open={isStampOpen}
            onOpenChange={setIsStampOpen}
            onChange={field.onChange}
            placeholder={t('details.stampSearch')}
          />
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
            disabled={readOnly}
            error={error?.message}
          />
        )}
      />
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
      ariaLabel="questionnaire-details-form"
    >
      {formFields}
    </Form>
  )
}
