import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import { deleteVariable, variablesKeys } from '@/api/variables'
import Dialog from '@/components/ui/Dialog'
import Menu from '@/components/ui/Menu'
import { MenuItemType } from '@/components/ui/consts/menuItemVariants'
import { useDeleteMutation } from '@/hooks/form/useDeleteMutation'
import { type Variable, VariableType } from '@/models/variables'

interface Props {
  questionnaireId: string
  variable: Variable
  /** Disable edit and delete actions on readonly. */
  readonly?: boolean
}

/**
 * Allow to edit or delete a variable when not in read-only.
 */
export default function VariableLineActions({
  questionnaireId,
  variable,
  readonly = false,
}: Readonly<Props>) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)

  const { remove } = useDeleteMutation({
    mutationFn: (variableId: string) =>
      deleteVariable(questionnaireId, variableId),
    invalidateKeys: [variablesKeys.all(questionnaireId)],
    successMessage: t('variable.delete.success', { name: variable.name }),
  })

  function onDelete() {
    return remove(variable.id)
  }

  if (variable.type === VariableType.Collected) return null

  return (
    <>
      <Menu
        label="Open variable action menu"
        items={[
          {
            disabled: readonly,
            label: t('common.edit'),
            onClick: () =>
              navigate({
                to: '/questionnaire/$questionnaireId/variables/variable/$variableId',
                params: { questionnaireId, variableId: variable.id },
              }),
          },
          {
            disabled: readonly,
            label: t('common.delete'),
            type: MenuItemType.Delete,
            onClick: () => setOpenDeleteDialog(true),
          },
        ]}
      />
      <Dialog
        body={t('variable.delete.dialogConfirm')}
        controlledOpen={openDeleteDialog}
        title={t('variable.delete.dialogTitle', { name: variable.name })}
        onCancel={() => setOpenDeleteDialog(false)}
        onValidate={onDelete}
      />
    </>
  )
}
