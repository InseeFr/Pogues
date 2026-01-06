import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import {
  type Control,
  Controller,
  type SubmitHandler,
  type UseFieldArrayMove,
  type UseFieldArrayRemove,
  UseFormSetError,
  UseFormTrigger,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ButtonIcon, { ButtonIconStyle } from '@/components/ui/ButtonIcon';
import Form from '@/components/ui/form/Form';
import Input from '@/components/ui/form/FormInput';
import Label from '@/components/ui/form/Label';
import VTLEditor from '@/components/ui/form/VTLEditor';
import AddIcon from '@/components/ui/icons/AddIcon';
import ArrowDownIcon from '@/components/ui/icons/ArrowDownIcon';
import ArrowUpIcon from '@/components/ui/icons/ArrowUpIcon';
import DeleteIcon from '@/components/ui/icons/DeleteIcon';
import { type CodesList } from '@/models/codesLists';
import { FormulasLanguages } from '@/models/questionnaires';
import { Variable } from '@/models/variables';

import { type FormValues, schema } from './schema';

interface CodesListFormProps {
  /** In an update case, initial codes list value. */
  codesList?: Omit<CodesList, 'id'>;
  /** Related questionnaire id. */
  questionnaireId: string;
  formulasLanguage?: FormulasLanguages;
  /** Variables of the questionnaire used for the VTL Editor. */
  variables?: Variable[];
  /** Function that will be called with form data when the user submit the form. */
  onSubmit: SubmitHandler<FormValues>;
}

/**
 * Create or edit a codes list.
 *
 * A code list has a label and codes (defined by a label and value).
 *
 * A code can have subcodes.
 *
 * @see {@link CodesList}
 */
export default function CodesListForm({
  codesList = {
    label: '',
    codes: [{ label: '', value: '', codes: [] }],
  },
  questionnaireId,
  formulasLanguage,
  variables = [],
  onSubmit,
}: Readonly<CodesListFormProps>) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted },
    setError,
    trigger,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      label: '',
      codes: [{ label: '', value: '', codes: [] }],
    },
    values: codesList,
    resolver: zodResolver(schema),
  });

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/codes-lists',
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
    >
      <Controller
        name="label"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            label={t('codesList.common.label')}
            error={error?.message}
            {...field}
            required
          />
        )}
      />
      <div className="grid grid-cols-[1fr_2fr_auto_auto] auto-cols-min items-start gap-x-2 gap-y-2">
        <Label className="col-start-1">{t('codesList.common.codeValue')}</Label>
        <Label className="col-start-2">{t('codesList.common.codeLabel')}</Label>
        <CodesFields
          control={control}
          formulasLanguage={formulasLanguage}
          variables={variables}
          setError={setError}
          trigger={trigger}
        />
      </div>
    </Form>
  );
}

interface CodesFieldsProps {
  control: Control<FormValues>;
  formulasLanguage?: FormulasLanguages;
  variables: Variable[];
  trigger: UseFormTrigger<FormValues>;
  /** Manually set custom error for `react-hook-form` to manage. */
  setError: UseFormSetError<FormValues>;
}

function CodesFields({
  control,
  formulasLanguage,
  variables,
  setError,
  trigger,
}: Readonly<CodesFieldsProps>) {
  const { t } = useTranslation();
  const name = 'codes';
  const { fields, append, remove, move } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((v, index) => (
        <CodesField
          key={v.id}
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
  );
}

interface CodesFieldProps {
  control: Control<FormValues>;
  formulasLanguage?: FormulasLanguages;
  variables: Variable[];
  index: number;
  remove: UseFieldArrayRemove;
  move: UseFieldArrayMove;
  isFirst?: boolean;
  isLast?: boolean;
  parentName: string;
  subCodeIteration?: number;
  trigger: UseFormTrigger<FormValues>;
  /** Manually set custom error for `react-hook-form` to manage. */
  setError: UseFormSetError<FormValues>;
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
  const { t } = useTranslation();
  const namePrefix = `${parentName}.${index}`;
  const {
    fields,
    append: appendSubCode,
    remove: removeSubCode,
    move: moveSubCode,
  } = useFieldArray({
    control,
    name: `${namePrefix}.codes` as 'codes',
  });

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
        <Controller
          name={`${namePrefix}.value` as `codes.${number}.value`}
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Input
              data-testid={`${namePrefix}.value`}
              error={error?.message}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger();
              }}
            />
          )}
        />
      </div>
      <div className="col-start-2">
        <Controller
          name={`${namePrefix}.label` as `codes.${number}.label`}
          control={control}
          rules={{ required: true }}
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) =>
            formulasLanguage === FormulasLanguages.VTL ? (
              <VTLEditor
                key={`${namePrefix}.label`}
                data-testid={`${namePrefix}.label`}
                dirty={isDirty}
                error={error}
                invalid={invalid}
                name={name}
                onChange={onChange}
                required
                setError={(error) => setError(name, error)}
                suggestionsVariables={variables}
                touched={isTouched}
                value={value}
              />
            ) : (
              <Input
                data-testid={`${namePrefix}.label`}
                error={error?.message}
                onValueChange={onChange}
                required
              />
            )
          }
        />
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
      {fields.map((v, index) => (
        <CodesField
          key={v.id}
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
        />
      ))}
    </>
  );
}
