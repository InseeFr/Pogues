import { type DefaultValues, type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { type DeleteButtonProps } from '@/components/ui/DeleteButton'
import ControlledField from '@/components/ui/form/ControlledField'
import ControlledVTLEditor from '@/components/ui/form/ControlledVTLEditor'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import RadioGroup from '@/components/ui/form/RadioGroup'
import Select from '@/components/ui/form/Select'
import { useFormCancel } from '@/hooks/form/useFormCancel'
import { useReactHookfForm } from '@/hooks/form/useReactHookfForm'
import type { InitialLoopMember } from '@/models/loops'
import type { Scopes } from '@/models/scopes'
import type { Variable } from '@/models/variables'

import { type FormInputValues, type FormValues, schema } from './schema'

type Props = {
  questionnaireId: string
  /** In an update case, initial loop value. */
  loop?: FormValues
  /** Function that will be called with form data when the user submits the form. */
  onSubmit: SubmitHandler<FormValues>
  /** Label to display on the submit button. */
  submitLabel?: string
  /** If provided, display a delete button (e.g. when editing a loop). */
  deleteButton?: DeleteButtonProps
  /** Available scopes with the mapping between id and name. */
  scopes: Scopes
  /**
   * Components that can be the initial member of the loop, each with the
   * components that can then be its final member.
   */
  loopMembers: InitialLoopMember[]
  /** List of variables used for auto-completion in VTL editors. */
  variables?: Variable[]
  /**
   * If provided, the loop comes from this older version of the questionnaire
   * and is displayed in readonly.
   */
  versionId?: string
}

/**
 * Create or edit a loop.
 *
 * A loop has a name and repeats a portion of the questionnaire (its members,
 * between an initial and a final member) either a fixed or a dynamic number
 * of times.
 */
export default function LoopForm({
  questionnaireId,
  loop = {
    name: '',
    isFixedLength: false,
    minimum: '',
    maximum: '',
    initialMember: '',
    finalMember: '',
  },
  onSubmit,
  submitLabel,
  deleteButton,
  scopes,
  loopMembers,
  variables = [],
  versionId,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const cancel = useFormCancel()

  // A loop of an older version of the questionnaire can only be displayed.
  const isReadonly = !!versionId

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
    setError,
    setValue,
    watch,
  } = useReactHookfForm<FormInputValues>({
    // Default value of the hidden fields, used if the user displays them. The
    // cast is needed since the form state holds fields of every options of the
    // schema at the same time.
    defaultValues: {
      isFixedLength: false,
      minimum: '',
      maximum: '',
      shouldSplitIterations: false,
      ...loop,
    } as DefaultValues<FormInputValues>,
    schema,
  })

  const basedOn = watch('basedOn')
  const isFixedLength = watch('isFixedLength')
  const shouldSplitIterations = watch('shouldSplitIterations')
  const initialMember = watch('initialMember')

  const finalMembers =
    loopMembers.find(({ id }) => id === initialMember)?.finalMembers ?? []

  const handleCancel = () => {
    if (versionId) {
      return cancel({
        to: '/questionnaire/$questionnaireId/version/$versionId',
        params: { questionnaireId, versionId },
      })
    }
    return cancel({
      to: '/questionnaire/$questionnaireId',
      params: { questionnaireId },
    })
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
      isDisabled={isReadonly}
      disabledReason={isReadonly ? t('history.questionnaireIsReadonly') : ''}
      validateLabel={submitLabel}
      deleteButton={deleteButton}
    >
      <ControlledField
        control={control}
        name="name"
        label={t('loop.form.name')}
        disabled={isReadonly}
        required
      >
        {(field) => (
          <Input
            disabled={isReadonly}
            value={field.value}
            onValueChange={field.onChange}
          />
        )}
      </ControlledField>
      <ControlledField
        control={control}
        name="basedOn"
        label={t('loop.form.basedOn')}
        disabled={isReadonly}
      >
        {(field) => (
          <div className="flex items-center gap-2 w-full">
            <Select<string>
              disabled={isReadonly}
              options={[
                { label: t('loop.form.basedOnPlaceholder'), value: '' },
                ...Array.from(scopes).map(([id, name]) => ({
                  label: name,
                  value: id,
                })),
              ]}
              value={field.value}
              onChange={field.onChange}
            />
          </div>
        )}
      </ControlledField>
      {basedOn ? (
        <ControlledVTLEditor
          control={control}
          name="filter"
          label={t('loop.form.filter')}
          disabled={isReadonly}
          setError={setError}
          suggestionsVariables={variables}
        />
      ) : (
        <>
          <ControlledField
            control={control}
            name="isFixedLength"
            label={t('loop.form.isFixedLength')}
            disabled={isReadonly}
            required
          >
            {(field) => (
              <RadioGroup
                disabled={isReadonly}
                options={[
                  { label: t('common.yes'), value: true },
                  { label: t('common.no'), value: false },
                ]}
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
              />
            )}
          </ControlledField>
          {/*
           * Both branches stay mounted at all times (toggled with `hidden`
           * instead of being conditionally rendered): unmounting a VTLEditor
           * while another one is still mounted crashes the underlying
           * Monaco/antlr-editor instances, which share global providers that
           * get disposed on unmount.
           * If you find a better solution, we take it !
           */}
          <div hidden={!isFixedLength} className="space-y-4">
            <ControlledVTLEditor
              control={control}
              name="size"
              label={t('loop.form.size')}
              disabled={isReadonly}
              required
              setError={setError}
              suggestionsVariables={variables}
            />
            <ControlledField
              control={control}
              name="shouldSplitIterations"
              label={t('loop.form.singlePage')}
              disabled={isReadonly}
              required
            >
              {(field) => (
                // The user is asked whether to display all occurrences on a
                // single page, which is the opposite of splitting them.
                <RadioGroup
                  disabled={isReadonly}
                  options={[
                    { label: t('common.yes'), value: false },
                    { label: t('common.no'), value: true },
                  ]}
                  value={field.value}
                  onBlur={field.onBlur}
                  onValueChange={field.onChange}
                />
              )}
            </ControlledField>
            {shouldSplitIterations ? (
              <p className="text-sm text-error">
                {t('loop.form.singlePageWarning')}
              </p>
            ) : null}
          </div>
          <div hidden={!!isFixedLength} className="space-y-4">
            <p className="text-sm text-error">{t('loop.form.minMaxWarning')}</p>
            <ControlledVTLEditor
              control={control}
              name="minimum"
              label={t('loop.form.minimum')}
              disabled={isReadonly}
              required
              setError={setError}
              suggestionsVariables={variables}
            />
            <ControlledVTLEditor
              control={control}
              name="maximum"
              label={t('loop.form.maximum')}
              disabled={isReadonly}
              required
              setError={setError}
              suggestionsVariables={variables}
            />
          </div>
        </>
      )}
      <ControlledField
        control={control}
        name="initialMember"
        label={t('loop.form.initialMember')}
        disabled={isReadonly}
        required
      >
        {(field) => (
          <Select<string>
            disabled={isReadonly}
            options={[
              { label: t('loop.form.initialMemberPlaceholder'), value: '' },
              ...loopMembers.map(({ id, name }) => ({
                label: name,
                value: id,
              })),
            ]}
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue)
              // The possible final members depend on the initial member.
              setValue('finalMember', '', {
                shouldDirty: true,
                shouldValidate: true,
              })
            }}
          />
        )}
      </ControlledField>
      <ControlledField
        control={control}
        name="finalMember"
        label={t('loop.form.finalMember')}
        disabled={isReadonly}
        required
      >
        {(field) => (
          <Select<string>
            options={[
              { label: t('loop.form.finalMemberPlaceholder'), value: '' },
              ...finalMembers.map(({ id, name }) => ({
                label: name,
                value: id,
              })),
            ]}
            value={field.value}
            onChange={field.onChange}
            disabled={isReadonly || !initialMember}
          />
        )}
      </ControlledField>
    </Form>
  )
}
