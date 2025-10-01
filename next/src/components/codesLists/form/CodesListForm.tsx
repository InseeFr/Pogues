import { zodResolver } from '@hookform/resolvers/zod';
import { useBlocker, useNavigate } from '@tanstack/react-router';
import i18next from 'i18next';
import {
  type Control,
  Controller,
  type SubmitHandler,
  type UseFieldArrayMove,
  type UseFieldArrayRemove,
  UseFormTrigger,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import DirtyStateDialog from '@/components/layout/DirtyStateDialog';
import Button, { ButtonStyle } from '@/components/ui/Button';
import ButtonIcon, { ButtonIconStyle } from '@/components/ui/ButtonIcon';
import Input from '@/components/ui/form/Input';
import Label from '@/components/ui/form/Label';
import VTLEditor from '@/components/ui/form/VTLEditor';
import AddIcon from '@/components/ui/icons/AddIcon';
import ArrowDownIcon from '@/components/ui/icons/ArrowDownIcon';
import ArrowUpIcon from '@/components/ui/icons/ArrowUpIcon';
import DeleteIcon from '@/components/ui/icons/DeleteIcon';
import { type CodesList } from '@/models/codesLists';
import { FormulasLanguages } from '@/models/questionnaires';
import { Variable } from '@/models/variables';

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

const codesSchema = z.object({
  value: z
    .string()
    .min(1, { error: i18next.t('codesList.form.mustProvideCodeValue') }),
  label: z
    .string()
    .min(1, { error: i18next.t('codesList.form.mustProvideCodeLabel') }),
  get codes() {
    return z.array(codesSchema).optional();
  },
});

const schema = z
  .object({
    label: z
      .string()
      .min(1, { error: i18next.t('codesList.form.mustProvideLabel') }),
    codes: codesSchema
      .array()
      .min(1, { error: i18next.t('codesList.form.mustProvideCodes') }),
  })
  .check((ctx) => {
    // Handle duplicate on code values
    validateDuplicateValues(ctx.value.codes, 'codes', ctx);
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

  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => isDirty && !isSubmitted,
    withResolver: true,
  });

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/codes-lists',
      params: { questionnaireId },
      ignoreBlocker: true,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <Label className="col-start-1">
            {t('codesList.common.codeValue')}
          </Label>
          <Label className="col-start-2">
            {t('codesList.common.codeLabel')}
          </Label>
          <CodesFields
            control={control}
            formulasLanguage={formulasLanguage}
            variables={variables}
            trigger={trigger}
          />
        </div>
        <div className="flex gap-x-2 mt-6 justify-end">
          <Button type="button" onClick={handleCancel}>
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            buttonStyle={ButtonStyle.Primary}
            disabled={!isDirty || !isValid}
          >
            {t('common.validate')}
          </Button>
        </div>
      </form>
      {status === 'blocked' ? (
        <DirtyStateDialog onValidate={proceed} onCancel={reset} />
      ) : null}
    </>
  );
}

interface CodesFieldsProps {
  control: Control<FormValues>;
  formulasLanguage?: FormulasLanguages;
  variables: Variable[];
  trigger: UseFormTrigger<FormValues>;
}

function CodesFields({
  control,
  formulasLanguage,
  variables,
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
      <Controller
        name={`${namePrefix}.label` as `codes.${number}.label`}
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) =>
          formulasLanguage === FormulasLanguages.VTL ? (
            <VTLEditor
              key={`${namePrefix}.label`}
              data-testid={`${namePrefix}.label`}
              className="col-start-2 h-20"
              suggestionsVariables={variables}
              error={error?.message}
              {...field}
            />
          ) : (
            <Input
              data-testid={`${namePrefix}.label`}
              className="col-start-2"
              error={error?.message}
              {...field}
            />
          )
        }
      />
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

// Helper function to check for duplicate values and add errors
function validateDuplicateValues(
  codes: z.infer<typeof codesSchema>[],
  pathPrefix: string,
  ctx: z.core.ParsePayload<FormValues>,
) {
  const valuePaths: { value: string; paths: string[] }[] = [];

  // Function to collect values and their paths recursively
  const collectValues = (
    codes: z.infer<typeof codesSchema>[],
    pathPrefix: string,
  ) => {
    codes.forEach((code, index) => {
      const currentPath = `${pathPrefix}.${index}.value`; // Path to the value field

      // Add the value and path to the valuePaths array
      const existingValue = valuePaths.find(
        (item) => item.value === code.value,
      );
      if (existingValue) {
        // If value exists, push the path
        existingValue.paths.push(currentPath);
      } else {
        // If value does not exist, create a new entry
        valuePaths.push({ value: code.value, paths: [currentPath] });
      }

      // If the code has subcodes, we add them recursively
      if (code.codes?.length) {
        collectValues(code.codes, `${pathPrefix}.${index}.codes`);
      }
    });
  };

  // Collect all values and their paths
  collectValues(codes, pathPrefix);

  // Check for duplicates and add validation issues for duplicate values
  valuePaths.forEach(({ value, paths }) => {
    if (paths.length > 1) {
      // If the value appears more than once, it's a duplicate
      paths.forEach((path) => {
        ctx.issues.push({
          code: 'custom',
          message: i18next.t('codesList.form.mustProvideUniqueValue', {
            value,
          }),
          input: ctx.value,
          path: path.split('.'), // Add issue to all paths where the value appears
        });
      });
    }
  });
}
