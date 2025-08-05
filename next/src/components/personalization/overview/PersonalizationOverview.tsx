import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  deleteQuestionnaireData,
  editQuestionnaireData,
} from '@/api/personalization';
import { openParsedCsv, openParsedJson } from '@/api/utils/personalization';
import PersonalizationContentTile from '@/components/personalization/overview/PersonalisationContentTile';
import Button, { ButtonStyle } from '@/components/ui/Button';
import ButtonIcon, { ButtonIconStyle } from '@/components/ui/ButtonIcon';
import ButtonLink from '@/components/ui/ButtonLink';
import Dialog from '@/components/ui/Dialog';
import ResetIcon from '@/components/ui/icons/ResetIcon';
import WarningIcon from '@/components/ui/icons/WarningIcon';
import {
  InterrogationModeDataResponse,
  PersonalizationQuestionnaire,
  UploadError,
  UploadErrorDetails,
} from '@/models/personalizationQuestionnaire';

import CsvViewerTable from '../form/CsvViewerTable';
import JsonViewer from '../form/JsonViewer';
import ErrorTile from './ErrorTile';
import ModeOverview from './ModeOverview';
import PersonalisationTile from './PersonalizationTile';

interface PersonalizationOverviewProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
  fileData: ParseResult<unknown> | string;
  interrogationData: InterrogationModeDataResponse | null;
}

/** Display the personalization windows */
export default function PersonalizationOverview({
  questionnaireId,
  data,
  fileData = '',
  interrogationData,
}: Readonly<PersonalizationOverviewProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const downloadMutation = useMutation({
    mutationFn: async () => {
      const fileName = 'interrogations-' + questionnaireId;
      if (typeof fileData !== 'string' && 'data' in fileData) {
        openParsedCsv(fileData, `${fileName}.csv`);
      } else {
        openParsedJson(JSON.parse(fileData as string), `${fileName}.json`);
      }
      return fileName;
    },
    onSuccess: (fileName: string) => {
      toast.success(
        t('personalization.create.downloadSuccess', {
          fileName,
        }),
      );
    },
    onError: () => {
      toast.error(
        t('personalization.create.downloadError', {
          error: t('personalization.create.downloadError'),
        }),
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: PersonalizationQuestionnaire }) => {
      return editQuestionnaireData(data, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allPersonalization', { questionnaireId }],
      });
    },
  });

  const onUpdate = () => {
    const promise = updateMutation.mutateAsync({
      data,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('personalization.overview.deleteSuccess'),
      error: (err: Error) => err.toString(),
    });
  };

  const deleteMutation = useMutation({
    mutationFn: ({ data }: { data: PersonalizationQuestionnaire }) => {
      return deleteQuestionnaireData(data.poguesId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['allPersonalization', { questionnaireId }],
      });
      navigate({
        to: '/questionnaire/$questionnaireId/personalization/new',
        params: { questionnaireId },
      });
    },
  });

  function onDelete() {
    const promise = deleteMutation.mutateAsync({
      data,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('personalization.overview.updateSuccess'),
      error: (err: Error) => err.toString(),
    });
  }

  const hasValidInterrogationData =
    interrogationData &&
    Object.values(interrogationData).some(
      (modeData) => Array.isArray(modeData) && modeData.length > 0,
    );

  return (
    <>
      <PersonalisationTile data={data}>
        <div className="grid grid-cols-[1fr_auto] my-3">
          <h3>{t('personalization.overview.visualiseInterrogations')}</h3>
        </div>
        {data.isOutdated ?? (
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
            {/* Only to keep the same structure as other error tiles */}
            <div className="w-full flex flex-row items-center mb-2 justify-between">
              {t('personalization.overview.syncErrorContent')}

              <ButtonIcon
                className="h-7 ml-3"
                Icon={ResetIcon}
                title={t('personalization.overview.syncErrorContent')}
                onClick={onUpdate}
                buttonStyle={ButtonIconStyle.Delete}
              />
            </div>
          </div>
        )}
        {interrogationData === null ||
        Object.keys(interrogationData).length === 0 ? (
          <div>{t('common.loading')}</div>
        ) : hasValidInterrogationData ? (
          <ModeOverview interrogationData={interrogationData} />
        ) : (
          <ErrorTile
            error={
              {
                message: t('personalization.overview.dataInterrogationError'),
                details: [
                  {
                    message: t(
                      'personalization.overview.dataInterrogationErrorDetails',
                    ),
                  } as UploadErrorDetails,
                ],
              } as UploadError
            }
          />
        )}
      </PersonalisationTile>
      <PersonalizationContentTile data={data}>
        <div className="overflow-hidden flex flex-row gap-3 my-3">
          <Button
            onClick={() => downloadMutation.mutate()}
            buttonStyle={ButtonStyle.Primary}
          >
            {t('personalization.overview.existingFileData')}
          </Button>
          <ButtonLink
            to="/questionnaire/$questionnaireId/personalization/$publicEnemyId"
            params={{ questionnaireId, publicEnemyId: data.poguesId }}
          >
            {t('common.edit')}
          </ButtonLink>
          <Dialog
            label={t('common.delete')}
            title={t('personalization.overview.deleteDialogTitle', {
              label: data.label,
            })}
            body={t('personalization.overview.deleteDialogConfirm')}
            onValidate={onDelete}
          />
        </div>
        {typeof fileData !== 'string' && 'data' in fileData ? (
          <CsvViewerTable parsedCsv={fileData} />
        ) : (
          <JsonViewer data={fileData} />
        )}
      </PersonalizationContentTile>
    </>
  );
}
