import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  deleteQuestionnaireData,
  personalizationKeys,
} from '@/api/personalization';
import { openParsedCsv, openParsedJson } from '@/api/utils/personalization';
import PersonalizationContentTile from '@/components/personalization/overview/PersonalisationContentTile';
import Button, { ButtonStyle } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import DialogButton from '@/components/ui/DialogButton';
import {
  InterrogationModeDataResponse,
  PersonalizationQuestionnaire,
} from '@/models/personalizationQuestionnaire';

import CsvViewerTable from '../form/CsvViewerTable';
import JsonViewer from '../form/JsonViewer';
import PersonalizationCheckPanel from './PersonalizationCheckPanel';
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

  const deleteMutation = useMutation({
    mutationFn: ({ data }: { data: PersonalizationQuestionnaire }) => {
      return deleteQuestionnaireData(data.poguesId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: personalizationKeys.fromPogues(questionnaireId),
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
      success: t('personalization.overview.deleteSuccess'),
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
        <PersonalizationCheckPanel
          questionnaireId={questionnaireId}
          data={data}
          fileData={fileData}
          interrogationData={interrogationData}
          hasValidInterrogationData={
            hasValidInterrogationData ? hasValidInterrogationData : false
          }
        />
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
          <DialogButton
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
