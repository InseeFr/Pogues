import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postLoop } from '@/api/loops';
import { Variable } from '@/models/variables';
import { uid } from '@/utils/utils';

import { questionnairesKeys } from '@/api/questionnaires';
import { FormValues } from '../form/schema';
import { Loop } from '@/models/loop';
import LoopForm, { LoopMemberOption } from '../form/LoopForm';

type Props = {
  /** Questionnaire to add the loop to. */
  questionnaireId: string;
  /** Scopes of the questionnaire with the mapping between id and name. */
  scopes: Map<string, string>;
  /** Members available for initial and final selections. */
  members: LoopMemberOption[];
  /** List of variables used for auto-completion in VTL editor. */
  variables?: Variable[];
};

/** Form to create a loop. */
export default function CreateLoopForm({
  questionnaireId,
  scopes,
  members,
  variables,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      loop,
      questionnaireId,
    }: {
      loop: Loop;
      questionnaireId: string;
    }) => {
      return postLoop(questionnaireId, loop);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: questionnairesKeys.detail(questionnaireId),
      }),
  });

  const onSubmit = async (formValues: FormValues) => {
    const id = uid();
    const loop = { id, ...formValues };
    const promise = mutation.mutateAsync(
      { loop, questionnaireId },
      {
        onSuccess: () =>
          navigate({
            to: '/questionnaire/$questionnaireId',
            params: { questionnaireId },
          }),
      },
    );
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('loop.create.success', { name }),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <LoopForm
      questionnaireId={questionnaireId}
      onSubmit={onSubmit}
      submitLabel={t('common.create')}
      scopes={scopes}
      members={members}
      variables={variables}
    />
  );
}
