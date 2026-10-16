import { useTranslation } from 'react-i18next'

import React from 'react'

import { articulationKeys, deleteArticulation } from '@/api/articulation'
import ButtonLink from '@/components/ui/ButtonLink'
import DeleteButton from '@/components/ui/DeleteButton'
import InlineCode from '@/components/ui/InlineCode'
import { useDeleteMutation } from '@/hooks/form/useDeleteMutation'
import { ArticulationItems } from '@/models/articulation'

import ArticulationVariableLabel from '../ArticulationVariableLabel'

interface ArticulationOverviewDetailsProps {
  questionnaireId: string
  articulationItems: ArticulationItems
  readonly?: boolean
}

/**
 * Display the articulation rules of the selected questionnaire and allow to
 * edit or delete them.
 *
 * Although it could be generic, only "prénom", "sexe" and "age" are truly
 * handled for now.
 */
export function ArticulationOverviewDetails({
  questionnaireId,
  articulationItems,
  readonly = false,
}: Readonly<ArticulationOverviewDetailsProps>) {
  const { t } = useTranslation()

  const { remove } = useDeleteMutation({
    mutationFn: (id: string) => deleteArticulation(id),
    invalidateKeys: [articulationKeys.all(questionnaireId)],
    successMessage: t('articulation.delete.success'),
  })

  function onDelete() {
    return remove(questionnaireId)
  }

  return (
    <div className="overflow-hidden space-y-3">
      <div className="w-full grid grid-cols-[auto_1fr] items-center">
        {articulationItems.map(({ label, value }) => (
          <React.Fragment key={label}>
            <div>
              <ArticulationVariableLabel label={label} />
            </div>
            <InlineCode value={value} />
          </React.Fragment>
        ))}
      </div>

      {readonly ? null : (
        <div className="flex gap-x-2">
          <ButtonLink
            to="/questionnaire/$questionnaireId/articulation/edit"
            params={{ questionnaireId }}
          >
            {t('common.edit')}
          </ButtonLink>
          <DeleteButton
            title={t('articulation.delete.dialogTitle')}
            body={t('articulation.delete.dialogConfirm')}
            onConfirm={onDelete}
          />
        </div>
      )}
    </div>
  )
}
