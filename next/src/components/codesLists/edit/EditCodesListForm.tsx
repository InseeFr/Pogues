import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { t } from 'i18next';
import toast from 'react-hot-toast';

import { putCodesList } from '@/api/codesLists';
import { CodesList } from '@/models/codesLists';

import CodesListForm, { FormValues } from '../form/CodesListForm';

interface EditCodesListFormProps {
  /** Initial codes list value. */
  codesList: CodesList;
  /** Related questionnaire id. */
  questionnaireId: string;
}

/** Form to edit an existing code list. */
export default function EditCodesListForm({
  codesList,
  questionnaireId,
}: Readonly<EditCodesListFormProps>) {
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
    onSuccess: (questionnaireId) =>
      queryClient.invalidateQueries({
        queryKey: ['questionnaire', { questionnaireId }],
      }),
  });

  const onSubmit = async ({ label, codes }: FormValues) => {
    const updatedCodesList = { id: codesList.id, label, codes };
    const promise = mutation.mutateAsync(
      { questionnaireId, codesList: updatedCodesList },
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
      success: t('codesList.edit.success', {
        label,
      }),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <CodesListForm
      codesList={codesList}
      questionnaireId={questionnaireId}
      onSubmit={onSubmit}
      submitLabel={t('common.edit')}
    />
  );
}
