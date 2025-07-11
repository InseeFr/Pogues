import OpenInNewIcon from '@/components/ui/icons/OpenInNewIcon';
import {
  Mode,
  SurveyUnitModeData,
} from '@/models/personalizationQuestionnaire';

interface ModeOverviewProps {
  modes: Mode[];
  surveyUnitData: SurveyUnitModeData[];
}

/** Display visualization per mode as a table. */
export default function ModeOverview({
  modes,
  surveyUnitData,
}: Readonly<ModeOverviewProps>) {
  const filteredModes = modes.filter((m) => m.isWebMode);
  const shouldScroll = surveyUnitData.length > 4;
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
              surveyUnitData.reduce((acc, surveyUnit) => {
                const displayableId = surveyUnit.displayableId;
                if (!acc.has(displayableId.toString()))
                  acc.set(displayableId.toString(), []);
                acc.get(displayableId.toString())!.push(surveyUnit);
                return acc;
              }, new Map<string, SurveyUnitModeData[]>()),
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
                          <a
                            href={unitForMode.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <OpenInNewIcon />
                          </a>
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
