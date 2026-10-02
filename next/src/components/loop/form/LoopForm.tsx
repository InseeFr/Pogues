import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { t } from 'i18next'
import {
  Controller,
  type DefaultValues,
  type SubmitHandler,
  useForm,
} from 'react-hook-form'

import Field from '@/components/ui/form/Field'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import RadioGroup from '@/components/ui/form/RadioGroup'
import Select from '@/components/ui/form/Select'
import VTLEditor from '@/components/ui/form/VTLEditor'
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
  /** Available scopes with the mapping between id and name. */
  scopes: Scopes
  /**
   * Components that can be the initial member of the loop, each with the
   * components that can then be its final member.
   */
  loopMembers: InitialLoopMember[]
  /** List of variables used for auto-completion in VTL editors. */
  variables?: Variable[]
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
  scopes,
  loopMembers,
  variables = [],
}: Readonly<Props>) {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
    setError,
    setValue,
    watch,
  } = useForm<FormInputValues, unknown, FormValues>({
    mode: 'onChange',
    // Default value of the hidden fields, used if the user displays them. The
    // cast is needed since the form state holds fields of every options of the
    // schema at the same time.
    defaultValues: {
      shouldSplitIterations: false,
      ...loop,
    } as DefaultValues<FormInputValues>,
    resolver: zodResolver(schema),
  })

  const basedOn = watch('basedOn')
  const isFixedLength = watch('isFixedLength')
  const shouldSplitIterations = watch('shouldSplitIterations')
  const initialMember = watch('initialMember')

  const finalMembers =
    loopMembers.find(({ id }) => id === initialMember)?.finalMembers ?? []

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId',
      params: { questionnaireId },
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
            label={t('loop.form.name')}
            name={name}
            required
            touched={isTouched}
          >
            <Input value={value} onValueChange={onChange} />
          </Field>
        )}
      />
      <Controller
        name="basedOn"
        control={control}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={t('loop.form.basedOn')}
            name={name}
            touched={isTouched}
          >
            <div className="flex items-center gap-2 w-full">
              <Select<string>
                options={[
                  { label: t('loop.form.basedOnPlaceholder'), value: '' },
                  ...Array.from(scopes).map(([id, name]) => ({
                    label: name,
                    value: id,
                  })),
                ]}
                value={value}
                onChange={onChange}
              />
            </div>
          </Field>
        )}
      />
      {basedOn ? (
        <Controller
          name="filter"
          control={control}
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <VTLEditor
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={t('loop.form.filter')}
              name={name}
              onChange={onChange}
              setError={(error) => setError(name, error)}
              suggestionsVariables={variables}
              touched={isTouched}
              value={value}
            />
          )}
        />
      ) : (
        <>
          <Controller
            name="isFixedLength"
            control={control}
            render={({
              field: { name, value, onBlur, onChange },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <Field
                dirty={isDirty}
                error={error}
                invalid={invalid}
                label={t('loop.form.isFixedLength')}
                name={name}
                required
                touched={isTouched}
              >
                <RadioGroup
                  options={[
                    { label: t('common.yes'), value: true },
                    { label: t('common.no'), value: false },
                  ]}
                  value={value}
                  onBlur={onBlur}
                  onValueChange={onChange}
                />
              </Field>
            )}
          />
          {/*
           * Both branches stay mounted at all times (toggled with `hidden`
           * instead of being conditionally rendered): unmounting a VTLEditor
           * while another one is still mounted crashes the underlying
           * Monaco/antlr-editor instances, which share global providers that
           * get disposed on unmount.
           * If you find a better solution, we take it !
           */}
          <div hidden={!isFixedLength} className="space-y-4">
            <Controller
              name="size"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <VTLEditor
                  dirty={isDirty}
                  error={error}
                  invalid={invalid}
                  label={t('loop.form.size')}
                  name={name}
                  onChange={onChange}
                  required
                  setError={(error) => setError(name, error)}
                  suggestionsVariables={variables}
                  touched={isTouched}
                  value={value}
                />
              )}
            />
            <Controller
              name="shouldSplitIterations"
              control={control}
              render={({
                field: { name, value, onBlur, onChange },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <Field
                  dirty={isDirty}
                  error={error}
                  invalid={invalid}
                  label={t('loop.form.singlePage')}
                  name={name}
                  required
                  touched={isTouched}
                >
                  {/*
                   * The user is asked whether to display all occurrences on a
                   * single page, which is the opposite of splitting them.
                   */}
                  <RadioGroup
                    options={[
                      { label: t('common.yes'), value: false },
                      { label: t('common.no'), value: true },
                    ]}
                    value={value}
                    onBlur={onBlur}
                    onValueChange={onChange}
                  />
                </Field>
              )}
            />
            {shouldSplitIterations ? (
              <p className="text-sm text-error">
                {t('loop.form.singlePageWarning')}
              </p>
            ) : null}
          </div>
          <div hidden={!!isFixedLength} className="space-y-4">
            <p className="text-sm text-error">{t('loop.form.minMaxWarning')}</p>
            <Controller
              name="minimum"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <VTLEditor
                  dirty={isDirty}
                  error={error}
                  invalid={invalid}
                  label={t('loop.form.minimum')}
                  name={name}
                  onChange={onChange}
                  required
                  setError={(error) => setError(name, error)}
                  suggestionsVariables={variables}
                  touched={isTouched}
                  value={value}
                />
              )}
            />
            <Controller
              name="maximum"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <VTLEditor
                  dirty={isDirty}
                  error={error}
                  invalid={invalid}
                  label={t('loop.form.maximum')}
                  name={name}
                  onChange={onChange}
                  required
                  setError={(error) => setError(name, error)}
                  suggestionsVariables={variables}
                  touched={isTouched}
                  value={value}
                />
              )}
            />
            <Controller
              name="addButtonLabel"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <Field
                  dirty={isDirty}
                  error={error}
                  invalid={invalid}
                  label={t('loop.form.addButtonLabel')}
                  name={name}
                  touched={isTouched}
                >
                  <Input value={value} onValueChange={onChange} />
                </Field>
              )}
            />
          </div>
        </>
      )}
      <Controller
        name="initialMember"
        control={control}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={t('loop.form.initialMember')}
            name={name}
            required
            touched={isTouched}
          >
            <Select<string>
              options={[
                { label: t('loop.form.initialMemberPlaceholder'), value: '' },
                ...loopMembers.map(({ id, name }) => ({
                  label: name,
                  value: id,
                })),
              ]}
              value={value}
              onChange={(newValue) => {
                onChange(newValue)
                // The possible final members depend on the initial member.
                setValue('finalMember', '', {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }}
            />
          </Field>
        )}
      />
      <Controller
        name="finalMember"
        control={control}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={t('loop.form.finalMember')}
            name={name}
            required
            touched={isTouched}
          >
            <Select<string>
              options={[
                { label: t('loop.form.finalMemberPlaceholder'), value: '' },
                ...finalMembers.map(({ id, name }) => ({
                  label: name,
                  value: id,
                })),
              ]}
              value={value}
              onChange={onChange}
              disabled={!initialMember}
            />
          </Field>
        )}
      />
    </Form>
  )
}
