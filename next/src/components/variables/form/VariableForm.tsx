import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { t } from 'i18next'
import { type SubmitHandler, useForm } from 'react-hook-form'

import Form from '@/components/ui/form/Form'
import FormField from '@/components/ui/form/FormField'
import Input from '@/components/ui/form/Input'
import NumberField from '@/components/ui/form/NumberField'
import RadioGroup from '@/components/ui/form/RadioGroup'
import Select from '@/components/ui/form/Select'
import Switch from '@/components/ui/form/Switch'
import VTLEditor from '@/components/ui/form/VTLEditor'
import { DatatypeType, DateFormat } from '@/models/datatype'
import { type Variable, VariableType } from '@/models/variables'

import { datatypeOptions, dateFormatOptions } from './consts'
import { type FormValues, schema } from './schema'
import { convertToValidName } from './utils/name'

type Props = {
  questionnaireId: string
  /** In an update case, initial questionnaire value. */
  variable?: Omit<Variable, 'id'>
  /** Function that will be called with form data when the user submit the form. */
  onSubmit: SubmitHandler<FormValues>
  /** Label to display on the submit button */
  submitLabel: string
  /** Available scopes with the mapping between id and name. */
  scopes: Map<string, string>
  /** List of variables used for auto-completion in VTL editor. */
  variables?: Variable[]
}

/**
 * Create or edit a variable.
 *
 * A variable has a name, a description, a scope (defaults to whole
 * questionnaire), a type, a datatype and its related informations, and may have
 * a formula if it is of type calculated.
 *
 * @see {@link Variable}
 */
export default function VariableForm({
  questionnaireId,
  variable = {
    name: '',
    description: '',
    scope: '',
    datatype: { typeName: DatatypeType.Text, maxLength: 249 },
    type: VariableType.External,
  },
  onSubmit,
  submitLabel,
  scopes,
  variables = [],
}: Readonly<Props>) {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
    setError,
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: variable,
    resolver: zodResolver(schema),
  })

  const selectedType = watch('type')
  const selectedTypeName = watch('datatype.typeName')

  const isDatatypeTypeNameDisabled =
    selectedType === VariableType.External &&
    variable.datatype.typeName === DatatypeType.Text

  const datatypeTypeNameOptions = (() => {
    // For External variable, enable only current saved option and 'Text'
    if (selectedType === VariableType.External) {
      return datatypeOptions.filter(
        ({ value }) =>
          value === DatatypeType.Text || value === variable.datatype.typeName,
      )
    }
    return datatypeOptions
  })()

  /** Ignore dirty state and return to the variables page. */
  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/variables',
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
      <div>
        <FormField
          control={control}
          name="type"
          label={t('variable.type.label')}
          required
          rules={{ required: true }}
        >
          {({ field: { value, onBlur, onChange } }) => (
            <RadioGroup
              options={[
                {
                  label: t('variable.type.external'),
                  value: VariableType.External,
                },
                {
                  label: t('variable.type.calculated'),
                  value: VariableType.Calculated,
                },
              ]}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            />
          )}
        </FormField>
      </div>

      {selectedType === VariableType.External ? (
        <FormField
          control={control}
          name="isDeletedOnReset"
          label={t('variable.isDeletedOnReset')}
        >
          {({ field: { ref, value, onBlur, onChange } }) => (
            <Switch
              checked={value}
              inputRef={ref}
              onBlur={onBlur}
              onCheckedChange={onChange}
            />
          )}
        </FormField>
      ) : null}

      <FormField
        control={control}
        name="name"
        label={t('variable.name')}
        required
      >
        {({ field: { value, onChange } }) => (
          <Input
            placeholder={t('variable.form.name.placeholder')}
            value={value}
            onValueChange={(v) => onChange(convertToValidName(v))}
          />
        )}
      </FormField>

      <FormField
        control={control}
        name="description"
        label={t('variable.description')}
        required
      >
        {({ field: { value, onChange } }) => (
          <Input value={value} onValueChange={onChange} />
        )}
      </FormField>

      {selectedType === VariableType.Calculated ? (
        <FormField
          control={control}
          name="formula"
          rules={{ required: true }}
          noField
        >
          {({
            field: { name, value, onChange },
            fieldState: { isDirty, error, invalid, isTouched },
          }) => (
            <VTLEditor
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={t('variable.formula')}
              name={name}
              onChange={onChange}
              required
              setError={(error) => setError(name, error)}
              suggestionsVariables={variables}
              touched={isTouched}
              value={value}
            />
          )}
        </FormField>
      ) : null}

      <FormField
        control={control}
        name="scope"
        label={t('variable.scope')}
        required
        rules={{ required: true }}
      >
        {({ field: { value, onChange } }) => (
          <Select<string>
            options={[
              { label: t('common.questionnaire'), value: '' },
              ...Array.from(scopes ?? new Map<string, string>()).map(
                ([id, name]) => ({
                  label: name,
                  value: id,
                }),
              ),
            ]}
            value={value}
            onChange={onChange}
          />
        )}
      </FormField>

      <FormField
        control={control}
        name="datatype.typeName"
        label={t('variable.datatype.label')}
        required
        rules={{ required: true }}
      >
        {({ field: { value, onChange } }) => (
          <Select<DatatypeType>
            options={datatypeTypeNameOptions}
            value={value}
            onChange={onChange}
            disabled={isDatatypeTypeNameDisabled}
          />
        )}
      </FormField>

      {selectedTypeName === DatatypeType.Date ? (
        <FormField
          control={control}
          name="datatype.format"
          label={t('variable.format')}
          required
          rules={{ required: true }}
        >
          {({ field: { value, onChange } }) => (
            <Select<DateFormat>
              options={dateFormatOptions}
              value={value as DateFormat | undefined}
              onChange={onChange}
            />
          )}
        </FormField>
      ) : null}

      {selectedTypeName === DatatypeType.Numeric ? (
        <>
          <FormField
            control={control}
            name="datatype.minimum"
            label={t('variable.minimum')}
            required
            rules={{ required: true }}
          >
            {({ field: { ref, value, onChange } }) => (
              <NumberField
                value={value as number | undefined}
                inputRef={ref}
                onValueChange={onChange}
              />
            )}
          </FormField>

          <FormField
            control={control}
            name="datatype.maximum"
            label={t('variable.maximum')}
            required
            rules={{ required: true }}
          >
            {({ field: { ref, value, onChange } }) => (
              <NumberField
                value={value as number | undefined}
                inputRef={ref}
                onValueChange={onChange}
              />
            )}
          </FormField>

          <FormField
            control={control}
            name="datatype.decimals"
            defaultValue={0}
            label={t('variable.precision')}
          >
            {({ field: { ref, value, onChange } }) => (
              <NumberField
                value={value}
                inputRef={ref}
                onValueChange={onChange}
              />
            )}
          </FormField>
        </>
      ) : null}

      {selectedTypeName === DatatypeType.Text ? (
        <FormField
          control={control}
          name="datatype.maxLength"
          defaultValue={249}
          label={t('variable.maxLength')}
          required
        >
          {({ field: { ref, value, onChange } }) => (
            <NumberField
              value={value}
              inputRef={ref}
              onValueChange={onChange}
            />
          )}
        </FormField>
      ) : null}
    </Form>
  )
}
