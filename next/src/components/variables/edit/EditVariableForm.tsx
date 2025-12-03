import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postVariable, variablesKeys } from '@/api/variables';
import { Variable } from '@/models/variables';

import VariableForm from '../form/VariableForm';
import type { FormValues } from '../form/schema';

type Props = {
  /** Initial variable value. */
  variable: Variable;
  /** Related questionnaire id. */
  questionnaireId: string;
  /** Scopes of the questionnaire with the mapping between id and name. */
  scopes: Map<string, string>;
};

/** Form to edit an existing variable. */
export default function EditVariableForm({
  variable,
  questionnaireId,
  scopes,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const variableId = variable.id;

  const mutation = useMutation({
    mutationFn: ({
      variable,
      questionnaireId,
    }: {
      variable: Variable;
      questionnaireId: string;
    }) => {
      return postVariable(questionnaireId, variable);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: variablesKeys.all(questionnaireId),
      }),
  });

  const onSubmit = async (formValues: FormValues) => {
    const variable = { id: variableId, ...formValues };
    const promise = mutation.mutateAsync(
      { questionnaireId, variable },
      {
        onSuccess: () =>
          void navigate({
            to: '/questionnaire/$questionnaireId/variables',
            params: { questionnaireId },
          }),
      },
    );
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('variable.edit.success', { name }),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <VariableForm
      variable={variable}
      questionnaireId={questionnaireId}
      onSubmit={onSubmit}
      submitLabel={t('common.edit')}
      scopes={scopes}
    />
  );
}
