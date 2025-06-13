import { Version } from '@/models/version';

import VersionTile from './VersionTile';

interface VersionProps {
  label: string;
  questionnaireId: string;
  versions: Version[];
}

/** Display all versions and separate tody's from olders versions */
export default function VersionContent({
  label,
  questionnaireId,
  versions,
}: Readonly<VersionProps>) {
  return (
    <div className="relative bg-default p-4 border border-default shadow-md grid grid-rows-[auto_1fr_auto]">
      <div className="grid grid-cols-[1fr_auto]">
        <h3>{label}</h3>
      </div>
      <div className={`grid overflow-hidden grid-rows-[1fr] transition-all`}>
        <div className="overflow-hidden space-y-3">
          <div className="pt-3">
            <VersionTile
              questionnaireId={questionnaireId}
              versions={versions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
