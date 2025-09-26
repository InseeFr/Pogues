import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import Label from '@/components/ui/form/Label';
import VTLEditor from '@/components/ui/form/VTLEditor';
import type { MultimodeIsMovedRules } from '@/models/multimode';
import { Variable } from '@/models/variables';

import { FormValues, schema } from './schema';

interface Props {
  questionnaireId: string;
  isMovedRules?: MultimodeIsMovedRules;
  roundaboutVariables?: Variable[];
  variables?: Variable[];
  onSubmit: SubmitHandler<FormValues>;
}

/**
 * Form component used to set multimode rules for the "IS_MOVED" rule.
 *
 * The leaf part should only be accessible if the questionnaire has a
 * roundabout.
 */
export default function MultimodeIsMovedRulesForm({
  questionnaireId,
  isMovedRules = { questionnaireFormula: '', leafFormula: '' },
  roundaboutVariables = [],
  variables = [],
  onSubmit,
}: Readonly<Props>) {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isMovedRules,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="questionnaireFormula"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <VTLEditor
            label={t('multimode.form.questionnaireFormula')}
            className="h-20"
            error={error?.message}
            suggestionsVariables={variables}
            {...field}
          />
        )}
      />
      {roundaboutVariables.length > 0 ? (
        <Controller
          name="leafFormula"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <VTLEditor
              label={t('multimode.form.leafFormula')}
              className="h-20"
              error={error?.message}
              // Warning : it should be roundaboutVariables but currently VTLEditor can't be rendered twice
              // with different suggestionsVariables else every field has the suggestionsVariables of the last field.
              // Until we find a solution, we prefer to use the questionnaire variables.

              suggestionsVariables={variables}
              {...field}
            />
          )}
        />
      ) : (
        <div>
          <Label>{t('multimode.form.leafFormula')}</Label>
          <div className="py-3 text-disabled text-sm italic">
            {t('multimode.form.noRoundaboutVariables')}
          </div>
        </div>
      )}

      <div className="flex gap-x-2 mt-6 justify-end">
        <ButtonLink
          to="/questionnaire/$questionnaireId/multimode"
          params={{ questionnaireId }}
        >
          {t('common.cancel')}
        </ButtonLink>
        <Button type="submit" disabled={!isDirty || !isValid}>
          {t('common.validate')}
        </Button>
      </div>
    </form>
  );
}
