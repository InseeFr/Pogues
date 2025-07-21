import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import type { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { editQuestionnaireData } from '@/api/personalization';
import PersonalizationForm from '@/components/personalization/form/PersonalizationForm';
import PersonalisationTile from '@/components/personalization/overview/PersonalizationTile';
import {
  PersonalizationQuestionnaire,
  UploadError,
} from '@/models/personalizationQuestionnaire';

interface EditPersonalizationProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
  csvData: ParseResult | null;
}

/** Display the personalization windows */
export default function EditPersonalization({
  questionnaireId,
  data,
  csvData,
}: Readonly<EditPersonalizationProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] =
    useState<PersonalizationQuestionnaire>(data);

  const [errorUpload, setErrorUpload] = useState<UploadError | null>(null);

  const saveQuestionnaire = useMutation({
    mutationFn: (questionnaire: PersonalizationQuestionnaire) => {
      return editQuestionnaireData(questionnaire);
    },
    onSuccess: () => {
      toast.success(t('personalization.create.saveSuccess'));
      queryClient.invalidateQueries({
        queryKey: ['editQuestionnaire', { questionnaireId }],
      });
    },
    onError: (error: AxiosError) => {
      toast.error(
        t('personalization.create.saveError', { error: error.message }),
      );
    },
  });

  function handleSubmit(questionnaire: PersonalizationQuestionnaire) {
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
        csvData={csvData}
        handleSubmit={handleSubmit}
      />
    </PersonalisationTile>
  );
}
