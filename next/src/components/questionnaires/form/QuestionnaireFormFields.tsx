import { type Control, Controller, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useEffect, useState } from 'react'

import type { SerieDetailDTO } from '@/api/models/questionnaireDetailsDTO'
import { getSerieById } from '@/api/series'
import ButtonIcon from '@/components/ui/ButtonIcon'
import Autocomplete from '@/components/ui/form/Autocomplete'
import ControlledField from '@/components/ui/form/ControlledField'
import Input from '@/components/ui/form/Input'
import SelectTargetMode from '@/components/ui/form/SelectTargetMode'
import DeleteIcon from '@/components/ui/icons/DeleteIcon'
import type { SerieItem } from '@/models/series'
import type { Stamp } from '@/models/stamps'

import type { FormValues } from './schema'

type Props = {
  control: Control<FormValues>
  onTitleBlur?: (title: string) => void
  readOnly?: boolean
  series?: SerieItem[]
  stamps?: Stamp[]
}

export default function QuestionnaireFormFields({
  control,
  onTitleBlur,
  readOnly = false,
  series = [],
  stamps = [],
}: Readonly<Props>) {
  const { t } = useTranslation()
  const selectedSerie = useWatch({ control, name: 'serie' })
  const [isSerieOpen, setIsSerieOpen] = useState(false)
  const [isStampOpen, setIsStampOpen] = useState(false)
  const [serieDetails, setSerieDetails] = useState<{
    serieId: string
    details: SerieDetailDTO
  } | null>(null)

  const seriesOptions = series.map((serie) => ({
    label: serie.label,
    value: serie.id,
  }))
  const stampsOptions = stamps
    .map((stamp) => ({ label: stamp.label, value: stamp.id }))
    .sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { numeric: true }),
    )

  useEffect(() => {
    if (!selectedSerie) {
      return
    }

    let isActive = true
    getSerieById(selectedSerie)
      .then((details) => {
        if (isActive) {
          setSerieDetails({ serieId: selectedSerie, details })
        }
      })
      .catch(() => {
        if (isActive) {
          setSerieDetails(null)
        }
      })

    return () => {
      isActive = false
    }
  }, [selectedSerie])

  return (
    <>
      <ControlledField
        control={control}
        name="title"
        label={t('questionnaire.form.questionnaireTitle')}
        required
      >
        {(field) => (
          <Input
            autoFocus
            value={field.value}
            onValueChange={field.onChange}
            disabled={readOnly}
            onBlur={() => {
              field.onBlur()
              onTitleBlur?.(field.value)
            }}
          />
        )}
      </ControlledField>
      <ControlledField
        control={control}
        name="name"
        label={t('questionnaire.form.questionnaireName')}
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
        label={t('questionnaire.form.serie')}
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
                  onChange={(serieValue = '') => field.onChange(serieValue)}
                  placeholder={t('questionnaire.form.seriesSearch')}
                />
              </div>
              {field.value && !readOnly ? (
                <ButtonIcon
                  Icon={DeleteIcon}
                  title={t('common.delete')}
                  onClick={() => {
                    field.onChange('')
                    setIsSerieOpen(false)
                  }}
                />
              ) : null}
            </div>
            {serieDetails && serieDetails.serieId === selectedSerie ? (
              <div className="ml-4 mt-3 text-sm border-l-2 border-gray-300 pl-3">
                <div className="m-2 text-stone-500 italic">{`${t('questionnaire.form.altLabel')} : ${serieDetails.details.altLabel ?? t('questionnaire.form.altLabelUndefined')}`}</div>
              </div>
            ) : null}
          </>
        )}
      </ControlledField>
      <ControlledField
        control={control}
        name="owner"
        label={t('questionnaire.form.stamp')}
        required
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
            placeholder={t('questionnaire.form.stampSearch')}
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
}
