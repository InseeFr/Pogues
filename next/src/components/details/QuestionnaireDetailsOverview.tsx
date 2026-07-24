import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import { QuestionnaireDetailsDTO } from '@/api/models/questionnaireDetailsDTO'
import { detailsKeys, putQuestionnaireDetail } from '@/api/questionnaireDetails'
import { getSerieById } from '@/api/series'
import {
  computeQuestionnaireDetails,
  computeQuestionnaireDetailsDTO,
} from '@/api/utils/questionnaireDetails'
import Dialog from '@/components/ui/Dialog'
import { SerieItem } from '@/models/series'

import QuestionnaireDetailsForm from './form/QuestionnaireDetailsForm'
import type { FormValues } from './form/schema'

interface DetailsOverviewProps {
  questionnaireId: string
  questionnaireDetails: QuestionnaireDetailsDTO
  series: SerieItem[]
}

/**
 * Display the details of the selected questionnaire and allow to edit them.
 */
export default function DetailsOverview({
  questionnaireId,
  questionnaireDetails,
  series,
}: Readonly<DetailsOverviewProps>) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [pendingFormData, setPendingFormData] = useState<FormValues | null>(
    null,
  )

  const mutation = useMutation({
    mutationFn: (params: {
      data: FormValues
      serieDetails: { id: string; uri: string; label: string; altLabel: string }
    }) => {
      const dto = computeQuestionnaireDetailsDTO(
        params.data,
        questionnaireDetails,
        params.serieDetails,
      )
      return putQuestionnaireDetail(questionnaireId, dto)
    },
    onSuccess: () => {
      toast.success(t('details.form.updateSuccess'))
      queryClient.invalidateQueries({
        queryKey: detailsKeys.detail(questionnaireId),
      })
    },
    onError: () => {
      toast.error(t('details.form.updateError'))
    },
  })

  const onSubmit = (data: FormValues) => {
    setPendingFormData(data)
    setDialogOpen(true)
  }

  const handleValidate = async () => {
    if (!pendingFormData) return

    try {
      const serieDetails = await getSerieById(pendingFormData.serie)
      mutation.mutate({ data: pendingFormData, serieDetails })
    } catch {
      toast.error(t('details.form.updateError'))
    }
  }

  return (
    <>
      <div className="relative bg-default border border-default shadow-md p-4">
        <div className="border-b border-default py-3">
          <h3>
            {t('details.title')} {questionnaireId}
          </h3>
        </div>
        <div className="mt-3">
          <QuestionnaireDetailsForm
            series={series}
            defaultValues={computeQuestionnaireDetails(questionnaireDetails)}
            onSubmit={onSubmit}
            submitLabel={t('common.edit')}
          />
        </div>
      </div>
      <Dialog
        title={t('details.form.confirmTitle')}
        body={t('details.form.confirmBody')}
        controlledOpen={dialogOpen}
        setControlledOpen={setDialogOpen}
        onValidate={handleValidate}
      />
    </>
  )
}
