import {
  type Control,
  type UseFieldArrayMove,
  type UseFieldArrayRemove,
  UseFormSetError,
  UseFormTrigger,
  useFieldArray,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import ButtonIcon, { ButtonIconStyle } from '@/components/ui/ButtonIcon'
import ControlledField from '@/components/ui/form/ControlledField'
import ControlledVTLEditor from '@/components/ui/form/ControlledVTLEditor'
import Input from '@/components/ui/form/Input'
import AddIcon from '@/components/ui/icons/AddIcon'
import ArrowDownIcon from '@/components/ui/icons/ArrowDownIcon'
import ArrowUpIcon from '@/components/ui/icons/ArrowUpIcon'
import DeleteIcon from '@/components/ui/icons/DeleteIcon'
import { FormulasLanguages } from '@/models/questionnaires'
import { Variable } from '@/models/variables'

import { type FormValues } from './schema'

interface CodesFieldsProps {
  control: Control<FormValues>
  formulasLanguage?: FormulasLanguages
  variables: Variable[]
  trigger: UseFormTrigger<FormValues>
  setError: UseFormSetError<FormValues>
}

interface CodesFieldProps {
  control: Control<FormValues>
  formulasLanguage?: FormulasLanguages
  variables: Variable[]
  index: number
  remove: UseFieldArrayRemove
  move: UseFieldArrayMove
  isFirst?: boolean
  isLast?: boolean
  parentName: string
  subCodeIteration?: number
  trigger: UseFormTrigger<FormValues>
  setError: UseFormSetError<FormValues>
}

/** List of codes (and their subcodes) of a codes list. */
export default function CodesFields({
  control,
  formulasLanguage,
  variables,
  setError,
  trigger,
}: Readonly<CodesFieldsProps>) {
  const { t } = useTranslation()
  const name = 'codes'
  const { fields, append, remove, move } = useFieldArray({
    control,
    name,
  })

  return (
    <>
      {fields.map((field, index) => (
        <CodesField
          key={field.id}
          control={control}
          formulasLanguage={formulasLanguage}
          variables={variables}
          index={index}
          remove={remove}
          move={move}
          isFirst={index === 0}
          isLast={index === fields.length - 1}
          parentName={name}
          setError={setError}
          trigger={trigger}
        />
      ))}
      <button
        type="button"
        className="col-span-full text-left cursor-pointer text-action-primary font-semibold w-fit hover:bg-accent p-0.5 rounded"
        onClick={() => append({ label: '', value: '', codes: [] })}
      >
        {t('codesList.form.addCode')}
      </button>
    </>
  )
}

function CodesField({
  control,
  formulasLanguage,
  variables,
  index,
  remove,
  move,
  isFirst = false,
  isLast = false,
  parentName,
  subCodeIteration = 0,
  trigger,
  setError,
}: Readonly<CodesFieldProps>) {
  const { t } = useTranslation()
  const namePrefix = `${parentName}.${index}`
  const {
    fields,
    append: appendSubCode,
    remove: removeSubCode,
    move: moveSubCode,
  } = useFieldArray({
    control,
    name: `${namePrefix}.codes` as 'codes',
  })

  return (
    <>
      <div
        style={{ marginLeft: `${subCodeIteration * 1.5}rem` }}
        className="col-start-1 grid grid-cols-[auto_1fr]"
      >
        <div className="grid grid-rows-2">
          <ButtonIcon
            className="h-6"
            Icon={ArrowUpIcon}
            title={t('codesList.form.moveUp')}
            disabled={isFirst}
            onClick={() => move(index, index - 1)}
          />
          <ButtonIcon
            className="h-6"
            Icon={ArrowDownIcon}
            title={t('codesList.form.moveDown')}
            onClick={() => move(index, index + 1)}
            disabled={isLast}
          />
        </div>
        <ControlledField
          control={control}
          name={`${namePrefix}.value` as `codes.${number}.value`}
          required
          rules={{ required: true }}
        >
          {(field) => (
            <Input
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value)
                trigger()
              }}
            />
          )}
        </ControlledField>
      </div>
      <div className="col-start-2">
        {formulasLanguage === FormulasLanguages.VTL ? (
          <ControlledVTLEditor
            key={`${namePrefix}.label`}
            control={control}
            name={`${namePrefix}.label` as `codes.${number}.label`}
            required
            blockOnSyntaxErrors={false}
            setError={setError}
            suggestionsVariables={variables}
            testId={`${namePrefix}.label`}
          />
        ) : (
          <ControlledField
            control={control}
            name={`${namePrefix}.label` as `codes.${number}.label`}
            required
            rules={{ required: true }}
          >
            {(field) => (
              <Input
                data-testid={`${namePrefix}.label`}
                value={field.value}
                onValueChange={field.onChange}
                required
              />
            )}
          </ControlledField>
        )}
      </div>
      <ButtonIcon
        className="col-start-3 h-12"
        Icon={AddIcon}
        title={t('codesList.form.addSubCode')}
        onClick={() => appendSubCode({ label: '', value: '', codes: [] })}
      />
      <ButtonIcon
        className="col-start-4 h-12"
        Icon={DeleteIcon}
        title={t('common.delete')}
        onClick={() => remove(index)}
        buttonStyle={ButtonIconStyle.Delete}
      />
      {fields.map((field, index) => (
        <CodesField
          key={field.id}
          control={control}
          formulasLanguage={formulasLanguage}
          variables={variables}
          index={index}
          remove={removeSubCode}
          move={moveSubCode}
          isFirst={index === 0}
          isLast={index === fields.length - 1}
          parentName={`${namePrefix}.codes`}
          subCodeIteration={subCodeIteration + 1}
          trigger={trigger}
          setError={setError}
        />
      ))}
    </>
  )
}
