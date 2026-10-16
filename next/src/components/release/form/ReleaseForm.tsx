import { Controller, type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import Tooltip from '@/components/ui/Tooltip'
import Checkbox from '@/components/ui/form/Checkbox'
import ControlledField from '@/components/ui/form/ControlledField'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import RadioGroup from '@/components/ui/form/RadioGroup'
import Select from '@/components/ui/form/Select'
import SelectTargetMode from '@/components/ui/form/SelectTargetMode'
import InfoIcon from '@/components/ui/icons/InfoIcon'
import WarningIcon from '@/components/ui/icons/WarningIcon.tsx'
import { useFormCancel } from '@/hooks/form/useFormCancel.ts'
import { useReactHookfForm } from '@/hooks/form/useReactHookfForm.ts'
import { TargetModes } from '@/models/questionnaires'

import { CONTEXTE_OPTIONS, NUMEROTATION_OPTIONS } from './consts.tsx'
import { type FormValues, schema } from './schema'

type Props = {
  questionnaireId: string
  seriesId?: string
  seriesLabel?: string
  targetModes: TargetModes[]
  onSubmit: SubmitHandler<FormValues>
  submitLabel: string
  isPublishDisabled: boolean
}

export default function ReleaseForm({
  questionnaireId,
  seriesId,
  seriesLabel,
  targetModes,
  onSubmit,
  submitLabel,
  isPublishDisabled,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const cancel = useFormCancel()

  const availableModes = targetModes.filter((mode) => mode !== TargetModes.PAPI)

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
    watch,
  } = useReactHookfForm<FormValues>({
    defaultValues: {
      releaseDescription: '',
      modes: [],
      context: 'HOUSEHOLD',
      overrideGenerationParameters: {
        responseTimeQuestion: true,
        questionNumberingMode: 'SEQUENCE',
      },
    },
    schema,
  })

  const contextValue = watch('context')
  const targetMode = watch('modes')

  const isSeriesMissing = !seriesId || !seriesLabel
  const isFormValid = isValid && !isSeriesMissing

  const guardedSubmit = handleSubmit((values, event) => {
    if (!isPublishDisabled) {
      onSubmit(values, event)
    }
  })

  return (
    <Form
      onSubmit={guardedSubmit}
      onCancel={() =>
        cancel({
          to: '/questionnaire/$questionnaireId/releases',
          params: { questionnaireId },
        })
      }
      isDirty={isDirty}
      isValid={isFormValid}
      isSubmitted={isSubmitted}
      isDisabled={isPublishDisabled}
      disabledReason={t('release.create.alreadyPublished')}
      validateLabel={submitLabel}
    >
      <div className="flex flex-row gap-1.5">
        <h3 className="text-base font-semibold">
          {t('release.form.seriesInfo')}
        </h3>
        {!seriesId && <WarningIcon className="text-error" />}
      </div>
      <div className="space-y-2 text-sm ">
        <p>
          <strong className="font-semibold">
            {t('release.form.series.id')} :{' '}
          </strong>
          {seriesId || (
            <>
              <strong className="text-error font-semibold">
                {t('release.form.series.missingId')}
              </strong>
              <Tooltip title={t('release.form.series.missingIdTooltip')}>
                <InfoIcon
                  height="12"
                  width="12"
                  className="cursor-help ml-1"
                  role="img"
                  aria-label={t('release.form.series.missingIdTooltip')}
                />
              </Tooltip>
            </>
          )}
        </p>
        {seriesId && (
          <p>
            <strong className="font-semibold">
              {t('release.form.series.label')} :{' '}
            </strong>
            {seriesLabel || (
              <strong className="text-error font-semibold">
                {t('release.form.series.missingLabel')}
              </strong>
            )}
          </p>
        )}
      </div>
      {seriesId && seriesLabel && (
        <div className="space-y-6 mt-6">
          <ControlledField
            control={control}
            name="releaseDescription"
            label={t('release.form.description.label')}
            description={t('release.form.description.example')}
            required
          >
            {(field) => (
              <Input
                placeholder={t('release.form.description.placeholder')}
                value={field.value}
                onValueChange={field.onChange}
                maxLength={249}
              />
            )}
          </ControlledField>

          <Controller
            name="modes"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <SelectTargetMode
                value={
                  new Set(
                    field.value.map(
                      (m) => TargetModes[m as keyof typeof TargetModes],
                    ),
                  )
                }
                onChange={(newValue) => {
                  const arr =
                    newValue instanceof Set ? Array.from(newValue) : newValue
                  field.onChange(
                    arr.map(
                      (m) =>
                        TargetModes[m as unknown as keyof typeof TargetModes],
                    ),
                  )
                }}
                multiple={true}
                availableModes={availableModes}
                error={error?.message}
              />
            )}
          />

          <ControlledField
            control={control}
            name="context"
            label={t('release.form.contexte.label')}
            required
            rules={{ required: true }}
          >
            {(field) => (
              <RadioGroup
                options={CONTEXTE_OPTIONS}
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
              />
            )}
          </ControlledField>

          {contextValue === 'BUSINESS' && targetMode.includes('CAWI') ? (
            <div className="border-l-2 border-gray-300 pl-4 space-y-4">
              <h3 className="text-base font-semibold ">
                {t('release.form.optionalParameters')}
              </h3>

              <div>
                <Controller
                  name="overrideGenerationParameters.responseTimeQuestion"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Checkbox
                        checked={value}
                        onChange={onChange}
                        label={t('release.form.pageTempsReponse.label')}
                      />
                      {!value ? (
                        <p className="text-orange-500 text-sm ml-7">
                          {t('release.form.pageTempsReponse.warning')}
                        </p>
                      ) : null}
                    </>
                  )}
                />
              </div>

              <div>
                <ControlledField
                  control={control}
                  name="overrideGenerationParameters.questionNumberingMode"
                  label={
                    <span className="font-normal">
                      {t('release.form.questionNumbering.label')}
                    </span>
                  }
                >
                  {(field) => (
                    <Select<string>
                      options={NUMEROTATION_OPTIONS}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                </ControlledField>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Form>
  )
}
