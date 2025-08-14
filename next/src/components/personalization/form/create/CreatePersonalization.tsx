import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  addQuestionnaireData,
  personalizationKeys,
} from '@/api/personalization';
import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [questionnaire, setQuestionnaire] =
    useState<PersonalizationQuestionnaire>(data);

  const saveQuestionnaire = useMutation({
    mutationFn: (questionnaire: PersonalizationQuestionnaire) => {
      return addQuestionnaireData(questionnaire);
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
          return t('personalization.create.saveSuccess');
        }
        if (result.state === 'ERROR') {
          console.error('Error saving questionnaire', result);
          toast.error(t('personalization.create.brokenQuestionnaire'));
          return null;
        }
        return t('personalization.create.saveError');
      },
      error: (err) =>
        t('personalization.create.saveError', { label, error: err.message }),
    });
  }

  return (
    <PersonalisationTile data={questionnaire}>
      <PersonalizationForm
        questionnaire={questionnaire}
        setQuestionnaire={setQuestionnaire}
        questionnaireId={questionnaireId}
        handleSubmit={handleSubmit}
      />
    </PersonalisationTile>
  );
}
