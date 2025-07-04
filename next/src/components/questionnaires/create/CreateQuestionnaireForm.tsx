import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { postQuestionnaire } from '@/api/questionnaires';
import { type Questionnaire } from '@/models/questionnaires';
import { uid } from '@/utils/utils';

import QuestionnaireForm, { type FormValues } from '../form/QuestionnaireForm';

interface CreateQuestionnaireFormProps {
  /** Stamp to add the questionnaire to. */
  stamp: string;
}

/** Form to create a questionnaire. */
export default function CreateQuestionnaireForm({
  stamp,
}: Readonly<CreateQuestionnaireFormProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      questionnaire,
      stamp,
    }: {
      questionnaire: Questionnaire;
      stamp: string;
    }) => {
      return postQuestionnaire(questionnaire, stamp);
    },
    onSuccess: (_, { stamp }) =>
      queryClient.invalidateQueries({
        queryKey: ['questionnaires', { stamp }],
      }),
  });

  const onSubmit = async ({
    title,
    targetModes,
    flowLogic,
    formulasLanguage,
  }: FormValues) => {
    const id = uid();
    const questionnaire = {
      id,
      title,
      targetModes,
      flowLogic,
      formulasLanguage,
    };
    const promise = mutation.mutateAsync(
      { questionnaire, stamp },
      {
        onSuccess: () =>
          navigate({
            to: '/questionnaire/$questionnaireId',
            params: { questionnaireId: id },
          }),
      },
    );
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('questionnaire.create.success', {
        title,
      }),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <QuestionnaireForm onSubmit={onSubmit} submitLabel={t('common.create')} />
  );
}
