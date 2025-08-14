import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  checkInterrogationsData,
  editQuestionnaireData,
  personalizationKeys,
} from '@/api/personalization';
import { createInterrogationFile } from '@/api/utils/personalization';
import ButtonIcon, { ButtonIconStyle } from '@/components/ui/ButtonIcon';
import ResetIcon from '@/components/ui/icons/ResetIcon';
import WarningIcon from '@/components/ui/icons/WarningIcon';
import {
  InterrogationModeDataResponse,
  PersonalizationQuestionnaire,
} from '@/models/personalizationQuestionnaire';

import ModeOverview from './ModeOverview';
import UploadMessageTile from './UploadMessageTile';

interface PersonalizationCheckPanelProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
  fileData: ParseResult<unknown> | string;
  interrogationData: InterrogationModeDataResponse | null;
  hasValidInterrogationData: boolean;
}

export default function PersonalizationCheckPanel({
  questionnaireId,
  data,
  fileData,
  interrogationData,
  hasValidInterrogationData,
}: Readonly<PersonalizationCheckPanelProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: PersonalizationQuestionnaire }) => {
      return editQuestionnaireData(data, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: personalizationKeys.fromPogues(questionnaireId),
      });
    },
  });

  const checkFileDataMutation = useMutation({
    mutationFn: ({ file }: { file: File }) => {
      return checkInterrogationsData(questionnaireId, file);
    },
    onError: () => {
      toast.error(t('personalization.overview.updateFileCheckError'));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: personalizationKeys.checkFileData(questionnaireId),
      });
      updateMutation.mutateAsync({ data });
    },
  });

  const onUpdate = () => {
    const file = createInterrogationFile(fileData, questionnaireId);
    const promise = checkFileDataMutation.mutateAsync({
      file,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('personalization.overview.deleteSuccess'),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <>
      {data.isOutdated && (
        <div
          aria-label="warning-component"
          className="bg-orange-100 border border-orange-300 text-orange-800 rounded px-4 py-3"
        >
          <div className="flex flex-row mb-2 items-center">
            <WarningIcon className="w-6 h-6 text-orange-800 mr-3 flex-shrink-0" />
            <h4 className="text-lg font-semibold">
              {t('personalization.overview.syncErrorTitle')}
            </h4>
          </div>
          <div className="w-full flex flex-row items-center mb-2 justify-between">
            {t('personalization.overview.syncErrorContent')}
            <ButtonIcon
              className="h-7 ml-3"
              Icon={ResetIcon}
              title={'update-button'}
              onClick={onUpdate}
              buttonStyle={ButtonIconStyle.Delete}
            />
          </div>
        </div>
      )}
      {interrogationData === null ? (
        <div>{t('common.loading')}</div>
      ) : (
        <ModeOverview interrogationData={interrogationData} />
      )}
      {interrogationData &&
        Object.keys(interrogationData).length > 0 &&
        !hasValidInterrogationData && (
          <UploadMessageTile
            messages={{
              message: t('personalization.overview.dataInterrogationError'),
              details: [
                {
                  message: t(
                    'personalization.overview.dataInterrogationErrorDetails',
                  ),
                },
              ],
            }}
            isErrorUpload={true}
          />
        )}
    </>
  );
}
