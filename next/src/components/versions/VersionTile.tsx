import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { restoreVersion } from '@/api/versions';
import Dialog from '@/components/ui/Dialog';
import type { Version } from '@/models/version';

interface VersionsTileProps {
  versions: Version[];
}

/** Display versions as a table. */
export default function VersionTile({ versions }: Readonly<VersionsTileProps>) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const restoreMutation = useMutation({
    mutationFn: ({ versionId }: { versionId: string }) => {
      return restoreVersion(versionId);
    },
    onSuccess: (_, { versionId }) =>
      queryClient.invalidateQueries({
        queryKey: ['versions', { versionId }],
      }),
  });

  function onRestore(version: Version) {
    const promise = restoreMutation.mutateAsync({
      versionId: version.id,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('version.restoreSuccess', {
        label: version.timestamp,
      }),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <table className="border border-default w-full shadow-sm">
      <thead className="bg-accent">
        <tr className="*:font-semibold *:p-4 text-left">
          <th className="w-2/4">{t('version.timestamp')}</th>
          <th className="w-3/4">{t('version.author')}</th>
          <th className="w-3/4">{t('version.actions')}</th>
        </tr>
      </thead>
      <tbody className="text-default">
        {versions.map((version) => (
          <tr className="bg-default odd:bg-main *:p-4">
            <td>
              {Intl.DateTimeFormat('fr-FR', {
                dateStyle: 'long',
                timeStyle: 'short',
              }).format(new Date(version.timestamp))}
            </td>
            <td>{version.author}</td>
            <td>
              {
                <div className="flex gap-x-2">
                  <Dialog
                    label={t('version.restore')}
                    title={t('version.restoreDialogTitle', {
                      timestamp: Intl.DateTimeFormat('fr-FR', {
                        dateStyle: 'long',
                        timeStyle: 'short',
                      }).format(new Date(version.timestamp)),
                    })}
                    body={t('version.restoreDialogConfirm')}
                    onValidate={() => onRestore(version)}
                  />
                </div>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
