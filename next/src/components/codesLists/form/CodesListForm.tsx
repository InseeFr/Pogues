import { zodResolver } from '@hookform/resolvers/zod';
import { t } from 'i18next';
import {
  type Control,
  Controller,
  type SubmitHandler,
  type UseFieldArrayMove,
  type UseFieldArrayRemove,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import Button, { ButtonStyle } from '@/components/ui/Button';
import ButtonIcon, { ButtonIconStyle } from '@/components/ui/ButtonIcon';
import ButtonLink from '@/components/ui/ButtonLink';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import AddIcon from '@/components/ui/icons/AddIcon';
import ArrowDownIcon from '@/components/ui/icons/ArrowDownIcon';
import ArrowUpIcon from '@/components/ui/icons/ArrowUpIcon';
import DeleteIcon from '@/components/ui/icons/DeleteIcon';
import { type CodesList } from '@/models/codesLists';

interface CodesListFormProps {
  /** In an update case, initial codes list value. */
  codesList?: CodesList;
  /** Related questionnaire id. */
  questionnaireId: string;
  /** Function that will be called with form data when the user submit the form. */
  onSubmit: SubmitHandler<z.infer<typeof schema>>;
  /** Label to display on the submit button */
  submitLabel: string;
}

const codeSchema = z.object({
  value: z.string().min(1, 'Your code must have a value'),
  label: z.string().min(1, 'Your code must have a label'),
});

const codesSchema = codeSchema.extend({
  codes: z.lazy(() => codeSchema.array()).optional(),
});

const schema = z.object({
  label: z.string().min(1, 'You must provide a label'),
  codes: codesSchema.array().min(1, 'You must provide at least one code'),
});

export type FormValues = z.infer<typeof schema>;

/**
 * Create or edit a codes list.
 *
 * A code list has a label and codes (defined by a label and value).
 *
 * A code can have subcodes.
 *
 * {@link CodesList}
 */
export default function CodesListForm({
  codesList = undefined,
  questionnaireId,
  onSubmit,
  submitLabel,
}: Readonly<CodesListFormProps>) {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: codesList,
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="label"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { isTouched, error } }) => (
          <Input
            label={t('codesList.common.label')}
            error={isTouched ? error?.message : undefined}
            {...field}
            required
          />
        )}
      />
      <div className="grid grid-cols-[1fr_2fr_auto_auto] auto-cols-min items-start gap-x-2 gap-y-2">
        <Label className="col-start-1">{t('codesList.common.value')}</Label>
        <Label className="col-start-2">{t('codesList.common.label')}</Label>
        <CodesFields control={control} />
      </div>
      <div className="flex gap-x-2 mt-6">
        <ButtonLink
          to="/questionnaire/$questionnaireId/codes-lists"
          params={{ questionnaireId }}
        >
          {t('common.cancel')}
        </ButtonLink>
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

interface CodesFieldsProps {
  control: Control<FormValues>;
}

function CodesFields({ control }: Readonly<CodesFieldsProps>) {
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
          index={index}
          remove={remove}
          move={move}
          isFirst={index === 0}
          isLast={index === fields.length - 1}
          parentName={name}
        />
      ))}
      <button
        type="button"
        className="col-span-full text-left cursor-pointer text-action-primary font-semibold w-fit hover:bg-accent p-0.5 rounded"
        onClick={() => append({ label: '', value: '' })}
      >
        {t('codesList.form.addCode')}
      </button>
    </>
  );
}

interface CodesFieldProps {
  control: Control<FormValues>;
  index: number;
  remove: UseFieldArrayRemove;
  move: UseFieldArrayMove;
  isFirst?: boolean;
  isLast?: boolean;
  parentName: string;
  subCodeIteration?: number;
}

function CodesField({
  control,
  index,
  remove,
  move,
  isFirst = false,
  isLast = false,
  parentName,
  subCodeIteration = 0,
}: Readonly<CodesFieldProps>) {
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
          render={({ field, fieldState: { isTouched, error } }) => (
            <Input error={isTouched ? error?.message : undefined} {...field} />
          )}
        />
      </div>
      <Controller
        name={`${namePrefix}.label` as `codes.${number}.label`}
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { isTouched, error } }) => (
          <Input
            className="col-start-2"
            error={isTouched ? error?.message : undefined}
            {...field}
          />
        )}
      />
      <ButtonIcon
        className="col-start-3 h-12"
        Icon={AddIcon}
        title={t('codesList.form.addSubCode')}
        onClick={() => appendSubCode({ label: '', value: '' })}
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
          index={index}
          remove={removeSubCode}
          move={moveSubCode}
          isFirst={index === 0}
          isLast={index === fields.length - 1}
          parentName={`${namePrefix}.codes`}
          subCodeIteration={subCodeIteration + 1}
        />
      ))}
    </>
  );
}
