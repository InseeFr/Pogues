import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
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

  const [errorUpload, setErrorUpload] = useState<UploadError | null>(null);

  const saveQuestionnaire = useMutation({
    mutationFn: (questionnaire: PersonalizationQuestionnaire) => {
      return addQuestionnaireData(questionnaire);
    },
    onSuccess: () => {
      toast.success(t('personalization.create.saveSuccess'));
      queryClient.invalidateQueries({
        queryKey: ['saveQuestionnaire', { questionnaireId }],
      });
    },
    onError: (error: AxiosError) => {
      toast.error(
        t('personalization.create.save_error', { error: error.message }),
      );
    },
  });

  function handleSubmit() {
    saveQuestionnaire.mutateAsync(questionnaire, {
      onSuccess: () =>
        navigate({
          to: '/questionnaire/$questionnaireId/personalization',
          params: { questionnaireId },
        }),
    });
  }

  return (
    <PersonalisationTile data={data}>
      <PersonalizationForm
        questionnaire={questionnaire}
        setQuestionnaire={setQuestionnaire}
        questionnaireId={questionnaireId}
        errorUpload={errorUpload}
        setErrorUpload={setErrorUpload}
        handleSubmit={handleSubmit}
      />
    </PersonalisationTile>
  );
}
