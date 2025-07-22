import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { resetInterrogation } from '@/api/personalization';
import ButtonIcon from '@/components/ui/ButtonIcon';
import OpenInNewIcon from '@/components/ui/icons/OpenInNewIcon';
import ResetIcon from '@/components/ui/icons/ResetIcon';
import {
  InterrogationModeData,
  Mode,
} from '@/models/personalizationQuestionnaire';

interface ModeOverviewProps {
  modes: Mode[];
  interrogationData: InterrogationModeData[];
}

/** Display visualization per mode as a table. */
export default function ModeOverview({
  modes,
  interrogationData,
}: Readonly<ModeOverviewProps>) {
  const filteredModes = modes.filter((m) => m.isWebMode);
  const shouldScroll = interrogationData.length > 4;
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
              {filteredModes.map((mode: Mode) => (
                <th key={mode.name} className="text-default">
                  {mode.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-default">
            {Array.from(
              interrogationData.reduce((acc, interrogation) => {
                const displayableId = interrogation.displayableId;
                if (!acc.has(displayableId.toString()))
                  acc.set(displayableId.toString(), []);
                acc.get(displayableId.toString())!.push(interrogation);
                return acc;
              }, new Map<string, InterrogationModeData[]>()),
              ([displayableId, units]) => (
                <tr
                  key={displayableId}
                  className="bg-default odd:bg-main *:p-4"
                >
                  <td>{displayableId}</td>
                  {filteredModes.map((mode) => {
                    const unitForMode = units.find((unit) => {
                      const modeInId = unit.id.split('-')[1];
                      return mode.name === modeInId;
                    });
                    return (
                      <td key={mode.name}>
                        {unitForMode?.url && (
                          <div className="flex flex-row items-center gap-2">
                            <a
                              href={unitForMode.url}
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
                              onClick={() => onReset(unitForMode?.id || '')}
                            />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
