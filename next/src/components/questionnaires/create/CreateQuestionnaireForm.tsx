import type { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useRef } from 'react'

import type { QuestionnaireDetailsDTO } from '@/api/models/questionnaireDetailsDTO'
import { postQuestionnaireDetail } from '@/api/questionnaireDetails'
import { questionnairesKeys } from '@/api/questionnaires'
import { getSerieById } from '@/api/series'
import { computePoguesTargetModes } from '@/api/utils/targetModes'
import QuestionnaireFormFields from '@/components/questionnaires/form/QuestionnaireFormFields'
import Form from '@/components/ui/form/Form'
import { useFormCancel } from '@/hooks/form/useFormCancel'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import { useReactHookfForm } from '@/hooks/form/useReactHookfForm'
import type { SerieItem } from '@/models/series'
import type { Stamp } from '@/models/stamps'
import { createQuestionnaireNameFromLabel, uid } from '@/utils/utils'

import { type FormValues, schema } from '../form/schema'

interface CreateQuestionnaireFormProps {
  /** Stamp selected by default for the new questionnaire. */
  defaultStamp: string
  series: SerieItem[]
  stamps: Stamp[]
}

/** Form to create a questionnaire. */
export default function CreateQuestionnaireForm({
  defaultStamp,
  series,
  stamps,
}: Readonly<CreateQuestionnaireFormProps>) {
  const { t } = useTranslation()
  const cancel = useFormCancel()
  const hasGeneratedName = useRef(false)

  const { submit } = useFormSubmit({
    mutationFn: async (values: FormValues): Promise<string> => {
      const id = uid()
      const serieDetails = values.serie
        ? await getSerieById(values.serie)
        : undefined
      const dto: QuestionnaireDetailsDTO = {
        id,
        name: values.name,
        label: values.title,
        targetMode: computePoguesTargetModes(values.targetModes),
        agency: values.agency,
        owner: values.owner,
        ...(serieDetails ? { dataCollection: { serie: serieDetails } } : {}),
      }

      await postQuestionnaireDetail(dto)
      return id
    },
    schema,
    invalidateKeys: [questionnairesKeys.all],
    successMessage: (values) =>
      t('questionnaire.create.success', { title: values.title }),
    navigateFunction: (questionnaireId) => ({
      to: '/questionnaire/$questionnaireId',
      params: { questionnaireId },
    }),
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    return submit({
      ...values,
      agency: 'fr.insee',
    })
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty, isSubmitted, isValid },
  } = useReactHookfForm<FormValues>({
    defaultValues: {
      title: '',
      name: '',
      targetModes: new Set(),
      agency: 'fr.insee',
      owner: defaultStamp,
      serie: '',
    },
    schema,
  })

  const handleTitleBlur = (title: string) => {
    if (hasGeneratedName.current || !title.trim()) {
      return
    }
    setValue('name', createQuestionnaireNameFromLabel(title), {
      shouldDirty: true,
      shouldValidate: true,
    })
    hasGeneratedName.current = true
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => cancel({ to: '/questionnaires' })}
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
      validateLabel={t('common.create')}
    >
      <QuestionnaireFormFields
        control={control}
        series={series}
        stamps={stamps}
        onTitleBlur={handleTitleBlur}
      />
    </Form>
  )
}
