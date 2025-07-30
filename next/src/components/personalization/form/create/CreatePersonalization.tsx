import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { addQuestionnaireData } from '@/api/personalization';
import {
  PersonalizationQuestionnaire,
  UploadError,
} from '@/models/personalizationQuestionnaire';

import PersonalisationTile from '../../overview/PersonalizationTile';
import PersonalizationForm from '../PersonalizationForm';

interface CreatePersonalizationProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
}

/** Display the personalization windows */
export default function CreatePersonalization({
  questionnaireId,
  data,
}: Readonly<CreatePersonalizationProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] =
    useState<PersonalizationQuestionnaire>(data);

  const saveQuestionnaire = useMutation({
    mutationFn: (questionnaire: PersonalizationQuestionnaire) => {
      return addQuestionnaireData(questionnaire);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['saveQuestionnaire', { questionnaireId }],
      });
    },
  });

  function handleSubmit() {
    const label = questionnaire.label;
    const promise = saveQuestionnaire.mutateAsync(questionnaire, {
      onSuccess: () =>
        navigate({
          to: '/questionnaire/$questionnaireId/personalization',
          params: { questionnaireId },
        }),
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('personalization.create.saveSuccess', { label }),
      error: (err: Error) =>
        t('personalization.create.saveError', { error: err.message }),
    });
  }

  return (
    <PersonalisationTile data={data}>
      <PersonalizationForm
        questionnaire={questionnaire}
        setQuestionnaire={setQuestionnaire}
        questionnaireId={questionnaireId}
        handleSubmit={handleSubmit}
      />
    </PersonalisationTile>
  );
}
