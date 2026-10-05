import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { loopsKeys, postLoop } from '@/api/loops'
import { questionnairesKeys } from '@/api/questionnaires'
import { scopesKeys } from '@/api/scopes'
import { variablesKeys } from '@/api/variables'
import type { InitialLoopMember, Loop } from '@/models/loops'
import type { Scopes } from '@/models/scopes'
import type { Variable } from '@/models/variables'

import LoopForm from '../form/LoopForm'
import { type FormValues } from '../form/schema'

type Props = {
  questionnaireId: string
  /** Loop to edit. */
  loop: Loop
  /** Available scopes with the mapping between id and name. */
  scopes: Scopes
  /** Components that can be the boundaries of the loop. */
  loopMembers: InitialLoopMember[]
  /** List of variables used for auto-completion in VTL editors. */
  variables?: Variable[]
}

/** Edit an existing loop. */
export default function EditLoop({
  questionnaireId,
  loop: { id: loopId, ...initialValues },
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
      loop: Loop
      questionnaireId: string
    }) => {
      return postLoop(questionnaireId, loop)
    },
    onSuccess: (_, { questionnaireId, loop }) =>
      Promise.all([
        // Refresh the edited loop and the possible members of the loops.
        queryClient.invalidateQueries({
          queryKey: loopsKeys.all(questionnaireId),
        }),
        queryClient.invalidateQueries({
          queryKey: loopsKeys.one(questionnaireId, loop.id),
        }),
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
    // Keep the id of the loop so that the API updates it.
    const loop: Loop = { id: loopId, ...formValues }
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
      success: t('loop.edit.success', { name: loop.name }),
      error: (err: Error) => err.toString(),
    })
  }

  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <LoopForm
        questionnaireId={questionnaireId}
        loop={initialValues}
        scopes={scopes}
        loopMembers={loopMembers}
        variables={variables}
        onSubmit={submitForm}
        submitLabel={t('common.edit')}
      />
    </div>
  )
}
