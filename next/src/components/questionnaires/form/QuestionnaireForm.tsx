import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button, { ButtonStyle } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import Checkbox from '@/components/ui/form/Checkbox';
import Input from '@/components/ui/form/FormInput';
import Label from '@/components/ui/form/Label';
import {
  FlowLogics,
  FormulasLanguages,
  type Questionnaire,
  TargetModes,
} from '@/models/questionnaires';

import { type FormValues, schema } from './schema';
import { changeSetValue } from './utils/set';

type Props = {
  /** In an update case, initial questionnaire value. */
  questionnaire?: Omit<Omit<Questionnaire, 'id'>, 'scopes'>;
  /** Function that will be called with form data when the user submit the form. */
  onSubmit: SubmitHandler<FormValues>;
  /** Label to display on the submit button */
  submitLabel: string;
};

/**
 * Create or edit a codes list.
 *
 * A code list has a label and codes (defined by a label and value).
 *
 * A code can have subcodes.
 *
 * {@link CodesList}
 */
export default function QuestionnaireForm({
  questionnaire = {
    title: '',
    targetModes: new Set(),
    flowLogic: FlowLogics.Filter,
    formulasLanguage: FormulasLanguages.VTL,
  },
  onSubmit,
  submitLabel,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: questionnaire,
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            autoFocus
            label={t('common.title')}
            error={error?.message}
            {...field}
            required
          />
        )}
      />
      <Controller
        name="targetModes"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Label required>{t('questionnaire.common.targetMode')}</Label>
            <div className="flex gap-x-4">
              <Checkbox
                label={'CAPI'}
                checked={field.value?.has(TargetModes.CAPI)}
                {...field}
                onChange={(v) =>
                  field.onChange(
                    changeSetValue(field.value, TargetModes.CAPI, v),
                  )
                }
              />
              <Checkbox
                label={'CAWI'}
                checked={field.value?.has(TargetModes.CAWI)}
                {...field}
                onChange={(v) =>
                  field.onChange(
                    changeSetValue(field.value, TargetModes.CAWI, v),
                  )
                }
              />
              <Checkbox
                label={'CATI'}
                checked={field.value?.has(TargetModes.CATI)}
                {...field}
                onChange={(v) =>
                  field.onChange(
                    changeSetValue(field.value, TargetModes.CATI, v),
                  )
                }
              />
              <Checkbox
                label={'PAPI'}
                checked={field.value?.has(TargetModes.PAPI)}
                {...field}
                onChange={(v) =>
                  field.onChange(
                    changeSetValue(field.value, TargetModes.PAPI, v),
                  )
                }
              />
            </div>
            {error ? (
              <div className="text-sm text-error ml-1">{error.message}</div>
            ) : null}
          </>
        )}
      />
      <div>
        <Label required>{t('questionnaire.common.dynamicField')}</Label>
        <Controller
          name="flowLogic"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { isTouched, error } }) => (
            <>
              <div className="flex gap-x-4">
                <Checkbox
                  label={'Filtre'}
                  checked={field.value === FlowLogics.Filter}
                  onChange={(v) => {
                    if (v) field.onChange(FlowLogics.Filter);
                  }}
                />
                <Checkbox
                  label={'Redirection'}
                  checked={field.value === FlowLogics.Redirection}
                  onChange={(v) => {
                    if (v) field.onChange(FlowLogics.Redirection);
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
      <div>
        <Label required>{t('questionnaire.common.formulaField')}</Label>
        <Controller
          name="formulasLanguage"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { isTouched, error } }) => (
            <>
              <div className="flex gap-x-4">
                <Checkbox
                  label={'VTL'}
                  checked={field.value === FormulasLanguages.VTL}
                  onChange={(v) => {
                    if (v) field.onChange(FormulasLanguages.VTL);
                  }}
                />
                <Checkbox
                  label={'XPath'}
                  checked={field.value === FormulasLanguages.XPath}
                  onChange={(v) => {
                    if (v) field.onChange(FormulasLanguages.XPath);
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
