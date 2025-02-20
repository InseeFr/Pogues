import { useMutation } from '@tanstack/react-query';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { putCodesList } from '@/api/codesLists';
import { CodesList } from '@/models/codesLists';
import { uid } from '@/utils/utils';

import CodesListForm, { FormValues } from '../form/CodesListForm';

interface CreateCodesListFormProps {
  questionnaireId: string;
}

/** Create a new code list. */
export default function CreateCodesListForm({
  questionnaireId,
}: Readonly<CreateCodesListFormProps>) {
  const { t } = useTranslation();
  const { queryClient } = useRouteContext({ from: '__root__' });
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
      onSubmit={submitForm}
      submitLabel={t('common.create')}
    />
  );
}
