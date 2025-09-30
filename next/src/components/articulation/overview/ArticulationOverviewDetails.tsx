import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { articulationKeys, deleteArticulation } from '@/api/articulation';
import ButtonLink from '@/components/ui/ButtonLink';
import DialogButton from '@/components/ui/DialogButton';
import InlineCode from '@/components/ui/InlineCode';
import { ArticulationItems } from '@/models/articulation';

interface ArticulationOverviewDetailsProps {
  questionnaireId: string;
  articulationItems: ArticulationItems;
  readonly?: boolean;
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
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: ({ questionnaireId }: { questionnaireId: string }) => {
      return deleteArticulation(questionnaireId);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: articulationKeys.all(questionnaireId),
      }),
  });

  function onDelete() {
    const promise = deleteMutation.mutateAsync({
      questionnaireId,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('articulation.delete.success'),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <div className="overflow-hidden space-y-3">
      <div className="w-full grid grid-cols-[auto_1fr] items-center">
        {articulationItems.map(({ label, value }) => (
          <React.Fragment key={label}>
            <div>{label}</div>
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
          <DialogButton
            label={t('common.delete')}
            title={t('articulation.delete.dialogTitle')}
            body={t('articulation.delete.dialogConfirm')}
            onValidate={onDelete}
          />
        </div>
      )}
    </div>
  );
}
