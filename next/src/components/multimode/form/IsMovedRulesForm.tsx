import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Form from '@/components/ui/form/Form';
import Label from '@/components/ui/form/Label';
import VTLEditor from '@/components/ui/form/VTLEditor';
import type { MultimodeIsMovedRules } from '@/models/multimode';
import { Variable } from '@/models/variables';

import { type FormValues, schema } from './schema';

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
    clearErrors,
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isMovedRules,
  });

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/multimode',
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
        name="questionnaireFormula"
        control={control}
        render={({
          field: { name, value, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <VTLEditor
            clearErrors={clearErrors}
            dirty={isDirty}
            error={error}
            invalid={invalid}
            label={t('multimode.form.questionnaireFormula')}
            name={name}
            onChange={onChange}
            setError={(error) => setError(name, error)}
            suggestionsVariables={variables}
            touched={isTouched}
            value={value}
          />
        )}
      />
      {roundaboutVariables.length > 0 ? (
        <Controller
          name="leafFormula"
          control={control}
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <VTLEditor
              clearErrors={() => clearErrors(name)}
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={t('multimode.form.leafFormula')}
              name={name}
              onChange={onChange}
              setError={(error) => setError(name, error)}
              // Warning : it should be roundaboutVariables but currently VTLEditor can't be rendered twice
              // with different suggestionsVariables else every field has the suggestionsVariables of the last field.
              // Until we find a solution, we prefer to use the questionnaire variables.
              suggestionsVariables={variables}
              touched={isTouched}
              value={value}
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
    </Form>
  );
}
