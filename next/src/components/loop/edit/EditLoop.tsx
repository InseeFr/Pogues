import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { deleteLoop, loopsKeys, postLoop } from '@/api/loops'
import { questionnairesKeys } from '@/api/questionnaires'
import { scopesKeys } from '@/api/scopes'
import { variablesKeys } from '@/api/variables'
import FormComponent from '@/components/ui/form/FormComponent'
import { useDeleteMutation } from '@/hooks/form/useDeleteMutation'
import { useFormCancel } from '@/hooks/form/useFormCancel'
import { useFormSubmit } from '@/hooks/form/useFormSubmit'
import type { InitialLoopMember, Loop } from '@/models/loops'
import type { Scopes } from '@/models/scopes'
import type { Variable } from '@/models/variables'

import LoopForm from '../form/LoopForm'
import { type FormValues, schema } from '../form/schema'

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
  /**
   * If provided, the loop comes from this older version of the questionnaire
   * and can be neither updated nor deleted.
   */
  versionId?: string
}

/** Edit an existing loop. */
export default function EditLoop({
  questionnaireId,
  loop: { id: loopId, relatedLoopNames = [], ...initialValues },
  scopes,
  loopMembers,
  variables,
  versionId,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const navigate = useFormCancel()

  // The loop cannot be deleted while other loops use it as reference.
  const hasRelatedLoops = relatedLoopNames.length > 0

  const getDeleteDisabledReason = (): string | undefined => {
    if (versionId) return t('history.questionnaireIsReadonly')
    if (hasRelatedLoops) {
      return t('loop.delete.disabled.usedByLoops', {
        loops: relatedLoopNames.join(', '),
      })
    }
    return undefined
  }
  const deleteDisabledReason = getDeleteDisabledReason()

  // The loop can be a scope and changes the scope of the variables of the
  // questions it repeats.
  const loopDependentKeys = [
    loopsKeys.all(questionnaireId),
    scopesKeys.detail(questionnaireId),
    variablesKeys.all(questionnaireId),
    questionnairesKeys.detail(questionnaireId),
  ]

  const { submit } = useFormSubmit({
    // Keep the id of the loop so that the API updates it.
    mutationFn: (formValues: FormValues) =>
      postLoop(questionnaireId, { id: loopId, ...formValues }),
    schema,
    invalidateKeys: [
      ...loopDependentKeys,
      loopsKeys.one(questionnaireId, loopId),
    ],
    successMessage: (formValues) =>
      t('loop.edit.success', { name: formValues.name }),
    navigateFunction: {
      to: '/questionnaire/$questionnaireId',
      params: { questionnaireId },
    },
  })

  const { remove } = useDeleteMutation({
    mutationFn: () => deleteLoop(questionnaireId, loopId),
    invalidateKeys: loopDependentKeys,
    onSuccess: () =>
      queryClient.removeQueries({
        queryKey: loopsKeys.one(questionnaireId, loopId),
      }),
    successMessage: t('loop.delete.success', { name: initialValues.name }),
  })

  const onSubmit = (formValues: FormValues) => {
    return submit(formValues)
  }

  const onDelete = () => {
    return remove(undefined, {
      // The user may have modified the form before deleting the loop, which is
      // why the navigation ignores the dirty state blocker.
      onSuccess: () =>
        navigate({
          to: '/questionnaire/$questionnaireId',
          params: { questionnaireId },
        }),
    })
  }

  return (
    <FormComponent>
      <LoopForm
        questionnaireId={questionnaireId}
        loop={initialValues}
        scopes={scopes}
        loopMembers={loopMembers}
        variables={variables}
        versionId={versionId}
        onSubmit={onSubmit}
        submitLabel={t('common.edit')}
        deleteButton={{
          title: t('loop.delete.dialogTitle', { name: initialValues.name }),
          body: t('loop.delete.dialogConfirm'),
          onConfirm: onDelete,
          buttonTitle: deleteDisabledReason,
          disabled: !!deleteDisabledReason,
        }}
      />
    </FormComponent>
  )
}
