import { zodResolver } from '@hookform/resolvers/zod';
import { useBlocker, useNavigate } from '@tanstack/react-router';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DirtyStateDialog from '@/components/layout/DirtyStateDialog';
import Button, { ButtonStyle } from '@/components/ui/Button';
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
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isMovedRules,
  });

  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => isDirty && !isSubmitted,
    withResolver: true,
  });

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/multimode',
      params: { questionnaireId },
      ignoreBlocker: true,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="questionnaireFormula"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <VTLEditor
              label={t('multimode.form.questionnaireFormula')}
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
        {roundaboutVariables.length > 0 ? (
          <Controller
            name="leafFormula"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <VTLEditor
                label={t('multimode.form.leafFormula')}
                className="h-20"
                error={error?.message}
                suggestionsVariables={roundaboutVariables}
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
          <Button type="button" onClick={handleCancel}>
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            disabled={!isDirty || !isValid}
            buttonStyle={ButtonStyle.Primary}
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
