import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Version } from '@/models/version';

import ArrowDownIcon from '../ui/icons/ArrowDownIcon';
import ArrowUpIcon from '../ui/icons/ArrowUpIcon';
import VersionTile from './VersionTile';

interface VersionProps {
  versions: Version[];
  questionnaireId: string;
  label: string;
}

/** Display all versions and separate tody's from olders versions */
export default function VersionContent({
  versions,
  label,
}: Readonly<VersionProps>) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="relative bg-default p-4 border border-default shadow-md grid grid-rows-[auto_1fr_auto]">
      <div className="grid grid-cols-[1fr_auto]">
        <h3>{label}</h3>
      </div>
      <div
        className={`grid overflow-hidden grid-rows-[1fr] transition-all`}
        id={`version-content`}
        hidden={!isExpanded}
      >
        <div className="overflow-hidden space-y-3">
          <div className="pt-3">
            <VersionTile versions={versions} />
          </div>
        </div>
      </div>
      <div className="text-center absolute bottom-0 left-1/2">
        <ExpandButton
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          ariaControls={`version-content`}
        />
      </div>
    </div>
  );
}

interface ExpandButtonProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  ariaControls: string;
}

function ExpandButton({
  isExpanded,
  setIsExpanded,
  ariaControls,
}: Readonly<ExpandButtonProps>) {
  const { t } = useTranslation();
  return (
    <button
      className="cursor-pointer"
      onClick={() => setIsExpanded((v) => !v)}
      aria-expanded={isExpanded}
      aria-controls={ariaControls}
      aria-label={
        isExpanded
          ? t('codesList.overview.collapse')
          : t('codesList.overview.expand')
      }
    >
      {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
    </button>
  );
}
