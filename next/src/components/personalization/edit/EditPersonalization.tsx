import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import type { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { editQuestionnaireData } from '@/api/personalize';
import Dialog from '@/components/ui/Dialog';
import {
  PersonalizationQuestionnaire,
  UploadError,
} from '@/models/personalizationQuestionnaire';

import PersonalizationForm from '../PersonalizationForm';
import PersonalisationTile from '../PersonalizationTile';

interface EditPersonalizationProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
  csvData: ParseResult<unknown> | null;
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
      toast.success(t('personalization.create.save_success'));
      queryClient.invalidateQueries({
        queryKey: ['editQuestionnaire', { questionnaireId }],
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
        void navigate({
          to: '/questionnaire/$questionnaireId/personalize',
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
        existingCsv={csvData}
      />
      <div className="w-auto inline-block my-1">
        <Dialog
          label={t('common.validate')}
          title={t('personalization.edit.title', {
            label: data.label,
          })}
          body={t('personalization.edit.edit_questionnaire_description')}
          onValidate={handleSubmit}
          buttonTitle={t('personalization.edit.edit_questionnaire')}
          disabled={
            !questionnaire.surveyUnitData ||
            !questionnaire.context?.name ||
            errorUpload !== null
          }
        />
      </div>
    </PersonalisationTile>
  );
}
