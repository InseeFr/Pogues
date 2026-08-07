import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { questionnairesKeys } from '@/api/questionnaires'
import { postRelease } from '@/api/releases'
import { computeCreateReleaseDTO } from '@/api/utils/releases'
import type { TargetModes } from '@/models/questionnaires'

import ReleaseForm from '../form/ReleaseForm'
import { type FormValues } from '../form/schema'

type Props = {
  questionnaireId: string
  seriesId?: string
  seriesLabel?: string
  targetModes: TargetModes[]
}

export default function CreateReleaseForm({
  questionnaireId,
  seriesId,
  seriesLabel,
  targetModes,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (formValues: FormValues) => {
      try {
        return await postRelease(
          questionnaireId,
          computeCreateReleaseDTO(questionnaireId, formValues),
        )
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
          throw new Error(t('release.create.notFound'))
        }
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionnairesKeys.detail(questionnaireId),
      })
    },
  })

  const onSubmit = async (formValues: FormValues) => {
    const promise = mutation.mutateAsync(formValues, {
      onSuccess: () => {
        navigate({
          to: '/questionnaire/$questionnaireId/releases',
          params: { questionnaireId },
        })
      },
    })
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('release.create.success'),
      error: (err: Error) => err.toString(),
    })
  }

  return (
    <ReleaseForm
      questionnaireId={questionnaireId}
      seriesId={seriesId}
      seriesLabel={seriesLabel}
      targetModes={targetModes}
      onSubmit={onSubmit}
      submitLabel={t('release.form.publish')}
    />
  )
}
