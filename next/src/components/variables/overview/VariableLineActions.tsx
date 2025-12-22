import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { deleteVariable, variablesKeys } from '@/api/variables';
import Dialog from '@/components/ui/Dialog';
import Menu from '@/components/ui/Menu';
import { type Variable, VariableType } from '@/models/variables';

interface Props {
  questionnaireId: string;
  variable: Variable;
  /** Disable edit and delete actions on readonly. */
  readonly?: boolean;
}

/**
 * Allow to edit or delete a variable when not in read-only.
 */
export default function VariableLineActions({
  questionnaireId,
  variable,
  readonly = false,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const deleteMutation = useMutation({
    mutationFn: ({
      questionnaireId,
      variableId,
    }: {
      questionnaireId: string;
      variableId: string;
    }) => {
      return deleteVariable(questionnaireId, variableId);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: variablesKeys.all(questionnaireId),
      }),
  });

  function onDelete() {
    const promise = deleteMutation.mutateAsync({
      questionnaireId,
      variableId: variable.id,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('variable.delete.success', { name: variable.name }),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <>
      <Menu
        label="actions"
        items={[
          {
            label: t('common.edit'),
            onClick: () =>
              void navigate({
                to: '/questionnaire/$questionnaireId/variables/variable/$variableId',
                params: { questionnaireId, variableId: variable.id },
              }),
            disabled: readonly || variable.type === VariableType.Collected,
          },
          {
            label: t('common.delete'),
            onClick: () => setOpenDeleteDialog(true),
            disabled: readonly || variable.type === VariableType.Collected,
          },
        ]}
      />
      <Dialog
        controlledOpen={openDeleteDialog}
        title={t('variable.delete.dialogTitle', { name: variable.name })}
        body={t('variable.delete.dialogConfirm')}
        onValidate={onDelete}
        onCancel={() => setOpenDeleteDialog(false)}
      />
    </>
  );
}
