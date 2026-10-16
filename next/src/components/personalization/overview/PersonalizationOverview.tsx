import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { ParseResult } from 'papaparse'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  deleteQuestionnaireData,
  personalizationKeys,
} from '@/api/personalization'
import PersonalizationContentTile from '@/components/personalization/overview/PersonalisationContentTile'
import Button, { ButtonStyle } from '@/components/ui/Button'
import ButtonLink from '@/components/ui/ButtonLink'
import CsvViewerTable from '@/components/ui/CsvViewerTable'
import DeleteButton from '@/components/ui/DeleteButton'
import { useDeleteMutation } from '@/hooks/form/useDeleteMutation'
import {
  InterrogationModeDataResponse,
  PersonalizationQuestionnaire,
} from '@/models/personalizationQuestionnaire'
import { openParsedCsv, openParsedJson } from '@/utils/files'

import JsonViewer from '../form/JsonViewer'
import PersonalizationCheckPanel from './PersonalizationCheckPanel'
import PersonalisationTile from './PersonalizationTile'

interface PersonalizationOverviewProps {
  questionnaireId: string
  data: PersonalizationQuestionnaire
  fileData: ParseResult<unknown> | string
  interrogationData: InterrogationModeDataResponse | null
}

/** Display the personalization windows */
export default function PersonalizationOverview({
  questionnaireId,
  data,
  fileData = '',
  interrogationData,
}: Readonly<PersonalizationOverviewProps>) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const downloadMutation = useMutation({
    mutationFn: async () => {
      const fileName = 'interrogations-' + questionnaireId
      if (typeof fileData !== 'string' && 'data' in fileData) {
        openParsedCsv(fileData, `${fileName}.csv`)
      } else {
        openParsedJson(fileData, `${fileName}.json`)
      }
      return fileName
    },
    onSuccess: (fileName: string) => {
      toast.success(
        t('personalization.overview.downloadExistingDataSuccess', {
          fileName,
        }),
      )
    },
    onError: () => {
      toast.error(
        t('personalization.overview.downloadExistingDataError', {
          error: t('personalization.overview.downloadExistingDataError'),
        }),
      )
    },
  })

  const { remove } = useDeleteMutation({
    mutationFn: (questionnaire: PersonalizationQuestionnaire) =>
      deleteQuestionnaireData(questionnaire.poguesId),
    invalidateKeys: [personalizationKeys.fromPogues(questionnaireId)],
    successMessage: t('personalization.overview.deleteSuccess'),
    onSuccess: () => {
      return navigate({
        to: '/questionnaire/$questionnaireId/personalization/new',
        params: { questionnaireId },
      })
    },
  })

  function onDelete() {
    return remove(data)
  }

  const hasValidInterrogationData =
    interrogationData &&
    Object.values(interrogationData).some(
      (modeData) => Array.isArray(modeData) && modeData.length > 0,
    )

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
          <DeleteButton
            title={t('personalization.overview.deleteDialogTitle', {
              label: data.label,
            })}
            body={t('personalization.overview.deleteDialogConfirm')}
            onConfirm={onDelete}
          />
        </div>
        {typeof fileData !== 'string' && 'data' in fileData ? (
          <CsvViewerTable parsedCsv={fileData} />
        ) : (
          <JsonViewer data={fileData} />
        )}
      </PersonalizationContentTile>
    </>
  )
}
