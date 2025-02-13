import { FieldApi, useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { postQuestionnaire } from '@/api/questionnaires';
import { getAPIToken } from '@/api/utils';
import Button, { ButtonType } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import Checkbox from '@/components/ui/Checkbox';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { getTranslation, useTranslation } from '@/i18n';
import {
  FlowLogics,
  FormulasLanguages,
  Questionnaire,
  TargetModes,
} from '@/models/questionnaires';
import { uid } from '@/utils/utils';

import { changeSetValue } from './utils/set';

const { t } = getTranslation('createQuestionnaireMessage');
interface FormValues {
  title: string;
  targetModes: Set<TargetModes>;
  flowLogic: FlowLogics;
  formulasLanguage: FormulasLanguages;
}

const questionnaireSchema = z.object({
  title: z.string().min(1, t('titleMessage')),
  targetModes: z.set(z.nativeEnum(TargetModes)).min(1, t('targetMessage')),
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
  const { t: tCommon } = useTranslation('commonMessage');
  const { user } = useRouteContext({
    from: '__root__',
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      questionnaire,
      stamp,
      token,
    }: {
      questionnaire: Questionnaire;
      stamp: string;
      token: string;
    }) => {
      return postQuestionnaire(questionnaire, stamp, token);
    },
  });

  const { Field, Subscribe, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: '',
      targetModes: new Set(),
      flowLogic: FlowLogics.Filter,
      formulasLanguage: FormulasLanguages.VTL,
    },
    validators: { onMount: questionnaireSchema, onChange: questionnaireSchema },
    onSubmit: async ({ value }) => {
      await submitForm(value);
    },
  });

  const submitForm = async ({
    title,
    targetModes,
    flowLogic,
    formulasLanguage,
  }: FormValues) => {
    const token = await getAPIToken();
    const id = uid();
    const questionnaire = {
      id,
      title,
      targetModes,
      flowLogic,
      formulasLanguage,
    };
    const promise = mutation.mutateAsync(
      { questionnaire, stamp: user!.stamp!, token },
      {
        onSuccess: () =>
          void navigate({
            to: '/questionnaire/$questionnaireId',
            params: { questionnaireId: id },
          }),
      },
    );
    toast.promise(promise, {
      loading: t('loading'),
      success: t('createSuccess'),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <div>
      <ContentHeader title={t('create')} />
      <ContentMain>
        <div className="bg-default p-4 border border-default shadow-xl">
          <div className="grid gap-4">
            <Field name="title">
              {(field) => (
                <Input
                  label={tCommon('title')}
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
              <Label required>{t('mode')}</Label>
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
              <Label required>{t('dynamicField')}</Label>
              <Field name="flowLogic">
                {(field) => (
                  <>
                    <div className="flex gap-x-4">
                      <Checkbox
                        label={t('filter')}
                        checked={field.state.value === FlowLogics.Filter}
                        onChange={(v) => {
                          if (v) field.handleChange(FlowLogics.Filter);
                        }}
                      />
                      <Checkbox
                        label={t('redirect')}
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
              <Label required>{t('formulaField')}</Label>
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
            <ButtonLink to={'/questionnaires'}>{tCommon('cancel')}</ButtonLink>
            <Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type={ButtonType.Primary}
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
