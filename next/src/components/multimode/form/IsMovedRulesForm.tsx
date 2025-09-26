import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { flushSync } from 'react-dom';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from '@/components/ui/Button';
import Label from '@/components/ui/form/Label';
import VTLEditor from '@/components/ui/form/VTLEditor';
import { useDirtyState } from '@/contexts/DirtyStateContext';
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
  const { setDirty } = useDirtyState();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isMovedRules,
  });

  useEffect(() => {
    setDirty(isDirty);
  }, [isDirty, setDirty]);

  const handleCancel = () => {
    // flushSync forces the state to update immediately, before trying to navigate
    flushSync(() => {
      setDirty(false);
    });
    navigate({
      to: '/questionnaire/$questionnaireId/multimode',
      params: { questionnaireId },
    });
  };

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
        <Button type="submit" disabled={!isDirty || !isValid}>
          {t('common.validate')}
        </Button>
      </div>
    </form>
  );
}
