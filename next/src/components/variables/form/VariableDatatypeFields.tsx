import { type Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import ControlledField from '@/components/ui/form/ControlledField'
import NumberField from '@/components/ui/form/NumberField'
import Select from '@/components/ui/form/Select'
import { DatatypeType, DateFormat } from '@/models/datatype'

import { dateFormatOptions } from './consts'
import { type FormValues } from './schema'

type Props = {
  control: Control<FormValues>
  datatypeTypeNameOptions: { label: string; value: DatatypeType }[]
  isDatatypeTypeNameDisabled: boolean
  selectedTypeName: DatatypeType
}

/**
 * Datatype related fields of the variable form.
 * (date format, numeric bounds, text length).
 */
export default function VariableDatatypeFields({
  control,
  datatypeTypeNameOptions,
  isDatatypeTypeNameDisabled,
  selectedTypeName,
}: Readonly<Props>) {
  const { t } = useTranslation()

  return (
    <>
      <ControlledField
        control={control}
        name="datatype.typeName"
        label={t('variable.datatype.label')}
        required
        rules={{ required: true }}
      >
        {(field) => (
          <Select<DatatypeType>
            options={datatypeTypeNameOptions}
            value={field.value}
            onChange={field.onChange}
            disabled={isDatatypeTypeNameDisabled}
          />
        )}
      </ControlledField>
      {selectedTypeName === DatatypeType.Date ? (
        <ControlledField
          control={control}
          name="datatype.format"
          label={t('variable.format')}
          required
          rules={{ required: true }}
        >
          {(field) => (
            <Select<DateFormat>
              options={dateFormatOptions}
              value={field.value as DateFormat | undefined}
              onChange={field.onChange}
            />
          )}
        </ControlledField>
      ) : null}
      {selectedTypeName === DatatypeType.Numeric ? (
        <>
          <ControlledField
            control={control}
            name="datatype.minimum"
            label={t('variable.minimum')}
            required
            rules={{ required: true }}
          >
            {(field) => (
              <NumberField
                value={field.value as number | undefined}
                inputRef={field.ref}
                onValueChange={field.onChange}
              />
            )}
          </ControlledField>
          <ControlledField
            control={control}
            name="datatype.maximum"
            label={t('variable.maximum')}
            required
            rules={{ required: true }}
          >
            {(field) => (
              <NumberField
                value={field.value as number | undefined}
                inputRef={field.ref}
                onValueChange={field.onChange}
              />
            )}
          </ControlledField>
          <ControlledField
            control={control}
            name="datatype.decimals"
            label={t('variable.precision')}
            defaultValue={0}
          >
            {(field) => (
              <NumberField
                value={field.value}
                inputRef={field.ref}
                onValueChange={field.onChange}
              />
            )}
          </ControlledField>
        </>
      ) : null}
      {selectedTypeName === DatatypeType.Text ? (
        <ControlledField
          control={control}
          name="datatype.maxLength"
          label={t('variable.maxLength')}
          required
          defaultValue={249}
        >
          {(field) => (
            <NumberField
              value={field.value}
              inputRef={field.ref}
              onValueChange={field.onChange}
            />
          )}
        </ControlledField>
      ) : null}
    </>
  )
}
