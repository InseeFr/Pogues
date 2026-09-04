import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useEffect, useState } from 'react'

import type { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import { getSerieById } from '@/api/series'
import ButtonIcon from '@/components/ui/ButtonIcon'
import Tooltip from '@/components/ui/Tooltip'
import Autocomplete from '@/components/ui/form/Autocomplete'
import Form from '@/components/ui/form/Form'
import FormField from '@/components/ui/form/FormField'
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
      <FormField
        control={control}
        name="title"
        label={t('details.questionnaireTitle')}
        required
        disabled={readOnly}
      >
        {({ field: { value, onChange } }) => (
          <Input
            autoFocus
            value={value}
            onValueChange={onChange}
            disabled={readOnly}
          />
        )}
      </FormField>
      <FormField
        control={control}
        name="name"
        label={t('details.questionnaireName')}
        required
        disabled={readOnly}
      >
        {({ field: { value, onChange } }) => (
          <Input value={value} onValueChange={onChange} disabled={readOnly} />
        )}
      </FormField>
      <FormField
        control={control}
        name="serie"
        label={t('details.serie')}
        disabled={readOnly}
      >
        {({ field: { value, onChange } }) => (
          <>
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
          </>
        )}
      </FormField>
      <FormField
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
        {({ field: { onChange } }) => (
          <Input value={'fr.insee'} onValueChange={onChange} disabled />
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
            disabled={readOnly}
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
          disabled={readOnly}
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
              disabled={readOnly}
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
          disabled={readOnly}
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
              disabled={readOnly}
            />
          )}
        </FormField>
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
