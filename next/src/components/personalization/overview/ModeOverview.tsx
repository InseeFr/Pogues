import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { resetInterrogation } from '@/api/personalization';
import ButtonIcon from '@/components/ui/ButtonIcon';
import OpenInNewIcon from '@/components/ui/icons/OpenInNewIcon';
import ResetIcon from '@/components/ui/icons/ResetIcon';
import {
  InterrogationModeData,
  InterrogationModeDataResponse,
} from '@/models/personalizationQuestionnaire';

interface ModeOverviewProps {
  interrogationData: InterrogationModeDataResponse;
}

export default function ModeOverview({
  interrogationData,
}: Readonly<ModeOverviewProps>) {
  const { t } = useTranslation();
  const resetInterrogationMutation = useMutation({
    mutationFn: async (interrogationId: string) => {
      const result = await resetInterrogation(interrogationId);
      return result ?? null;
    },
  });

  function onReset(interrogationId: string) {
    const promise = resetInterrogationMutation.mutateAsync(interrogationId);
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('personalization.edit.resetInterrogationSuccess'),
      error: (err: Error) => err.toString(),
    });
  }

  // Get all unique displayableIds
  const allDisplayableIds = Array.from(
    new Set(
      Object.values(interrogationData)
        .flat()
        .map((item) => item.displayableId),
    ),
  ).sort((a, b) => a - b);

  const modeNames = (
    Object.keys(interrogationData) as Array<keyof InterrogationModeDataResponse>
  ).filter(
    (mode) =>
      Array.isArray(interrogationData[mode]) &&
      interrogationData[mode].length > 0,
  );

  const shouldScroll = allDisplayableIds.length > 4;

  return (
    <div className="overflow-x-auto w-full my-3">
      <div
        style={{
          maxHeight: shouldScroll ? '320px' : 'none',
          overflowY: shouldScroll ? 'auto' : 'visible',
        }}
      >
        <table className="border border-default w-full min-w-max shadow-sm">
          <thead className="bg-accent sticky top-0 ">
            <tr className="*:font-semibold *:p-4 text-left">
              <th className="text-default">ID</th>
              {modeNames.map((mode) => (
                <th key={mode} className="text-default">
                  {mode}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-default">
            {allDisplayableIds.map((displayableId) => (
              <tr key={displayableId} className="bg-default odd:bg-main *:p-4">
                <td>{displayableId}</td>
                {modeNames.map((mode) => {
                  const interrogation = interrogationData[mode].find(
                    (item: InterrogationModeData) =>
                      item.displayableId === displayableId,
                  );
                  return (
                    <td key={mode}>
                      {interrogation && (
                        <div className="flex flex-row items-center gap-2">
                          <a
                            href={interrogation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <OpenInNewIcon />
                          </a>
                          <ButtonIcon
                            className="right-3 top-1/2 "
                            Icon={ResetIcon}
                            title={t(
                              'personalization.edit.resetInterrogationDescription',
                            )}
                            onClick={() => onReset(interrogation.id)}
                          />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
