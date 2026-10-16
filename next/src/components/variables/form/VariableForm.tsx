import { type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import ControlledField from '@/components/ui/form/ControlledField'
import ControlledVTLEditor from '@/components/ui/form/ControlledVTLEditor'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/form/Input'
import RadioGroup from '@/components/ui/form/RadioGroup'
import Select from '@/components/ui/form/Select'
import Switch from '@/components/ui/form/Switch'
import { useFormCancel } from '@/hooks/form/useFormCancel'
import { useReactHookfForm } from '@/hooks/form/useReactHookfForm'
import { DatatypeType } from '@/models/datatype'
import { type Variable, VariableType } from '@/models/variables'

import VariableDatatypeFields from './VariableDatatypeFields'
import { datatypeOptions } from './consts'
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
  const { t } = useTranslation()
  const cancel = useFormCancel()

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
    setError,
    watch,
  } = useReactHookfForm<FormValues>({
    defaultValues: variable,
    schema,
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

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() =>
        cancel({
          to: '/questionnaire/$questionnaireId/variables',
          params: { questionnaireId },
        })
      }
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
      validateLabel={submitLabel}
    >
      <div>
        <ControlledField
          control={control}
          name="type"
          label={t('variable.type.label')}
          required
          rules={{ required: true }}
        >
          {(field) => (
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
              value={field.value}
              onBlur={field.onBlur}
              onValueChange={field.onChange}
            />
          )}
        </ControlledField>
      </div>
      {selectedType === VariableType.External ? (
        <ControlledField
          control={control}
          name="isDeletedOnReset"
          label={t('variable.isDeletedOnReset')}
        >
          {(field) => (
            <Switch
              checked={field.value}
              inputRef={field.ref}
              onBlur={field.onBlur}
              onCheckedChange={field.onChange}
            />
          )}
        </ControlledField>
      ) : null}
      <ControlledField
        control={control}
        name="name"
        label={t('variable.name')}
        required
      >
        {(field) => (
          <Input
            placeholder={t('variable.form.name.placeholder')}
            value={field.value}
            onValueChange={(value) => field.onChange(convertToValidName(value))}
          />
        )}
      </ControlledField>
      <ControlledField
        control={control}
        name="description"
        label={t('variable.description')}
        required
      >
        {(field) => (
          <Input value={field.value} onValueChange={field.onChange} />
        )}
      </ControlledField>
      {selectedType === VariableType.Calculated ? (
        <ControlledVTLEditor
          control={control}
          name="formula"
          label={t('variable.formula')}
          required
          setError={setError}
          suggestionsVariables={variables}
        />
      ) : null}
      <ControlledField
        control={control}
        name="scope"
        label={t('variable.scope')}
        required
        rules={{ required: true }}
      >
        {(field) => (
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
            value={field.value}
            onChange={field.onChange}
          />
        )}
      </ControlledField>
      <VariableDatatypeFields
        control={control}
        datatypeTypeNameOptions={datatypeTypeNameOptions}
        isDatatypeTypeNameDisabled={isDatatypeTypeNameDisabled}
        selectedTypeName={selectedTypeName}
      />
    </Form>
  )
}
