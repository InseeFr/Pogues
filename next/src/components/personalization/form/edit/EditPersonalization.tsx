import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  editQuestionnaireData,
  personalizationKeys,
} from '@/api/personalization';
import PersonalizationForm from '@/components/personalization/form/PersonalizationForm';
import PersonalisationTile from '@/components/personalization/overview/PersonalizationTile';
import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

interface EditPersonalizationProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
  fileData: ParseResult<unknown> | string | null;
}

/** Display the personalization windows */
export default function EditPersonalization({
  questionnaireId,
  data,
  fileData,
}: Readonly<EditPersonalizationProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] =
    useState<PersonalizationQuestionnaire>(data);

  const saveQuestionnaire = useMutation({
    mutationFn: (questionnaire: PersonalizationQuestionnaire) => {
      return editQuestionnaireData(questionnaire);
    },
    onSuccess: async (result) => {
      if (result.state === 'COMPLETED') {
        await queryClient.refetchQueries({
          queryKey: personalizationKeys.fromPogues(questionnaireId),
        });
      }
      queryClient.invalidateQueries({
        queryKey: personalizationKeys.fromPogues(questionnaireId),
      });
    },
  });

  function handleSubmit() {
    const label = questionnaire.label;
    const promise = saveQuestionnaire.mutateAsync(questionnaire);

    toast.promise(promise, {
      loading: t('common.loading'),
      success: (result) => {
        if (result.state === 'COMPLETED') {
          navigate({
            to: `/questionnaire/${questionnaireId}/personalization`,
            replace: true,
          });
          return t('personalization.edit.saveSuccess');
        }
        if (result.state === 'ERROR') {
          console.error('Error saving questionnaire', result);
          toast.error(t('personalization.edit.brokenQuestionnaire'));
          return null;
        }
        return t('personalization.create.saveError');
      },
      error: (err) =>
        t('personalization.create.saveError', { label, error: err.message }),
    });
  }

  return (
    <PersonalisationTile data={data}>
      <PersonalizationForm
        questionnaire={questionnaire}
        setQuestionnaire={setQuestionnaire}
        questionnaireId={questionnaireId}
        fileData={fileData}
        handleSubmit={handleSubmit}
      />
    </PersonalisationTile>
  );
}
