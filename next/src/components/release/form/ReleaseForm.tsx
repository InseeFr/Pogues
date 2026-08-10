import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import Tooltip from '@/components/ui/Tooltip'
import Checkbox from '@/components/ui/form/Checkbox'
import Field from '@/components/ui/form/Field'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import RadioGroup from '@/components/ui/form/RadioGroup'
import Select from '@/components/ui/form/Select'
import SelectTargetMode from '@/components/ui/form/SelectTargetMode'
import InfoIcon from '@/components/ui/icons/InfoIcon'
import { TargetModes } from '@/models/questionnaires'

import { CONTEXTE_OPTIONS, NUMEROTATION_OPTIONS } from './consts.tsx'
import { type FormValues, schema } from './schema'

const RELEASE_TARGET_MODES = [
  TargetModes.CAWI,
  TargetModes.CAPI,
  TargetModes.CATI,
]

type Props = {
  questionnaireId: string
  seriesId?: string
  seriesLabel?: string
  targetModes: TargetModes[]
  onSubmit: SubmitHandler<FormValues>
  submitLabel: string
}

export default function ReleaseForm({
  questionnaireId,
  seriesId,
  seriesLabel,
  onSubmit,
  submitLabel,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      releaseDescription: '',
      modes: ['CAWI'],
      context: 'HOUSEHOLD',
      overrideGenerationParameters: {
        responseTimeQuestion: true,
        questionNumberingMode: 'SEQUENCE',
      },
    },
    resolver: zodResolver(schema),
  })

  const contextValue = watch('context')
  const targetMode = watch('modes')

  const isSeriesMissing = !seriesId || !seriesLabel
  const isFormValid = isValid && !isSeriesMissing

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/releases',
      params: { questionnaireId },
      ignoreBlocker: true,
    })
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      isDirty={isDirty}
      isValid={isFormValid}
      isSubmitted={isSubmitted}
      validateLabel={submitLabel}
    >
      <p className="text-sm text-gray-600 mb-6">
        {t('release.form.introduction')}
      </p>

      <h3 className="text-base font-semibold mb-3">
        {t('release.form.seriesInfo')}
      </h3>
      <div className="space-y-2 text-sm ">
        <p>
          <b className="text-gray-500 font-normal">
            {t('release.form.series.id')} :{' '}
          </b>
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
        <p>
          <b className="text-gray-500 font-normal">
            {t('release.form.series.label')} :{' '}
          </b>
          {seriesLabel || (
            <>
              <strong className="text-error font-semibold">
                {t('release.form.series.missingLabel')}
              </strong>
              <Tooltip title={t('release.form.series.missingLabelTooltip')}>
                <InfoIcon
                  height="12"
                  width="12"
                  className="cursor-help ml-1 bg-color-error"
                  role="img"
                  aria-label={t('release.form.series.missingLabelTooltip')}
                />
              </Tooltip>
            </>
          )}
        </p>
      </div>

      <div className="space-y-6 mt-6">
        <Controller
          name="releaseDescription"
          control={control}
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Field
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={t('release.form.description.label')}
              name={name}
              required
              touched={isTouched}
              description={t('release.form.description.example')}
            >
              <Input
                placeholder={t('release.form.description.placeholder')}
                value={value}
                onValueChange={onChange}
                maxLength={249}
              />
            </Field>
          )}
        />

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
              availableModes={RELEASE_TARGET_MODES}
              error={error?.message}
            />
          )}
        />

        <Controller
          name="context"
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
              label={t('release.form.contexte.label')}
              name={name}
              required
              touched={isTouched}
            >
              <RadioGroup
                options={CONTEXTE_OPTIONS}
                value={value}
                onBlur={onBlur}
                onValueChange={onChange}
              />
            </Field>
          )}
        />

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
              <Controller
                name="overrideGenerationParameters.questionNumberingMode"
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
                      <span className="font-normal">
                        {t('release.form.questionNumbering.label')}
                      </span>
                    }
                    name={name}
                    touched={isTouched}
                  >
                    <Select<string>
                      options={NUMEROTATION_OPTIONS}
                      value={value}
                      onChange={onChange}
                    />
                  </Field>
                )}
              />
            </div>
          </div>
        ) : null}
      </div>
    </Form>
  )
}
