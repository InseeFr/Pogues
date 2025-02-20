import { FieldApi, useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import i18next from 'i18next';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { postQuestionnaire } from '@/api/questionnaires';
import Button, { ButtonStyle } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import Checkbox from '@/components/ui/Checkbox';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import {
  FlowLogics,
  FormulasLanguages,
  Questionnaire,
  TargetModes,
} from '@/models/questionnaires';
import { uid } from '@/utils/utils';

import { changeSetValue } from './utils/set';

interface FormValues {
  title: string;
  targetModes: Set<TargetModes>;
  flowLogic: FlowLogics;
  formulasLanguage: FormulasLanguages;
}

const questionnaireSchema = z.object({
  title: z.string().min(1, i18next.t('createQuestionnaire.mustProvideTitle')),
  targetModes: z
    .set(z.nativeEnum(TargetModes))
    .min(1, i18next.t('createQuestionnaire.mustProvideTarget')),
  flowLogic: z.nativeEnum(FlowLogics),
  formulasLanguage: z.nativeEnum(FormulasLanguages),
});

/**
 * Create a new questionnaire.
 *
 * A questionnaire must have a title, target modes, a flow logic and a language
 * formula.
 *
 * The latter two have default values whose use should be encouraged.
 *
 * {@link Questionnaire}
 */
export default function CreateQuestionnaire() {
  const { t } = useTranslation();
  const { user } = useRouteContext({ from: '__root__' });
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      questionnaire,
      stamp,
    }: {
      questionnaire: Questionnaire;
      stamp: string;
    }) => {
      return postQuestionnaire(questionnaire, stamp);
    },
    onSuccess: (stamp) =>
      queryClient.invalidateQueries({
        queryKey: ['questionnaires', { stamp }],
      }),
  });

  const { Field, Subscribe, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: '',
      targetModes: new Set(),
      flowLogic: FlowLogics.Filter,
      formulasLanguage: FormulasLanguages.VTL,
    },
    validators: { onMount: questionnaireSchema, onChange: questionnaireSchema },
    onSubmit: async ({ value }) => await submitForm(value),
  });

  const submitForm = async ({
    title,
    targetModes,
    flowLogic,
    formulasLanguage,
  }: FormValues) => {
    const id = uid();
    const questionnaire = {
      id,
      title,
      targetModes,
      flowLogic,
      formulasLanguage,
    };
    const stamp = user!.stamp!;
    const promise = mutation.mutateAsync(
      { questionnaire, stamp },
      {
        onSuccess: () =>
          void navigate({
            to: '/questionnaire/$questionnaireId',
            params: { questionnaireId: id },
          }),
      },
    );
    toast.promise(promise, {
      loading: 'Loading',
      success: 'Questionnaire created',
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <div>
      <ContentHeader title={t('questionnaires.create')} />
      <ContentMain>
        <div className="bg-default p-4 border border-default shadow-xl">
          <div className="grid gap-4">
            <Field name="title">
              {(field) => (
                <Input
                  label={t('common.title')}
                  onChange={(v) => field.handleChange(v as string)}
                  autoFocus
                  value={field.state.value}
                  error={
                    field.state.meta.isTouched
                      ? field.state.meta.errors.join(', ')
                      : ''
                  }
                  required
                />
              )}
            </Field>
            <div>
              <Label required>{t('createQuestionnaire.mode')}</Label>
              <Field name="targetModes">
                {(field) => (
                  <>
                    <div className="flex gap-x-4">
                      <TargetModeCheckbox
                        label="CAPI"
                        value={TargetModes.CAPI}
                        field={field}
                      />
                      <TargetModeCheckbox
                        label="CAWI"
                        value={TargetModes.CAWI}
                        field={field}
                      />
                      <TargetModeCheckbox
                        label="CATI"
                        value={TargetModes.CATI}
                        field={field}
                      />
                      <TargetModeCheckbox
                        label="PAPI"
                        value={TargetModes.PAPI}
                        field={field}
                      />
                    </div>
                    {field.state.meta.isTouched ? (
                      <div className="text-sm text-error ml-1">
                        {field.state.meta.errors.join(', ')}
                      </div>
                    ) : null}
                  </>
                )}
              </Field>
            </div>
            <div>
              <Label required>{t('createQuestionnaire.dynamicField')}</Label>
              <Field name="flowLogic">
                {(field) => (
                  <>
                    <div className="flex gap-x-4">
                      <Checkbox
                        label={'Filtre'}
                        checked={field.state.value === FlowLogics.Filter}
                        onChange={(v) => {
                          if (v) field.handleChange(FlowLogics.Filter);
                        }}
                      />
                      <Checkbox
                        label={'Redirection'}
                        checked={field.state.value === FlowLogics.Redirection}
                        onChange={(v) => {
                          if (v) field.handleChange(FlowLogics.Redirection);
                        }}
                      />
                    </div>
                    {field.state.meta.isTouched ? (
                      <div className="text-sm text-error ml-1">
                        {field.state.meta.errors.join(', ')}
                      </div>
                    ) : null}
                  </>
                )}
              </Field>
            </div>
            <div>
              <Label required>{t('createQuestionnaire.formulaField')}</Label>
              <Field name="formulasLanguage">
                {(field) => (
                  <>
                    <div className="flex gap-x-4">
                      <Checkbox
                        label={'VTL'}
                        checked={field.state.value === FormulasLanguages.VTL}
                        onChange={(v) => {
                          if (v) field.handleChange(FormulasLanguages.VTL);
                        }}
                      />
                      <Checkbox
                        label={'XPath'}
                        checked={field.state.value === FormulasLanguages.XPath}
                        onChange={(v) => {
                          if (v) field.handleChange(FormulasLanguages.XPath);
                        }}
                      />
                    </div>
                    {field.state.meta.isTouched ? (
                      <div className="text-sm text-error ml-1">
                        {field.state.meta.errors.join(', ')}
                      </div>
                    ) : null}
                  </>
                )}
              </Field>
            </div>
          </div>
          <div className="flex gap-x-2 mt-6">
            <ButtonLink to={'/questionnaires'}>{t('common.cancel')}</ButtonLink>
            <Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  buttonStyle={ButtonStyle.Primary}
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={!canSubmit}
                >
                  Valider
                </Button>
              )}
            </Subscribe>
          </div>
        </div>
      </ContentMain>
    </div>
  );
}

function TargetModeCheckbox({
  label,
  value,
  field,
}: Readonly<{
  label: string;
  value: TargetModes;
  field: FieldApi<
    FormValues,
    'targetModes',
    undefined,
    undefined,
    Set<TargetModes>
  >;
}>) {
  return (
    <Checkbox
      label={label}
      checked={field.state.value.has(value)}
      onChange={(v) =>
        field.handleChange(changeSetValue(field.state.value, value, v))
      }
    />
  );
}
