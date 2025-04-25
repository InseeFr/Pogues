import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { deleteAllVersions } from '@/api/versions';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import { Version } from '@/models/version';

import Dialog from '../ui/Dialog';
import VersionContent from './VersionContent';

interface VersionsProps {
  versions: Version[];
  questionnaireId: string;
}

/**
 * Display the versions of the selected questionnaire and allow to restore
 * or delete them.
 */
export default function VersionsOverview({
  versions = [],
  questionnaireId,
}: Readonly<VersionsProps>) {
  console.log('VersionsOverview', questionnaireId);
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
        queryKey: ['versions', { questionnaireId }],
      }),
  });

  function onDelete() {
    const promise = deleteMutation.mutateAsync({
      questionnaireId,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('version.deleteSuccess'),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <div>
      <ContentHeader
        title={`${t('version.title')} : ${versions.length}`}
        action={
          <Dialog
            label={t('version.deleteAll')}
            title={t('version.deleteDialogTitle')}
            body={t('version.deleteDialogConfirm')}
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
              label={t('version.version_today', {
                count: todaysVersions.length,
              })}
            />
            <VersionContent
              versions={olderVersions}
              questionnaireId={questionnaireId}
              label={t('version.old_versions', { count: olderVersions.length })}
            />
          </>
        ) : (
          <div className="text-center">
            <p>{t('version.no_versions')}</p>
          </div>
        )}
      </ContentMain>
    </div>
  );
}
