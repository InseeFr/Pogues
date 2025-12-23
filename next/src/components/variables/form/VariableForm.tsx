import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { t } from 'i18next';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import Field from '@/components/ui/form/Field';
import Form from '@/components/ui/form/Form';
import Input from '@/components/ui/form/Input';
import NumberField from '@/components/ui/form/NumberField';
import RadioGroup from '@/components/ui/form/RadioGroup';
import Select from '@/components/ui/form/Select';
import Switch from '@/components/ui/form/Switch';
import VTLEditor from '@/components/ui/form/VTLEditor';
import { DatatypeType, DateFormat } from '@/models/datatype';
import { type Variable, VariableType } from '@/models/variables';

import { datatypeOptions, dateFormatOptions } from './consts';
import { type FormValues, schema } from './schema';
import { convertToValidName } from './utils/name';

type Props = {
  questionnaireId: string;
  /** In an update case, initial questionnaire value. */
  variable?: Omit<Variable, 'id'>;
  /** Function that will be called with form data when the user submit the form. */
  onSubmit: SubmitHandler<FormValues>;
  /** Label to display on the submit button */
  submitLabel: string;
  /** Available scopes with the mapping between id and name. */
  scopes: Map<string, string>;
  /** List of variables used for auto-completion in VTL editor. */
  variables?: Variable[];
};

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
  const navigate = useNavigate();

  const {
    clearErrors,
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
    setError,
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: variable,
    resolver: zodResolver(schema),
  });

  const selectedType = watch('type');
  const selectedTypeName = watch('datatype.typeName');

  /** Ignore dirty state and return to the variables page. */
  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/variables',
      params: { questionnaireId },
      ignoreBlocker: true,
    });
  };

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
        <Controller
          name="type"
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
              label={t('variable.type.label')}
              name={name}
              required
              touched={isTouched}
            >
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
            </Field>
          )}
        />
      </div>
      {selectedType === VariableType.External ? (
        <Controller
          name="isDeletedOnReset"
          control={control}
          render={({
            field: { ref, name, value, onBlur, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Field
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={t('variable.isDeletedOnReset')}
              name={name}
              touched={isTouched}
            >
              <Switch
                checked={value}
                inputRef={ref}
                onBlur={onBlur}
                onCheckedChange={onChange}
              />
            </Field>
          )}
        />
      ) : null}
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
            label={t('variable.name')}
            name={name}
            required
            touched={isTouched}
          >
            <Input
              placeholder={t('variable.form.name.placeholder')}
              value={value}
              onValueChange={(v) => onChange(convertToValidName(v))}
            />
          </Field>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={t('variable.description')}
            name={name}
            required
            touched={isTouched}
          >
            <Input value={value} onValueChange={onChange} />
          </Field>
        )}
      />
      {selectedType === VariableType.Calculated ? (
        <Controller
          name="formula"
          control={control}
          rules={{ required: true }}
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <VTLEditor
              clearErrors={() => clearErrors(name)}
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
        />
      ) : null}
      <Controller
        name="scope"
        control={control}
        rules={{ required: true }}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={t('variable.scope')}
            name={name}
            required
            touched={isTouched}
          >
            <Select<string>
              options={[
                { label: t('common.questionnaire'), value: '' },
                ...Array.from(scopes).map(([id, name]) => ({
                  label: name,
                  value: id,
                })),
              ]}
              value={value}
              onChange={onChange}
            />
          </Field>
        )}
      />
      <Controller
        name="datatype.typeName"
        control={control}
        rules={{ required: true }}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={t('variable.datatype.label')}
            name={name}
            required
            touched={isTouched}
          >
            <Select<DatatypeType>
              options={datatypeOptions}
              value={value}
              onChange={onChange}
            />
          </Field>
        )}
      />
      {selectedTypeName === DatatypeType.Date ? (
        <Controller
          name="datatype.format"
          control={control}
          rules={{ required: true }}
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Field
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={t('variable.format')}
              name={name}
              required
              touched={isTouched}
            >
              <Select<DateFormat>
                options={dateFormatOptions}
                value={value as DateFormat | undefined}
                onChange={onChange}
              />
            </Field>
          )}
        />
      ) : null}
      {selectedTypeName === DatatypeType.Numeric ? (
        <>
          <Controller
            name="datatype.minimum"
            control={control}
            rules={{ required: true }}
            render={({
              field: { ref, name, value, onChange },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <Field
                dirty={isDirty}
                error={error}
                invalid={invalid}
                label={t('variable.minimum')}
                name={name}
                required
                touched={isTouched}
              >
                <NumberField
                  value={value as number | undefined}
                  inputRef={ref}
                  onValueChange={onChange}
                />
              </Field>
            )}
          />
          <Controller
            name="datatype.maximum"
            control={control}
            rules={{ required: true }}
            render={({
              field: { ref, name, value, onChange },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <Field
                dirty={isDirty}
                error={error}
                invalid={invalid}
                label={t('variable.maximum')}
                name={name}
                required
                touched={isTouched}
              >
                <NumberField
                  value={value as number | undefined}
                  inputRef={ref}
                  onValueChange={onChange}
                />
              </Field>
            )}
          />
          <Controller
            name="datatype.decimals"
            control={control}
            defaultValue={0}
            render={({
              field: { ref, name, value, onChange },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <Field
                dirty={isDirty}
                error={error}
                invalid={invalid}
                label={t('variable.precision')}
                name={name}
                touched={isTouched}
              >
                <NumberField
                  value={value}
                  inputRef={ref}
                  onValueChange={onChange}
                />
              </Field>
            )}
          />
        </>
      ) : null}
      {selectedTypeName === DatatypeType.Text ? (
        <Controller
          name="datatype.maxLength"
          control={control}
          defaultValue={249}
          render={({
            field: { ref, name, value, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Field
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={t('variable.maxLength')}
              name={name}
              required
              touched={isTouched}
            >
              <NumberField
                value={value}
                inputRef={ref}
                onValueChange={onChange}
              />
            </Field>
          )}
        />
      ) : null}
    </Form>
  );
}
