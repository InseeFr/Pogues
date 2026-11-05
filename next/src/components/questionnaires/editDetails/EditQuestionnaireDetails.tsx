import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useEffect, useRef, useState } from 'react'

import type { QuestionnaireDetailsDTO } from '@/api/models/questionnaireDetailsDTO'
import { detailsKeys, putQuestionnaireDetail } from '@/api/questionnaireDetails'
import { getSerieById, seriesQueryOptions } from '@/api/series'
import { computeQuestionnaireDetails } from '@/api/utils/questionnaireDetails'
import { computeQuestionnaireDetailsDTO } from '@/api/utils/questionnaires'
import QuestionnaireFormFields from '@/components/questionnaires/form/QuestionnaireFormFields'
import { schema } from '@/components/questionnaires/form/schema'
import type { FormValues } from '@/components/questionnaires/form/schema'
import Dialog from '@/components/ui/Dialog'
import Form from '@/components/ui/form/Form'
import FormComponent from '@/components/ui/form/FormComponent'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import { useReactHookfForm } from '@/hooks/form/useReactHookfForm'
import type { SerieItem } from '@/models/series'
import type { Stamp } from '@/models/stamps'

interface EditQuestionnaireDetailsProps {
  questionnaireId: string
  questionnaireDetails: QuestionnaireDetailsDTO
  series?: SerieItem[]
  stamps?: Stamp[]
  readOnly?: boolean
}

/**
 * Display the details of the selected questionnaire and allow to edit them.
 */
export default function EditQuestionnaireDetails({
  questionnaireId,
  questionnaireDetails,
  series,
  stamps,
  readOnly = false,
}: Readonly<EditQuestionnaireDetailsProps>) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const defaultValues = computeQuestionnaireDetails(questionnaireDetails)
  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitted, isValid },
    reset,
    trigger,
  } = useReactHookfForm<FormValues>({
    defaultValues,
    schema,
  })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [pendingFormData, setPendingFormData] = useState<FormValues | null>(
    null,
  )

  const { submit } = useFormSubmit({
    schema,
    mutationFn: async (data: FormValues) => {
      const serieDetails = data.serie
        ? await getSerieById(data.serie)
        : undefined
      const dto = computeQuestionnaireDetailsDTO(
        data,
        questionnaireDetails,
        serieDetails,
      )
      await putQuestionnaireDetail(questionnaireId, dto)
      return dto
    },
    successMessage: t('details.form.updateSuccess'),
    errorMessage: t('details.form.updateError'),
    invalidateKeys: [
      detailsKeys.detail(questionnaireId),
      seriesQueryOptions().queryKey,
    ],
    onSuccess: (dto) => {
      queryClient.setQueryData(detailsKeys.detail(questionnaireId), dto)
      queryClient.invalidateQueries({
        queryKey: detailsKeys.detail(questionnaireId),
        refetchType: 'all',
      })
    },
  })

  useEffect(() => {
    if (readOnly) {
      return
    }
    trigger()
  }, [readOnly, trigger])

  // Force a refresh when returning to the form after validation requests.
  const previousDefaultValuesRef = useRef(JSON.stringify(defaultValues))

  useEffect(() => {
    const nextKey = JSON.stringify(defaultValues)
    if (nextKey === previousDefaultValuesRef.current) {
      return
    }
    previousDefaultValuesRef.current = nextKey
    reset(defaultValues)
  }, [defaultValues, reset])

  const onSubmit = (data: FormValues) => {
    setPendingFormData(data)
    setDialogOpen(true)
  }

  const handleValidate = () => {
    if (!pendingFormData) {
      return
    }

    void submit(pendingFormData).catch(() => {
      // The form hook displays the mutation error toast.
    })
  }

  const handleFormSubmit = (data: FormValues) => {
    const submittedData = { ...data, name: data.name.toUpperCase() }
    onSubmit(submittedData)
    reset(submittedData)
  }

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId',
      params: { questionnaireId },
    })
  }

  const formFields = (
    <QuestionnaireFormFields
      control={control}
      series={series}
      stamps={stamps}
      readOnly={readOnly}
    />
  )

  if (readOnly) {
    return <div className="space-y-4">{formFields}</div>
  }

  return (
    <FormComponent>
      <div className="mt-3">
        <Form
          onSubmit={handleSubmit(handleFormSubmit)}
          onCancel={handleCancel}
          isDirty={isDirty}
          isValid={isValid}
          isSubmitted={isSubmitted}
          validateLabel={t('common.edit')}
          ariaLabel="questionnaire-details-form"
        >
          {formFields}
        </Form>
      </div>
      <Dialog
        title={t('details.form.confirmTitle')}
        body={t('details.form.confirmBody')}
        controlledOpen={dialogOpen}
        setControlledOpen={setDialogOpen}
        onValidate={handleValidate}
      />
    </FormComponent>
  )
}
