import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { restoreVersion } from '@/api/versions';
import { ButtonSize } from '@/components/ui/Button';
import DialogButton from '@/components/ui/DialogButton';

interface ReadonlyWarningProps {
  /**
   * Id of the questionnaire that will be used to send the user to the main
   * questionnaire page, on the latest save.
   */
  questionnaireId?: string;
  /** Version to rollback to. */
  versionId?: string;
}

/**
 * Display a warning that the currently displayed version is is readonly.
 *
 * If a version id is provided, allow to rollback to this version, creating a
 * new save with the old data.
 */
export default function ReadonlyWarning({
  questionnaireId,
  versionId,
}: Readonly<ReadonlyWarningProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const restoreMutation = useMutation({
    mutationFn: ({ versionId }: { versionId: string }) => {
      return restoreVersion(versionId);
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });

  function onRestore() {
    const promise = restoreMutation.mutateAsync(
      {
        versionId: versionId!,
      },
      {
        onSuccess: () => {
          // There should always have a questionnaireId but just in case,
          // we do nothing if none is provided
          if (questionnaireId)
            navigate({
              to: '/questionnaire/$questionnaireId',
              params: { questionnaireId },
            });
        },
      },
    );
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('history.restore.success', {
        label: versionId,
      }),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <div className="grid grid-cols-[1fr_auto] items-center p-3 border-blue-3 border rounded shadow m-3 bg-default">
      <div>{t('history.questionnaireIsReadonly')}</div>
      {versionId ? (
        <DialogButton
          body={t('history.restore.dialogConfirm')}
          buttonSize={ButtonSize.sm}
          label={t('history.restore.label')}
          onValidate={onRestore}
          title={t('history.restore.dialogTitle')}
        />
      ) : null}
    </div>
  );
}
