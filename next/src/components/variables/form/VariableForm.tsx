import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { t } from 'i18next';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonStyle } from '@/components/ui/Button';
import Checkbox from '@/components/ui/form/Checkbox';
import Input from '@/components/ui/form/Input';
import Label from '@/components/ui/form/Label';
import Select from '@/components/ui/form/Select';
import { DatatypeType } from '@/models/datatype';
import { type Variable, VariableType } from '@/models/variables';

import VariableDatatype from '../VariableDatatype';
import { FormValues, schema } from './schema';

type Props = {
  questionnaireId: string;
  /** In an update case, initial questionnaire value. */
  variable?: Omit<Variable, 'id'>;
  /** Function that will be called with form data when the user submit the form. */
  onSubmit: SubmitHandler<FormValues>;
  /** Label to display on the submit button */
  submitLabel: string;
  /** Available scopes. */
  scopes: Set<string>;
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
    datatype: { typeName: DatatypeType.Text },
    type: VariableType.External,
  },
  onSubmit,
  submitLabel,
  scopes,
}: Readonly<Props>) {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: variable,
    resolver: zodResolver(schema),
  });

  const selectedTypeName = watch('datatype.typeName');

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/variables',
      params: { questionnaireId },
      ignoreBlocker: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label required>{t('variable.type.label')}</Label>
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { isTouched, error } }) => (
            <>
              <div className="flex gap-x-4">
                {/* We only handle external variable for now */}
                <Checkbox
                  label={t('variable.type.external')}
                  checked={field.value === VariableType.External}
                  onChange={(v) => {
                    if (v) field.onChange(VariableType.External);
                  }}
                />
              </div>
              {error && isTouched ? (
                <div className="text-sm text-error ml-1">{error.message}</div>
              ) : null}
            </>
          )}
        />
      </div>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            autoFocus
            label={t('variable.name')}
            error={error?.message}
            {...field}
            required
            onChange={(event) => {
              field.onChange(
                event.target.value.toUpperCase().replaceAll(/\s/g, '_'),
              );
            }}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            label={t('variable.description')}
            error={error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="scope"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Label required>{t('variable.scope')}</Label>
            <Select<string>
              {...field}
              options={[
                { label: t('common.questionnaire'), value: '' },
                ...Array.from(scopes).map((scope) => ({
                  label: scope,
                  value: scope,
                })),
              ]}
            />
            {error ? (
              <div className="text-sm text-error ml-1">{error.message}</div>
            ) : null}
          </>
        )}
      />
      <Controller
        name="datatype.typeName"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Label required>{t('variable.datatype.label')}</Label>
            <Select<DatatypeType>
              {...field}
              options={[
                {
                  label: <VariableDatatype datatype={DatatypeType.Text} />,
                  value: DatatypeType.Text,
                },
                {
                  label: <VariableDatatype datatype={DatatypeType.Date} />,
                  value: DatatypeType.Date,
                },
                {
                  label: <VariableDatatype datatype={DatatypeType.Numeric} />,
                  value: DatatypeType.Numeric,
                },
                {
                  label: <VariableDatatype datatype={DatatypeType.Boolean} />,
                  value: DatatypeType.Boolean,
                },
              ]}
            />
            {error ? (
              <div className="text-sm text-error ml-1">{error.message}</div>
            ) : null}
          </>
        )}
      />
      {selectedTypeName === DatatypeType.Date ? <div>Date</div> : null}
      {selectedTypeName === DatatypeType.Numeric ? (
        <>
          <Controller
            name="datatype.minimum"
            control={control}
            render={({ field, fieldState: { error } }) => (
              /* @ts-expect-error minimum is a number as datatype is numeric */
              <Input
                label={t('variable.minimum')}
                error={error?.message}
                type="number"
                {...field}
                onChange={(v) => {
                  const value = v.target.value;
                  field.onChange(value ? Number(value) : undefined);
                }}
              />
            )}
          />
          <Controller
            name="datatype.maximum"
            control={control}
            render={({ field, fieldState: { error } }) => (
              /* @ts-expect-error maximum is a number as datatype is numeric */
              <Input
                label={t('variable.maximum')}
                error={error?.message}
                type="number"
                {...field}
                onChange={(v) => {
                  const value = v.target.value;
                  field.onChange(value ? Number(value) : undefined);
                }}
              />
            )}
          />
          <Controller
            name="datatype.decimals"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label={t('variable.precision')}
                error={error?.message}
                type="number"
                {...field}
                onChange={(v) => {
                  const value = v.target.value;
                  field.onChange(value ? Number(value) : undefined);
                }}
              />
            )}
          />
        </>
      ) : null}
      {selectedTypeName === DatatypeType.Text ? (
        <Controller
          name="datatype.maxLength"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              label={t('variable.maxLength')}
              error={error?.message}
              type="number"
              {...field}
              onChange={(v) => {
                const value = v.target.value;
                field.onChange(value ? Number(value) : undefined);
              }}
            />
          )}
        />
      ) : null}
      <div className="flex gap-x-2 mt-6 justify-end">
        <Button type="button" onClick={handleCancel}>
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          buttonStyle={ButtonStyle.Primary}
          disabled={!isDirty || !isValid}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
