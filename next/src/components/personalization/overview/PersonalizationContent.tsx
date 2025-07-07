import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  deleteQuestionnaireData,
  getExistingCsvSchema,
} from '@/api/personalize';
import { openDocument } from '@/api/utils/personalization';
import PersonalizationContentTile from '@/components/personalization/overview/PersonalisationContentTile';
import Button, { ButtonStyle } from '@/components/ui/Button';
import Dialog from '@/components/ui/Dialog';
import {
  PersonalizationQuestionnaire,
  SurveyUnitModeData,
} from '@/models/personalizationQuestionnaire';

import ButtonLink from '../../ui/ButtonLink';
import CsvViewerTable from '../form/CsvViewerTable';
import PersonalisationTile from './PersonalizationTile';
import VisualizationOverview from './VisualizationOverview';

interface PersonalizationContentProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
  csvData: ParseResult<unknown> | null;
  surveyUnitData: SurveyUnitModeData[] | null;
}

/** Display the personalization windows */
export default function PersonalizationContent({
  questionnaireId,
  data,
  csvData,
  surveyUnitData,
}: Readonly<PersonalizationContentProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [parsedCsv, setParsedCsv] = useState<ParseResult<unknown> | null>(
    csvData,
  );

  useEffect(() => {
    setParsedCsv(csvData);
  }, [csvData]);

  const { refetch: fetchExistingData } = useQuery({
    queryKey: ['existing-csv-schema', { questionnaireId }],
    queryFn: async () => {
      const result = await getExistingCsvSchema(data.id);
      return result ?? null;
    },
    enabled: false,
  });
  function onDownload() {
    const promise = fetchExistingData().then((result) => {
      const blob = result.data;
      if (blob && blob.size > 0) {
        const fileName = 'survey-units-' + questionnaireId + '.csv';
        openDocument(blob, fileName);
        toast.promise(promise, {
          loading: t('common.loading'),
          success: t('personalization.create.download_success'),
          error: (err: Error) => err.toString(),
        });
      } else {
        toast.error(
          t('personalization.create.download_error', {
            error: t('personalization.create.download_error'),
          }),
        );
        throw new Error('No data available for download.');
      }
    });
  }

  const deleteMutation = useMutation({
    mutationFn: ({ data }: { data: PersonalizationQuestionnaire }) => {
      return deleteQuestionnaireData(data.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['personalization', { questionnaireId }],
      });
      queryClient.invalidateQueries({
        queryKey: ['getPersonalizationSurveyUnitData', { questionnaireId }],
      });
      queryClient.invalidateQueries({
        queryKey: ['personalizationFile', { questionnaireId }],
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
        <div className="grid grid-cols-[1fr_auto] mt-4">
          <h3>{t('personalization.overview.visualiseSurveyUnits')}</h3>
        </div>
        {surveyUnitData && surveyUnitData.length > 0 && (
          <VisualizationOverview
            modes={data.modes}
            surveyUnitData={surveyUnitData}
          />
        )}
      </PersonalisationTile>
      <PersonalizationContentTile data={data}>
        {parsedCsv && parsedCsv.data.length > 0 && (
          <CsvViewerTable parsedCsv={parsedCsv} />
        )}
        <div className="overflow-hidden flex flex-row gap-3 my-3">
          <Button onClick={onDownload} buttonStyle={ButtonStyle.Primary}>
            {t('personalization.overview.existingFileData')}
          </Button>
          <ButtonLink
            to="/questionnaire/$questionnaireId/personalize/$publicEnemyId"
            params={{ questionnaireId, publicEnemyId: data.id.toString() }}
            disabled
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
