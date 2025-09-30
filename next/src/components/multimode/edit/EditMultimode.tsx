import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { multimodeKeys, putMultimode } from '@/api/multimode';
import type { MultimodeIsMovedRules } from '@/models/multimode';
import type { Variable } from '@/models/variables';

import IsMovedRulesForm from '../form/IsMovedRulesForm';

interface Props {
  questionnaireId: string;
  isMovedRules: MultimodeIsMovedRules;
  roundaboutVariables?: Variable[];
  variables?: Variable[];
}

/** Allow to edit multimode. */
export default function EditMultimode({
  questionnaireId,
  isMovedRules = { questionnaireFormula: '', leafFormula: '' },
  roundaboutVariables = [],
  variables = [],
}: Readonly<Props>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      isMovedRules,
      questionnaireId,
    }: {
      isMovedRules: MultimodeIsMovedRules;
      questionnaireId: string;
    }) => {
      return putMultimode(questionnaireId, isMovedRules);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: multimodeKeys.all(questionnaireId),
      }),
  });

  const submitForm = async (isMovedRules: MultimodeIsMovedRules) => {
    const promise = mutation.mutateAsync(
      { isMovedRules, questionnaireId },
      {
        onSuccess: () =>
          navigate({
            to: '/questionnaire/$questionnaireId/multimode',
            params: { questionnaireId },
          }),
      },
    );
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('multimode.edit.success'),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <IsMovedRulesForm
        questionnaireId={questionnaireId}
        isMovedRules={isMovedRules}
        roundaboutVariables={roundaboutVariables}
        variables={variables}
        onSubmit={submitForm}
      />
    </div>
  );
}
