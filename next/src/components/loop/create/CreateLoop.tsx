import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { postLoop } from '@/api/loops'
import type { LoopDTO } from '@/api/models/loopDTO'
import { questionnairesKeys } from '@/api/questionnaires'
import { scopesKeys } from '@/api/scopes'
import { variablesKeys } from '@/api/variables'
import type { InitialLoopMember } from '@/models/loops'
import type { Scopes } from '@/models/scopes'
import type { Variable } from '@/models/variables'
import { uid } from '@/utils/utils'

import LoopForm from '../form/LoopForm'
import { type FormValues } from '../form/schema'

type Props = {
  questionnaireId: string
  /** Available scopes with the mapping between id and name. */
  scopes: Scopes
  /** Components that can be the boundaries of the loop. */
  loopMembers: InitialLoopMember[]
  /** List of variables used for auto-completion in VTL editors. */
  variables?: Variable[]
}

/** Create a new loop. */
export default function CreateLoop({
  questionnaireId,
  scopes,
  loopMembers,
  variables,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: ({
      loop,
      questionnaireId,
    }: {
      loop: LoopDTO
      questionnaireId: string
    }) => {
      return postLoop(questionnaireId, loop)
    },
    onSuccess: (_, { questionnaireId }) =>
      Promise.all([
        // The loop can become a scope and changes the scope of the variables
        // of the questions it repeats.
        queryClient.invalidateQueries({
          queryKey: scopesKeys.detail(questionnaireId),
        }),
        queryClient.invalidateQueries({
          queryKey: variablesKeys.all(questionnaireId),
        }),
        queryClient.invalidateQueries({
          queryKey: questionnairesKeys.detail(questionnaireId),
        }),
      ]),
  })

  const submitForm = async (formValues: FormValues) => {
    const loop: LoopDTO = { id: uid(), ...formValues }
    const promise = mutation.mutateAsync(
      { loop, questionnaireId },
      {
        onSuccess: () =>
          navigate({
            to: '/questionnaire/$questionnaireId',
            params: { questionnaireId },
          }),
      },
    )
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('loop.create.success', { name: loop.name }),
      error: (err: Error) => err.toString(),
    })
  }

  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <LoopForm
        questionnaireId={questionnaireId}
        scopes={scopes}
        loopMembers={loopMembers}
        variables={variables}
        onSubmit={submitForm}
        submitLabel={t('common.create')}
      />
    </div>
  )
}
