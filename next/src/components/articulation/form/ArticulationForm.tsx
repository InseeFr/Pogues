import { zodResolver } from '@hookform/resolvers/zod';
import { useBlocker, useNavigate } from '@tanstack/react-router';
import i18next from 'i18next';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import DirtyStateDialog from '@/components/layout/DirtyStateDialog';
import Button, { ButtonStyle } from '@/components/ui/Button';
import Label from '@/components/ui/form/Label';
import VTLEditor from '@/components/ui/form/VTLEditor';
import {
  ARTICULATION_ITEMS_TRANSLATIONS,
  ArticulationItems,
  defaultArticulationItems,
} from '@/models/articulation';
import { Variable } from '@/models/variables';

interface ArticulationFormProps {
  questionnaireId: string;
  articulationItems?: ArticulationItems;
  variables?: Variable[];
  onSubmit: SubmitHandler<FormValues>;
}

const schema = z.object({
  items: z.tuple([
    z.object({
      label: z.literal('Prénom'),
      value: z
        .string()
        .min(1, { error: i18next.t('articulation.form.mustProvideFirstName') }),
    }),
    z.object({
      label: z.literal('Sexe'),
      value: z
        .string()
        .min(1, { error: i18next.t('articulation.form.mustProvideGender') }),
    }),
    z.object({
      label: z.literal('Age'),
      value: z
        .string()
        .min(1, { error: i18next.t('articulation.form.mustProvideAge') }),
    }),
  ]),
});

export type FormValues = z.infer<typeof schema>;

export default function ArticulationForm({
  questionnaireId,
  articulationItems = defaultArticulationItems,
  variables = [],
  onSubmit,
}: Readonly<ArticulationFormProps>) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { items: defaultArticulationItems },
    values: { items: articulationItems },
  });

  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => isDirty && !isSubmitted,
    withResolver: true,
  });

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/articulation',
      params: { questionnaireId },
      ignoreBlocker: true,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {articulationItems.map((item, index) => (
          <div key={item.label} className="space-y-1">
            <Label className="block font-semibold text-sm" required>
              {t(ARTICULATION_ITEMS_TRANSLATIONS[item.label])}
            </Label>
            <Controller
              name={`items.${index as 0 | 1 | 2}.value`} // not clean, but by default it does not understand there are only those 3 index values
              control={control}
              render={({ field, fieldState: { error } }) => (
                <VTLEditor
                  className="h-20"
                  error={error?.message}
                  data-testid={`items.${index}.value`}
                  suggestionsVariables={variables}
                  {...field}
                />
              )}
            />
          </div>
        ))}

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
