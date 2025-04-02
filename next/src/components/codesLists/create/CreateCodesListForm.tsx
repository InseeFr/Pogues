import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { putCodesList } from '@/api/codesLists';
import { CodesList } from '@/models/codesLists';
import { FormulasLanguages } from '@/models/questionnaires';
import { Variable } from '@/models/variables/variables';
import { uid } from '@/utils/utils';

import CodesListForm, { FormValues } from '../form/CodesListForm';

interface CreateCodesListFormProps {
  questionnaireId: string;
  formulasLanguage?: FormulasLanguages;
  variables: Variable[];
}

/** Create a new code list. */
export default function CreateCodesListForm({
  questionnaireId,
  formulasLanguage,
  variables,
}: Readonly<CreateCodesListFormProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      codesList,
      questionnaireId,
    }: {
      codesList: CodesList;
      questionnaireId: string;
    }) => {
      return putCodesList(questionnaireId, codesList.id, codesList);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: ['questionnaire', { questionnaireId }],
      }),
  });

  const submitForm = async ({ label, codes }: FormValues) => {
    const id = uid();
    const codesList = { id, label, codes };
    const promise = mutation.mutateAsync(
      { questionnaireId, codesList },
      {
        onSuccess: () =>
          void navigate({
            to: '/questionnaire/$questionnaireId/codes-lists',
            params: { questionnaireId },
          }),
      },
    );
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('codesList.create.success'),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <CodesListForm
      questionnaireId={questionnaireId}
      formulasLanguage={formulasLanguage}
      variables={variables}
      onSubmit={submitForm}
    />
  );
}
