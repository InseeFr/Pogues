import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postVariable, variablesKeys } from '@/api/variables';
import { Variable } from '@/models/variables';
import { uid } from '@/utils/utils';

import VariableForm, { type FormValues } from '../form/VariableForm';

interface Props {
  /** Questionnaire to add the variable to. */
  questionnaireId: string;
  /** Scopes availables in the questionnaire. */
  scopes: Set<string>;
}

/** Form to create a questionnaire. */
export default function CreateQuestionnaireForm({
  questionnaireId,
  scopes,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      variable,
      questionnaireId,
    }: {
      variable: Variable;
      questionnaireId: string;
    }) => {
      return postVariable(variable, questionnaireId);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: variablesKeys.all(questionnaireId),
      }),
  });

  const onSubmit = async ({
    name,
    datatype,
    description,
    scope,
    type,
  }: FormValues) => {
    const id = uid();
    const variable = {
      id,
      name,
      datatype,
      description,
      scope,
      type,
    };
    const promise = mutation.mutateAsync(
      { variable, questionnaireId },
      {
        onSuccess: () =>
          navigate({
            to: '/questionnaire/$questionnaireId/variables',
            params: { questionnaireId: id },
          }),
      },
    );
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('variable.create.success', {
        name,
      }),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <VariableForm
      onSubmit={onSubmit}
      submitLabel={t('common.create')}
      scopes={scopes}
    />
  );
}
