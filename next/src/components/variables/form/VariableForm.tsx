import { zodResolver } from '@hookform/resolvers/zod';
import i18next, { t } from 'i18next';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button, { ButtonStyle } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import Checkbox from '@/components/ui/form/Checkbox';
import Input from '@/components/ui/form/Input';
import Label from '@/components/ui/form/Label';
import Option from '@/components/ui/form/Option';
import Select from '@/components/ui/form/Select';
import { DatatypeType, DateFormat, DurationFormat } from '@/models/datatype';
import { type Variable, VariableType } from '@/models/variables';

import VariableDatatype from '../VariableDatatype';

interface Props {
  /** In an update case, initial questionnaire value. */
  variable?: Omit<Variable, 'id'>;
  /** Function that will be called with form data when the user submit the form. */
  onSubmit: SubmitHandler<FormValues>;
  /** Label to display on the submit button */
  submitLabel: string;
  /** Scopes availables. */
  scopes: Set<string>;
}

const datatypeEnum = z.enum(DatatypeType);
const datatypeSchema = z.discriminatedUnion('typeName', [
  z.object({
    typeName: datatypeEnum.extract(['Boolean']),
  }),
  z.object({
    typeName: datatypeEnum.extract(['Date']),
    format: z.enum(DateFormat),
    minimum: z.date().optional(),
    maximum: z.date().optional(),
  }),
  z.object({
    typeName: datatypeEnum.extract(['Duration']),
    format: z.enum(DurationFormat),
    years: z.number().optional(),
    months: z.date().optional(),
    hours: z.number().optional(),
    minutes: z.date().optional(),
  }),
  z.object({
    typeName: datatypeEnum.extract(['Numeric']),
    minimum: z.number().optional(),
    maximum: z.number().optional(),
    decimals: z.number().optional(),
    isDynamicUnit: z.boolean().optional(),
    unit: z.string().optional(),
  }),
  z.object({
    typeName: datatypeEnum.extract(['Text']),
    maxLength: z.number().min(1).default(254).optional(),
  }),
]);

const schema = z.object({
  name: z
    .string()
    .min(1, { message: i18next.t('variable.form.mustProvideName') })
    .regex(/^[A-Z]+(_[A-Z]+)*$/, {
      message: i18next.t('variable.form.mustProvideScreamingSnakeCaseName'),
    }),
  description: z.string(),
  scope: z.string().nullable().optional(),
  datatype: datatypeSchema,
  type: z.enum(VariableType),
});

export type FormValues = z.infer<typeof schema>;

/**
 * Create or edit a variable.
 *
 * A variable has a name, a description, a scope (defaults to whole
 * questionnaire), a type, a datatype and its related informations, and may have
 * a formula if it is of type calculated.
 *
 * {@link CodesList}
 */
export default function VariableForm({
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
                <Checkbox
                  label={t('variable.type.external')}
                  checked={field.value === VariableType.External}
                  onChange={(v) => {
                    if (v) field.onChange(VariableType.External);
                  }}
                />
                <Checkbox
                  label={t('variable.type.calculated')}
                  checked={field.value === VariableType.Calculated}
                  onChange={(v) => {
                    if (v) field.onChange(VariableType.Calculated);
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
            <Select {...field}>
              <Option value={null}>{t('common.questionnaire')}</Option>
              {Array.from(scopes).map((scope) => (
                <Option key={scope} value={scope}>
                  {scope}
                </Option>
              ))}
            </Select>
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
            <Select {...field}>
              {[
                DatatypeType.Text,
                DatatypeType.Date,
                DatatypeType.Numeric,
                DatatypeType.Boolean,
              ].map((datatype) => (
                <Option key={datatype} value={datatype}>
                  <VariableDatatype datatype={datatype} />
                </Option>
              ))}
            </Select>
            {error ? (
              <div className="text-sm text-error ml-1">{error.message}</div>
            ) : null}
          </>
        )}
      />
      {selectedTypeName === DatatypeType.Date ? <div>Date</div> : null}
      {selectedTypeName === DatatypeType.Duration ? <div>Duration</div> : null}
      {selectedTypeName === DatatypeType.Numeric ? (
        <>
          <Controller
            name="datatype.minimum"
            control={control}
            render={({ field, fieldState: { error } }) => (
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
        <ButtonLink to="/questionnaires">{t('common.cancel')}</ButtonLink>
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
