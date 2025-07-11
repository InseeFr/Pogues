import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { deleteAllVersions, versionsKeys } from '@/api/versions';
import ContentHeader from '@/components/layout/ContentHeader';
import ContentMain from '@/components/layout/ContentMain';
import { Version } from '@/models/version';

import Dialog from '../ui/Dialog';
import VersionContent from './VersionContent';

interface VersionsProps {
  questionnaireId: string;
  versions: Version[];
}

/**
 * Display the versions of the selected questionnaire and allow to restore
 * or delete them.
 */
export default function VersionsOverview({
  questionnaireId,
  versions = [],
}: Readonly<VersionsProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const todayString = new Date().toISOString().split('T')[0];

  const todaysVersions = versions.filter((item) =>
    item.day.startsWith(todayString),
  );
  const olderVersions = versions.filter(
    (item) => !item.day.startsWith(todayString),
  );

  const deleteMutation = useMutation({
    mutationFn: ({ questionnaireId }: { questionnaireId: string }) => {
      return deleteAllVersions(questionnaireId);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: versionsKeys.all(questionnaireId),
      }),
  });

  function onDelete() {
    const promise = deleteMutation.mutateAsync({
      questionnaireId,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('history.deleteAll.success'),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <div>
      <ContentHeader
        title={t('history.title')}
        action={
          <Dialog
            label={t('history.deleteAll.label')}
            title={t('history.deleteAll.dialogTitle')}
            body={t('history.deleteAll.dialogConfirm')}
            onValidate={onDelete}
          />
        }
      />
      <ContentMain>
        {versions.length > 0 ? (
          <>
            <VersionContent
              versions={todaysVersions}
              questionnaireId={questionnaireId}
              label={t('history.versionToday', {
                count: todaysVersions.length,
              })}
            />
            <VersionContent
              versions={olderVersions}
              questionnaireId={questionnaireId}
              label={t('history.oldVersions', { count: olderVersions.length })}
            />
          </>
        ) : (
          <div className="text-center">
            <p>{t('history.noVersions')}</p>
          </div>
        )}
      </ContentMain>
    </div>
  );
}
