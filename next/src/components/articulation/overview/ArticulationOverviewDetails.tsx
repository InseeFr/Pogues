import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { articulationKeys, deleteArticulation } from '@/api/articulation';
import ButtonLink from '@/components/ui/ButtonLink';
import DialogButton from '@/components/ui/DialogButton';
import { ArticulationItems } from '@/models/articulation';

import { ArticulationTable } from './ArticulationTable';

interface ArticulationOverviewDetailsProps {
  questionnaireId: string;
  articulationItems: ArticulationItems;
  readonly?: boolean;
}

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
      <div className="pt-3">
        <ArticulationTable articulationItems={articulationItems} />
      </div>

      {!readonly && (
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
