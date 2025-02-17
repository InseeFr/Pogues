import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import i18next from 'i18next';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { addQuestionnaireCodesList } from '@/api/questionnaires';
import { getAPIToken } from '@/api/utils';
import Button, { ButtonType } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Code, CodesList } from '@/models/codesLists';
import { uid } from '@/utils/utils';

interface FormValues {
  label: string;
  codes: Code[];
}

const questionnaireSchema = z.object({
  label: z.string().min(1, 'You must provide a label'),
  codes: z
    .array(
      z.object({
        value: z.string().min(1, 'Your code must have a value'),
        label: z.string().min(1, 'Your code must have a label'),
      }),
    )
    .min(1, 'You must provide at least one code'),
});

/**
 * Create a new codes list.
 *
 * A code list has a label and codes (defined by a label and value).
 *
 * A code can have subcodes.
 *
 * {@link CodesList}
 */
export default function CreateQuestionnaire() {
  const { t } = useTranslation();
  const { questionnaireId } = useParams({ strict: false });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      questionnaireId,
      codesList,
      token,
    }: {
      questionnaireId: string;
      codesList: CodesList;
      token: string;
    }) => {
      return addQuestionnaireCodesList(questionnaireId, codesList, token);
    },
  });

  const { Field, Subscribe, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      label: '',
      codes: [],
    },
    validators: { onMount: questionnaireSchema, onChange: questionnaireSchema },
    onSubmit: async ({ value }) => {
      await submitForm(value);
    },
  });

  const submitForm = async ({ label, codes }: FormValues) => {
    const token = await getAPIToken();
    const id = uid();
    const codesList = { id, label, codes };

    const promise = mutation.mutateAsync(
      { questionnaireId: questionnaireId!, codesList, token },
      {
        onSuccess: () =>
          void navigate({
            to: '/questionnaire/$questionnaireId/codes-lists',
            params: { questionnaireId: questionnaireId! },
          }),
      },
    );
    toast.promise(promise, {
      loading: i18next.t('common.loading'),
      success: i18next.t('createCodeList.created'),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <div>
      <ContentHeader title="Nouvelle liste de code" />
      <ContentMain>
        <Button>{t('createCodeList.importCsv')}</Button>
        <div className="bg-default p-4 border border-default shadow-xl">
          <div className="grid gap-4">
            <Field name="label">
              {(field) => (
                <Input
                  label={'Label'}
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
              <Label required>Codes</Label>
              <Field name="codes" mode="array">
                {(field) => (
                  <>
                    <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
                      <Label className="mb-0 mt-3">
                        {t('createCodeList.value')}
                      </Label>
                      <Label className="mb-0 mt-3">
                        {t('createCodeList.label')}
                      </Label>
                      <div></div>
                      {field.state.value.map((_, i) => {
                        return (
                          <>
                            <Field key={i} name={`codes[${i}].value`}>
                              {(subField) => {
                                return (
                                  <Input
                                    onChange={(v) =>
                                      subField.handleChange(v as string)
                                    }
                                    value={subField.state.value}
                                    error={
                                      subField.state.meta.isTouched
                                        ? subField.state.meta.errors.join(', ')
                                        : ''
                                    }
                                    required
                                  />
                                );
                              }}
                            </Field>
                            <Field key={i} name={`codes[${i}].label`}>
                              {(subField) => {
                                return (
                                  <Input
                                    onChange={(v) =>
                                      subField.handleChange(v as string)
                                    }
                                    value={subField.state.value}
                                    error={
                                      subField.state.meta.isTouched
                                        ? subField.state.meta.errors.join(', ')
                                        : ''
                                    }
                                    required
                                  />
                                );
                              }}
                            </Field>
                            <button onClick={() => field.removeValue(i)}>
                              {t('common.delete')}
                            </button>
                          </>
                        );
                      })}
                    </div>
                    <button
                      className="my-3 p-2 text-primary font-bold cursor-pointer hover:bg-accent rounded-sm"
                      onClick={() => field.pushValue({ label: '', value: '' })}
                      type="button"
                    >
                      {t('createCodeList.add')}
                    </button>
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
          <div className="flex gap-x-2 mt-3">
            <ButtonLink
              to={'/questionnaire/$questionnaireId/codes-lists'}
              params={{ questionnaireId: questionnaireId! }}
            >
              {t('common.cancel')}
            </ButtonLink>
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
                  {t('common.validate')}
                </Button>
              )}
            </Subscribe>
          </div>
        </div>
      </ContentMain>
    </div>
  );
}
