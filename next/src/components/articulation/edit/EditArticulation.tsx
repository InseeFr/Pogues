import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { articulationKeys, putArticulation } from '@/api/articulation';
import { Articulation, ArticulationItems } from '@/models/articulation';
import { Variable } from '@/models/variables';

import ArticulationForm, { FormValues } from '../form/ArticulationForm';

interface EditArticulationProps {
  questionnaireId: string;
  variables?: Variable[];
  articulationItems?: ArticulationItems;
}

/** Allow to edit articulation variables */
export default function EditArticulation({
  questionnaireId,
  variables,
  articulationItems,
}: Readonly<EditArticulationProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      articulation,
      questionnaireId,
    }: {
      articulation: Articulation;
      questionnaireId: string;
    }) => {
      return putArticulation(questionnaireId, articulation);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: articulationKeys.all(questionnaireId),
      }),
  });

  const submitForm = async (articulation: FormValues) => {
    const promise = mutation.mutateAsync(
      { articulation, questionnaireId },
      {
        onSuccess: () =>
          navigate({
            to: '/questionnaire/$questionnaireId/articulation',
            params: { questionnaireId },
          }),
      },
    );
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('articulation.edit.success'),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <ArticulationForm
        questionnaireId={questionnaireId}
        articulationItems={articulationItems}
        variables={variables}
        onSubmit={submitForm}
      />
    </div>
  );
}
