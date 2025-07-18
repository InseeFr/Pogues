import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { deleteQuestionnaireData } from '@/api/personalization';
import { openParsedCsv } from '@/api/utils/personalization';
import PersonalizationContentTile from '@/components/personalization/overview/PersonalisationContentTile';
import Button, { ButtonStyle } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import Dialog from '@/components/ui/Dialog';
import {
  PersonalizationQuestionnaire,
  SurveyUnitModeData,
  UploadError,
} from '@/models/personalizationQuestionnaire';

import CsvViewerTable from '../form/CsvViewerTable';
import ErrorTile from './ErrorTile';
import ModeOverview from './ModeOverview';
import PersonalisationTile from './PersonalizationTile';

interface PersonalizationOverviewProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
  csvData: ParseResult<unknown> | null;
  surveyUnitData: SurveyUnitModeData[] | null;
}

/** Display the personalization windows */
export default function PersonalizationOverview({
  questionnaireId,
  data,
  csvData,
  surveyUnitData,
}: Readonly<PersonalizationOverviewProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function onDownload() {
    if (csvData && csvData.data.length > 0) {
      const fileName = 'survey-units-' + questionnaireId + '.csv';
      openParsedCsv(csvData, fileName);
      toast.success(
        t('personalization.create.downloadSuccess', {
          fileName,
        }),
      );
    } else {
      toast.error(
        t('personalization.create.downloadError', {
          error: t('personalization.create.downloadError'),
        }),
      );
    }
  }

  const deleteMutation = useMutation({
    mutationFn: ({ data }: { data: PersonalizationQuestionnaire }) => {
      return deleteQuestionnaireData(data.id);
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
      success: t('personalization.overview.deleteSuccess'),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <>
      <PersonalisationTile data={data}>
        <div className="grid grid-cols-[1fr_auto] my-3">
          <h3>{t('personalization.overview.visualiseSurveyUnits')}</h3>
        </div>
        {surveyUnitData && surveyUnitData.length > 0 ? (
          <ModeOverview modes={data.modes} surveyUnitData={surveyUnitData} />
        ) : (
          <ErrorTile
            error={
              {
                message: t('personalization.overview.syncErrorTitle'),
                details: [t('personalization.overview.syncErrorDetails')],
              } as UploadError
            }
          />
        )}
      </PersonalisationTile>
      <PersonalizationContentTile data={data}>
        {csvData && csvData.data.length > 0 && (
          <CsvViewerTable parsedCsv={csvData} />
        )}
        <div className="overflow-hidden flex flex-row gap-3 my-3">
          <Button onClick={onDownload} buttonStyle={ButtonStyle.Primary}>
            {t('personalization.overview.existingFileData')}
          </Button>
          <ButtonLink
            to="/questionnaire/$questionnaireId/personalization/$publicEnemyId"
            params={{ questionnaireId, publicEnemyId: data.id.toString() }}
            title={t('personalization.overview.editDisabledTooltip')}
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
      </PersonalizationContentTile>
    </>
  );
}
